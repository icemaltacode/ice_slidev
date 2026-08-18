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

if (!existsSync('package.json')) {
  skipped.push('no package.json — run `npm init -y` first, then re-run this')
} else {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
  pkg.scripts ??= {}
  const added = []
  for (const [name, cmd] of Object.entries(DECK_SCRIPTS)) {
    if (pkg.scripts[name]) skipped.push(`script "${name}" already set`)
    else { pkg.scripts[name] = cmd; added.push(name) }
  }
  if (added.length) {
    writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`)
    done.push(`wired npm scripts: ${added.join(', ')}`)
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
console.log('\nNext: npm run dev')
