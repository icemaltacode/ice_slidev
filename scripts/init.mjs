#!/usr/bin/env node
// Scaffold a new deck in the current directory: starter slides.md, wired-up
// npm scripts, .npmrc and .gitignore. Never overwrites existing settings.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const themeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const done = []
const skipped = []

// 1. slides.md
if (existsSync('slides.md')) {
  skipped.push('slides.md already exists')
} else {
  copyFileSync(join(themeRoot, 'starter', 'slides.md'), 'slides.md')
  done.push('created slides.md')
}

// 2. npm scripts
const DECK_SCRIPTS = {
  dev: 'slidev --open',
  build: 'slidev build',
  export: 'slidev export',
  slide: 'ice-slide',
}

// Pull transitive dependencies onto patched versions. npm only honours
// overrides from the root project, so every deck needs its own copy — the
// theme cannot fix these on its consumers' behalf.
const DECK_OVERRIDES = {
  'sharp': '^0.35.3',      // libvips CVEs; appshots pins ^0.33.5
  'dompurify': '^3.4.13',  // XSS advisories, reached via monaco-editor
  'js-yaml@4': '^4.3.1',   // DoS; scoped to 4.x so js-yaml@3 users are left alone
}

// sharp ships a prebuilt binary as an optional dependency, so its install
// script is only a fallback check and is safe to refuse.
const DECK_ALLOW_SCRIPTS = { sharp: false }

if (!existsSync('package.json')) {
  skipped.push('no package.json — run `npm init -y` first, then re-run this')
} else {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
  const changes = []

  pkg.scripts ??= {}
  const addedScripts = []
  for (const [name, cmd] of Object.entries(DECK_SCRIPTS)) {
    if (pkg.scripts[name]) skipped.push(`script "${name}" already set`)
    else { pkg.scripts[name] = cmd; addedScripts.push(name) }
  }
  if (addedScripts.length) changes.push(`scripts: ${addedScripts.join(', ')}`)

  pkg.overrides ??= {}
  const addedOverrides = []
  for (const [name, range] of Object.entries(DECK_OVERRIDES)) {
    if (pkg.overrides[name]) skipped.push(`override "${name}" already set`)
    else { pkg.overrides[name] = range; addedOverrides.push(name) }
  }
  if (addedOverrides.length) changes.push(`overrides: ${addedOverrides.join(', ')}`)

  pkg.allowScripts ??= {}
  const addedAllows = []
  for (const [name, allow] of Object.entries(DECK_ALLOW_SCRIPTS)) {
    if (name in pkg.allowScripts) skipped.push(`allowScripts "${name}" already set`)
    else { pkg.allowScripts[name] = allow; addedAllows.push(name) }
  }
  if (addedAllows.length) changes.push(`allowScripts: ${addedAllows.join(', ')}`)

  if (changes.length) {
    writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`)
    done.push(`wired package.json — ${changes.join('; ')}`)
  }
}

// 3. .npmrc — npm 12+ refuses git dependencies unless allow-git is set, and
// this deck depends on the theme over git. Commit it alongside package.json
// so `npm install` keeps working for everyone who clones the deck.
if (!existsSync('.npmrc')) {
  writeFileSync('.npmrc', 'allow-git=root\n')
  done.push('created .npmrc (allow-git=root)')
} else {
  const npmrc = readFileSync('.npmrc', 'utf8')
  if (/^\s*allow-git\s*=/m.test(npmrc)) {
    skipped.push('.npmrc already sets allow-git')
  } else {
    writeFileSync('.npmrc', `${npmrc.replace(/\n*$/, '\n')}allow-git=root\n`)
    done.push('added allow-git=root to .npmrc')
  }
}

// 4. .gitignore
if (existsSync('.gitignore')) {
  skipped.push('.gitignore already exists')
} else {
  writeFileSync('.gitignore', 'node_modules\ndist\n.slidev\n*.log\n.DS_Store\n')
  done.push('created .gitignore')
}

for (const d of done) console.log(`  ✓ ${d}`)
for (const s of skipped) console.log(`  · skipped: ${s}`)

// Overrides only take effect on the next install, and this normally runs
// straight after the first one.
const needsReinstall = done.some(d => d.includes('overrides'))
console.log(needsReinstall ? '\nNext: npm install && npm run dev' : '\nNext: npm run dev')
