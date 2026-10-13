import {test, expect} from '@playwright/test';
import {categories} from '../src/catalog';

test('pesquisa sem acentos, todas as categorias, ofertas e telas estreitas', async ({page}) => {
  await page.goto('/');
  await page.locator('#search').fill('ACUCAR');
  await expect(page.locator('.product')).toHaveCount(2);
  await page.locator('#search').fill('produto-inexistente');
  await expect(page.locator('.product')).toHaveCount(0);
  await expect(page.locator('.empty')).toBeVisible();
  await page.locator('#clear').click();
  for (const category of categories) {
    await page.locator('nav').getByRole('button', {name: category, exact: true}).click();
    await expect(page.locator('.product')).toHaveCount(8);
    await expect(page.locator('#catalog-title')).toHaveText(category);
  }
  await page.locator('#offers').click();
  await expect(page.locator('.product')).toHaveCount(13);
  await expect(page.locator('.badge')).toHaveCount(13);
  await page.locator('#clear').click();
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({width, height: 900});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test('preços promocionais, peso, total da revisão e remoção do carrinho', async ({page}) => {
  await page.goto('/');
  await page.locator('[data-plus="p0-0"]').click(); // R$ 5,52 promocional.
  await page.locator('[data-plus="p0-1"]').click();
  await page.locator('[data-plus="p0-1"]').click(); // 2 × R$ 6,99.
  await page.locator('#search').fill('banana');
  for (let i = 0; i < 3; i++) await page.locator('[data-plus="p10-0"]').click();
  // 750 g × R$ 5,09/kg = R$ 3,82. Total independente: R$ 23,32.
  await page.locator('#cart-open').click();
  await expect(page.locator('.totals .total')).toContainText('23,32');
  await page.locator('#checkout').click();
  await page.locator('[name=name]').fill('Maria Teste');
  await page.locator('[name=phone]').fill('(89) 99999-9999');
  await page.locator('[name=payment]').selectOption('pix');
  await page.getByRole('button', {name: 'Revisar e confirmar pedido'}).click();
  await expect(page.locator('.review')).toContainText('0,75 kg');
  await expect(page.locator('.review')).toContainText('23,32');
  await page.locator('#close').click();
  await page.locator('#cart-open').click();
  await page.locator('[data-remove="p0-1"]').click();
  await expect(page.locator('.totals .total')).toContainText('9,34');
  await page.locator('#dialog [data-minus="p10-0"]').click();
  await expect(page.locator('.totals .total')).toContainText('8,07');
  await page.locator('#dialog [data-plus="p10-0"]').click();
  await expect(page.locator('.totals .total')).toContainText('9,34');
  await page.locator('#close').click();
  await page.reload();
  await expect(page.locator('#cart-count')).toHaveText('2');
});
