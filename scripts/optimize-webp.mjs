// Deriva WebP dos JPEGs locais preservados, sem upload ou serviço externo.
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {chromium} from 'playwright';

const root = 'public/images/products';
const names = readdirSync(root).filter(name => name.endsWith('.jpg'));
assert.equal(names.length, 104);
const browser = await chromium.launch({channel: 'chrome'});
try {
  const page = await browser.newPage();
  let original = 0;
  let optimized = 0;
  for (const name of names) {
    const jpeg = readFileSync(`${root}/${name}`);
    const encoded = await page.evaluate(async source => {
      const image = new Image();
      image.src = source;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      return canvas.toDataURL('image/webp', 0.82);
    }, `data:image/jpeg;base64,${jpeg.toString('base64')}`);
    assert.ok(encoded.startsWith('data:image/webp;base64,'));
    const webp = Buffer.from(encoded.split(',')[1], 'base64');
    assert.ok(webp.length < jpeg.length, `WebP não reduz o tamanho: ${name}`);
    writeFileSync(`${root}/${name.replace(/\.jpg$/, '.webp')}`, webp);
    original += jpeg.length;
    optimized += webp.length;
  }
  console.log(`104 WebP 600 × 600: ${optimized} bytes; JPEGs preservados: ${original} bytes; redução ${(100 * (1 - optimized / original)).toFixed(1)}%.`);
} finally {
  await browser.close();
}
