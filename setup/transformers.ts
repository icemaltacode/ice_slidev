import { defineTransformersSetup } from '@slidev/types'
import { frameScreenshot } from 'appshots'
import sharp from 'sharp'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { isAbsolute, resolve } from 'node:path'
import { createHash } from 'node:crypto'

const TAG_RE = /<DeviceFrame\b([^>]*?)\/?>/g
const ATTR_RE = /(\w[\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g

export default defineTransformersSetup(() => ({
  pre: [
    async ({ s, options }) => {
      const content = s.toString()
      const matches = [...content.matchAll(TAG_RE)]
      if (matches.length === 0) return

      const userRoot = options.userRoot
      const framesDir = resolve(userRoot, 'public', '.frames')
      let dirReady = false

      for (const m of matches) {
        const attrs: Record<string, string> = {}
        for (const a of m[1].matchAll(ATTR_RE)) {
          attrs[a[1]] = a[2] ?? a[3] ?? ''
        }
        const src = attrs.src
        if (!src) continue
        const device = attrs.device ?? 'iphone-6.3'
        const frameColor = attrs['frame-color'] ?? 'black'
        const orientation = (attrs.orientation === 'landscape' ? 'landscape' : 'portrait') as 'portrait' | 'landscape'

        const srcPath = isAbsolute(src) ? src : resolve(userRoot, src)
        // Cache key v2: include preset version so old PNGs regenerate on framer changes.
        const cacheKey = createHash('sha1')
          .update(`v2|${srcPath}|${device}|${frameColor}|${orientation}`)
          .digest('hex').slice(0, 12)
        const outFile = resolve(framesDir, `${cacheKey}.png`)

        let needsRegen = true
        try {
          const [srcStat, outStat] = await Promise.all([stat(srcPath), stat(outFile)])
          if (outStat.mtimeMs >= srcStat.mtimeMs) needsRegen = false
        } catch {
          needsRegen = true
        }

        if (needsRegen) {
          if (!dirReady) {
            await mkdir(framesDir, { recursive: true })
            dirReady = true
          }
          try {
            const framed = await frameScreenshot({
              input: srcPath,
              device,
              orientation,
              options: {
                background: 'transparent',
                padding: 0,
                shadow: false,
                deviceFrame: true,
                frameColor,
                // 'top' anchors the phone to the bottom of the canvas with
                // its top (Dynamic Island, rounded corners) fully visible.
                // The default 'bottom' crops the top, which we don't want.
                textPosition: 'top',
              },
            })
            // Trim the transparent margins (appshots reserves canvas area for
            // a title overlay we don't use), leaving just the phone bbox.
            const trimmed = await sharp(framed).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
            await writeFile(outFile, trimmed)
          } catch (err) {
            console.error(`[device-frame] failed for ${srcPath}:`, (err as Error).message)
            continue
          }
        }

        const passthrough = ['class', 'alt', 'style']
          .filter(k => attrs[k])
          .map(k => `${k}="${attrs[k]}"`)
          .join(' ')
        // :src binds at runtime, bypassing Vue/Vite's compile-time asset import,
        // so the path is served from the deck's public/ at request time.
        const replacement = `<img :src="'/.frames/${cacheKey}.png'"${passthrough ? ' ' + passthrough : ''} />`

        const start = m.index!
        const end = start + m[0].length
        s.overwrite(start, end, replacement)
      }
    },
  ],
}))
