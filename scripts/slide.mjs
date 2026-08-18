#!/usr/bin/env node
// Stamp a copy of a theme template into the deck's slides.md.
// Edits happen on the copy — the master template is never touched.
import { appendFileSync, existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const themeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templatesDir = join(themeRoot, 'templates')

const templates = readdirSync(templatesDir)
  .filter(f => f.endsWith('.md'))
  .map(f => f.slice(0, -3))
  .sort()

const args = process.argv.slice(2)
const outIndex = args.findIndex(a => a === '--out' || a === '-o')
const deck = outIndex === -1 ? 'slides.md' : args[outIndex + 1]
const consumed = outIndex === -1 ? new Set() : new Set([outIndex, outIndex + 1])
const names = args.filter((a, i) => !consumed.has(i) && !a.startsWith('-'))

const usage = () => {
  console.log('Usage: npm run slide -- <template> [<template>...] [--out slides.md]\n')
  console.log('Available templates:')
  for (const t of templates) console.log(`  ${t}`)
}

if (!names.length || args.includes('--list') || args.includes('-l')) {
  usage()
  process.exit(names.length ? 0 : 1)
}

const unknown = names.filter(n => !templates.includes(n))
if (unknown.length) {
  console.error(`Unknown template(s): ${unknown.join(', ')}\n`)
  usage()
  process.exit(1)
}

if (!existsSync(deck)) {
  console.error(`No ${deck} in this directory. Run \`npx ice-deck-init\` first.`)
  process.exit(1)
}

for (const name of names) {
  const body = readFileSync(join(templatesDir, `${name}.md`), 'utf8').trimEnd()
  const existing = readFileSync(deck, 'utf8')
  appendFileSync(deck, `${existing.trimEnd() ? '\n\n' : ''}${body}\n`)
  console.log(`Added ${name} to ${deck}`)
}
