// Inline fonts and the music track into one self-contained page.
//   node build.mjs <fontsDir> <music.mp3> <out.html>
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const [, , fontsDir, mp3, out] = process.argv;
const b64 = f => readFileSync(f).toString('base64');
const here = path.dirname(new URL(import.meta.url).pathname);
let html = readFileSync(path.join(here, 'template.html'), 'utf8');
const map = { __F_INTER__: 'interTight.woff2', __F_SERIF__: 'instrItalic.woff2', __F_MONO__: 'jbmono.woff2', __F_CAVEAT__: 'caveat.woff2', __F_KALAM__: 'kalam700.woff2', __F_KALAMX__: 'kalam700-math.woff2' };
for (const [k, f] of Object.entries(map)) html = html.replace(k, b64(path.join(fontsDir, f)));
html = html.replace('__MP3__', b64(mp3));
writeFileSync(out, html);
console.log('wrote', out, (html.length / 1e6).toFixed(2), 'MB');
