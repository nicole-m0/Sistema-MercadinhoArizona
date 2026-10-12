import fs from 'node:fs';
import {chromium} from '@playwright/test';
const entries=JSON.parse(fs.readFileSync('scripts/product-image-prompts.json','utf8'));
fs.mkdirSync('test-results/image-review',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1200,height:720}});
 for(let group=0;group<13;group++){
  const items=entries.slice(group*8,group*8+8);
  if(items.some(item=>!fs.existsSync(`public/images/products/${item.file}`)))continue;
  await page.setContent(`<style>body{margin:0;padding:16px;font:16px Arial;background:#f5f5f5}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}figure{margin:0;background:white;padding:10px;text-align:center;border-radius:8px}img{width:240px;height:270px;object-fit:contain}figcaption{height:36px}</style><div class="grid">${items.map(item=>`<figure><img src="data:image/jpeg;base64,${fs.readFileSync(`public/images/products/${item.file}`).toString('base64')}"><figcaption>${item.name}</figcaption></figure>`).join('')}</div>`);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
  await page.screenshot({path:`test-results/image-review/category-${group}.png`,fullPage:true});
 }
} finally {await browser.close();}
