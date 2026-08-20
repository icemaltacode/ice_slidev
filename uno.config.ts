import { defineConfig, createGenerator } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { createRequire } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const collections: Record<string, () => unknown> = {};
try {
  const root = dirname(require.resolve('@iconify-json/carbon/package.json'));
  for (const name of readdirSync(dirname(root))) {
    try { const icons = require(`@iconify-json/${name}/icons.json`); collections[name] = () => icons; }
    catch { /* skip */ }
  }
} catch { /* none installed */ }

const classes = new Set<string>();
try {
  const client = dirname(require.resolve('@slidev/client/package.json'));
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name === 'node_modules') continue;
      const full = join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!/\.(vue|ts|js|mjs)$/.test(e.name)) continue;
      for (const m of readFileSync(full, 'utf8').matchAll(/\bi-[a-z0-9]+:[a-z0-9-]+/g)) classes.add(m[0]);
    }
  };
  walk(client);
} catch { /* nothing to scan */ }

const uno = await createGenerator({ presets: [presetIcons({ collections })] });
const { css } = await uno.generate([...classes], { preflights: false });
console.error(`[ice] icon CSS: ${classes.size} classes -> ${css.length} bytes`);

export default defineConfig({
  preflights: [{ getCSS: () => css }],
});
