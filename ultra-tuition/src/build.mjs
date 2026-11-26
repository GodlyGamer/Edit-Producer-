// Inline fonts, images and the music track into one self-contained page.
//   node build.mjs <template.html> <out.html>
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const [, , tpl, out] = process.argv;
const here = path.dirname(new URL(import.meta.url).pathname);
const b64 = f => readFileSync(path.join(here, f)).toString('base64');
let html = readFileSync(tpl, 'utf8');
const map = {
  __F_INTER__: 'fonts/interTight.woff2', __F_ONEST__: 'fonts/Onest.woff2', __F_SERIF__: 'fonts/instrItalic.woff2', __F_MARTIAN__: 'fonts/MartianMono.woff2',
  __F_MONO__: 'fonts/jbmono.woff2', __F_CAVEAT__: 'fonts/caveat.woff2', __F_KALAM__: 'fonts/kalam700.woff2', __F_KALAMX__: 'fonts/kalam700-math.woff2',
  __IMG_ORB__: 'orb.png', __IMG_APP__: 'app-crop.jpg', __IMG_ROW__: 'app-row.png', __MP3__: 'music.mp3'
};
for (const [k, f] of Object.entries(map)) if (html.includes(k)) html = html.split(k).join(b64(f));
writeFileSync(out, html);
console.log('wrote', out, (html.length / 1e6).toFixed(2), 'MB');
