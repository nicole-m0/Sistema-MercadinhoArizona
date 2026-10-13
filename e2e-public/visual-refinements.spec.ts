import {test, expect} from '@playwright/test';

test('banner, navegação e resumo permanecem legíveis de 320 a 390 px', async ({page}) => {
  const externalFonts: string[] = [];
  page.on('request', request => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) externalFonts.push(request.url());
  });
  await page.goto('/');
  for (const width of [320, 360, 390, 1440]) {
    await page.setViewportSize({width, height: 900});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const copy = await page.locator('.hero-copy').boundingBox();
    const art = await page.locator('.hero-art').boundingBox();
    expect(copy && art && (copy.y + copy.height <= art.y || copy.x + copy.width <= art.x)).toBe(true);
    await expect(page.locator('#cart-open')).toHaveCSS('min-height', '44px');
  }
  await page.setViewportSize({width: 320, height: 740});
  await page.locator('[data-plus="p0-0"]').click();
  await page.locator('#search').fill('banana');
  await page.locator('[data-plus="p10-0"]').click();
  await page.locator('#cart-open').click();
  await page.locator('#checkout').click();
  await page.locator('[name=name]').fill('Maria Teste');
  await page.locator('[name=phone]').fill('(89) 99999-9999');
  await page.locator('[name=payment]').selectOption('pix');
  await page.getByRole('button', {name: 'Revisar e confirmar pedido'}).click();
  await expect(page.locator('.review-products li')).toHaveCount(2);
  await expect(page.locator('.review-products')).toContainText('0,25 kg');
  await expect(page.locator('.review .total')).toContainText('6,79');
  const heading = await page.locator('.dialog-top').boundingBox();
  const notice = await page.locator('#dialog-content > .test-note').boundingBox();
  expect(heading && notice && notice.y >= heading.y + heading.height).toBe(true);
  expect(await page.locator('#send').getAttribute('href')).toBeNull();
  expect(await page.locator('dialog').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await page.screenshot({path: `test-results/refined-review-320-${test.info().project.name}.png`});
  await page.locator('#close').click();
  await page.locator('#clear').click();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({path: `test-results/refined-home-320-${test.info().project.name}.png`});
  await page.evaluate(() => document.fonts.ready);
  expect(externalFonts).toEqual([]);
});

test('os 104 JPEGs originais continuam funcionando como fallback', async ({page}) => {
  test.setTimeout(60000);
  await page.goto('/');
  while (await page.locator('#load-more').isVisible()) await page.locator('#load-more').click();
  await page.locator('.product source').evaluateAll(sources => sources.forEach(source => source.setAttribute('type', 'image/unsupported')));
  const images = page.locator('.product img');
  await expect(images).toHaveCount(104);
  for (let i = 0; i < 104; i++) {
    const image = images.nth(i);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth === 600 && element.currentSrc.endsWith('.jpg'))).toBe(true);
  }
});
