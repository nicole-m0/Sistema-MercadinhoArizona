import {test, expect} from '@playwright/test';
import {loadEnv} from 'vite';

test('checkout público preserva a revisão e não oferece envio nem expõe o número local', async ({page}) => {
  const localNumber = loadEnv('development', process.cwd(), 'VITE_').VITE_WHATSAPP_PEDIDOS_TESTE;
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.demo')).toContainText('Produtos e preços fictícios');
  await expect(page.locator('#contact')).toBeDisabled();
  await page.locator('[data-plus="p0-1"]').click();
  await page.locator('#cart-open').click();
  await page.locator('#checkout').click();
  await page.locator('[name=name]').fill('Maria Teste');
  await page.locator('[name=phone]').fill('(89) 99999-9999');
  await page.locator('[name=payment]').selectOption('pix');
  await page.getByRole('button', {name: 'Revisar e confirmar pedido'}).click();
  await expect(page.locator('.review')).toContainText('DEMONSTRAÇÃO');
  await expect(page.locator('.review')).toContainText('Arroz parboilizado');
  await expect(page.locator('#send')).toHaveAttribute('aria-disabled', 'true');
  expect(await page.locator('#send').getAttribute('href')).toBeNull();
  await expect(page.locator('#send-status')).toContainText('Nenhum pedido será enviado');
  await expect(page.locator('a[href*="wa.me"], a[href*="whatsapp"]')).toHaveCount(0);
  await expect(page.getByText('WhatsApp de teste:', {exact: false})).toHaveCount(0);
  if (localNumber) expect((await page.locator('body').innerText()).includes(localNumber)).toBe(false);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({path: `test-results/demo-checkout-${test.info().project.name}.png`});
});

test('artefato público preserva imagens, pesquisa e categorias e não serve API ou arquivos privados', async ({page, request}) => {
  test.setTimeout(60000);
  await page.goto('/');
  await page.locator('#search').fill('acucar');
  await expect(page.locator('.product')).toHaveCount(2);
  await page.locator('#clear').click();
  await page.getByRole('button', {name: 'Hortifruti', exact: true}).click();
  await expect(page.locator('.product')).toHaveCount(8);
  await page.locator('#clear').click();
  while (await page.locator('#load-more').isVisible()) await page.locator('#load-more').click();
  const images = page.locator('.product img');
  await expect(images).toHaveCount(104);
  for (let i = 0; i < 104; i++) {
    const image = images.nth(i);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth === 600 && element.naturalHeight === 600 && element.currentSrc.endsWith('.webp'))).toBe(true);
  }
  for (const path of ['/api/status', '/admin', '/.env.local', '/server/auth.ts', '/supabase/seeds/catalog.sql']) {
    expect((await request.get(path)).status()).toBe(404);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
