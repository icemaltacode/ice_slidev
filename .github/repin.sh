#!/usr/bin/env bash
# Move every course onto this theme's main. Run by workflows/repin.yml - see there for why.
#
#   GH_TOKEN  REPIN_TOKEN: a fine-grained token on icemaltacode with write access to the courses
#   DRY_RUN   'true' finds the courses and checks the token can push to each, and pushes nothing
#   RUN_URL   named in each course's commit, so a repin can be traced to the run that made it
set -euo pipefail

OWNER=icemaltacode
THEME=slidev-theme-ice
DRY=${DRY_RUN:-true}
SUMMARY=${GITHUB_STEP_SUMMARY:-/dev/null}
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

say() { echo "$*"; echo "$*" >> "$SUMMARY"; }
pinOf() { jq -r ".packages[\"node_modules/$THEME\"].resolved // \"\"" "$1" | sed 's/.*#//'; }

# What every course is moved onto: main as it is now. npm resolves the same commit below; if a
# push lands in between, the run it queues moves everybody again.
git fetch -q origin main
target=$(git rev-parse origin/main)
say "Theme \`${target:0:8}\`$([ "$DRY" = true ] && echo ', dry run: nothing is pushed')"
say ''

# EVERY COURSE THE TOKEN CAN REACH that builds its decks with this theme. A course is a repo
# with content/course.json, which is icecore's own definition of one; slides_starter uses the
# theme and is not a course. Found rather than listed, so adding a course is one less thing to
# remember - though it does still have to be added to the token.
courses=()
for repo in $(gh api --paginate 'user/repos?per_page=100' \
                --jq ".[] | select(.owner.login == \"$OWNER\" and (.archived | not)) | .name"); do
  gh api "repos/$OWNER/$repo/contents/content/course.json" --silent 2>/dev/null || continue
  pkg=$(gh api "repos/$OWNER/$repo/contents/slides/package.json" \
          -H 'Accept: application/vnd.github.raw' 2>/dev/null) || continue
  grep -q "\"$THEME\"" <<<"$pkg" || continue
  courses+=("$repo")
done
if [ ${#courses[@]} -eq 0 ]; then
  say 'No course found. Can REPIN_TOKEN read the course repositories?'
  exit 1
fi

# One checkout moved onto the theme's main and committed: 0 moved, 1 already on it, 2 failed.
# Sets `was` and `now` for the caller to report.
#
# EVERY STEP IS CHECKED BY HAND. Called as `repin || ...`, which is how a status is read, and
# bash turns `set -e` off inside a function called that way - so an npm that could not resolve
# the theme would leave the pin where it was and be reported as a course already on it.
repin() {
  local dir=$1 log
  was=$(pinOf "$dir/slides/package-lock.json") || return 2
  (cd "$dir/slides" && npm update "$THEME" --package-lock-only --no-audit --no-fund --loglevel=error \
     >/dev/null) || return 2
  now=$(pinOf "$dir/slides/package-lock.json") || return 2
  [ -n "$now" ] || return 2
  [ "$was" != "$now" ] || return 1
  log=$(git log --format='- %h %s' "$was..$now" 2>/dev/null) \
    || log="- ${was:0:8} is not in the theme's history, so the commits in between cannot be listed"
  git -C "$dir" -c user.name='github-actions[bot]' \
      -c user.email='41898282+github-actions[bot]@users.noreply.github.com' \
      commit -q -F - slides/package-lock.json <<EOF || return 2
Repin the deck theme to ${now:0:7}

The theme moved over:
$log

Committed by ice_slidev's repin workflow, $RUN_URL
A lockfile change under slides/ rebuilds and republishes every deck.
EOF
}

failed=0
for repo in "${courses[@]}"; do
  dir="$work/$repo"
  # Only slides/ is checked out, and no file is fetched until it is read: a course carries its
  # datasets, and changing one line of its lockfile should not download them.
  if ! git clone -q --depth 1 --filter=blob:none --sparse \
         "https://x-access-token:$GH_TOKEN@github.com/$OWNER/$repo.git" "$dir" 2>/dev/null; then
    say "- **$repo**: could not be cloned"; failed=1; continue
  fi
  git -C "$dir" sparse-checkout set slides

  rc=0; repin "$dir" || rc=$?
  if [ "$rc" = 2 ]; then say "- **$repo**: the theme could not be resolved"; failed=1; continue; fi

  if [ "$DRY" = true ]; then
    # Asked even when there is nothing to move: whether the token can push is the thing a dry
    # run is for, and GitHub checks it before it looks at what is being pushed.
    if ! git -C "$dir" push -q --dry-run origin HEAD:main 2>/dev/null; then
      say "- **$repo**: REPIN_TOKEN cannot push to it"; failed=1
    elif [ "$rc" = 0 ]; then say "- $repo: would move \`${was:0:8}\` to \`${now:0:8}\`"
    else say "- $repo: already on \`${now:0:8}\`"; fi
    continue
  fi

  if [ "$rc" = 1 ]; then say "- $repo: already on \`${now:0:8}\`"; continue; fi
  pushed=false
  for attempt in 1 2 3; do
    if git -C "$dir" push -q origin HEAD:main 2>/dev/null; then pushed=true; break; fi
    # Somebody pushed to the course in between: start again from theirs.
    git -C "$dir" fetch -q --depth 1 origin main
    git -C "$dir" reset -q --hard origin/main
    rc=0; repin "$dir" || rc=$?
    if [ "$rc" = 1 ]; then pushed=true; break; fi    # their push had already repinned it
    [ "$rc" = 0 ] || break
  done
  if $pushed; then say "- $repo: moved \`${was:0:8}\` to \`${now:0:8}\`, its publish will rebuild every deck"
  else say "- **$repo**: could not push the repin"; failed=1; fi
done

# THE `pinned` TAG NAMES WHAT EVERY COURSE SHOULD BE ON. icecore's publish compares a course's
# pin with it and warns when the course is behind, which is how a course this run could not
# reach - one missing from REPIN_TOKEN - says so in its own run rather than sitting on an old
# theme without a word. Not main: a push that touches only ignored paths moves main and must not
# make every course look out of date.
if [ "$DRY" != true ]; then
  git tag -f pinned "$target"
  git push -q -f origin refs/tags/pinned
fi
exit "$failed"
