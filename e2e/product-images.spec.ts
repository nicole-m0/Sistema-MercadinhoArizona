import {test,expect} from '@playwright/test';

test('104 imagens carregam e cabem nos cards no desktop e celular',async({page})=>{
 test.setTimeout(60000);
 const failures:string[]=[];
 page.on('response',response=>{if(response.url().includes('/images/products/')&&response.status()!==200)failures.push(response.url());});
 await page.goto('/');
 while(await page.locator('#load-more').isVisible())await page.locator('#load-more').click();
 const images=page.locator('.product img');
 await expect(images).toHaveCount(104);
 for(let i=0;i<104;i++){
  const image=images.nth(i);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate((element:HTMLImageElement)=>element.complete&&element.naturalWidth===600&&element.naturalHeight===600)).toBe(true);
  await expect(image).toHaveAttribute('loading','lazy');
 }
 expect(failures).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.locator('#catalog').scrollIntoViewIfNeeded();
 await page.screenshot({path:`test-results/product-images-${test.info().project.name}.png`,fullPage:true});
 await images.first().scrollIntoViewIfNeeded();
 await page.screenshot({path:`test-results/product-images-${test.info().project.name}-viewport.png`});
});
