import {test, expect} from '@playwright/test';
import {loadEnv} from 'vite';

test('preparação comercial preserva catálogo e bloqueia checkout não configurado e WhatsApp', async ({page, request}) => {
  await page.goto('/');
  await expect(page.locator('.demo')).toContainText('Produtos e preços fictícios');
  await expect(page.locator('#contact')).toBeDisabled();
  await page.locator('#search').fill('cafe');
  await expect(page.locator('.product')).toHaveCount(3);
  await page.locator('#clear').click();
  while (await page.locator('#load-more').isVisible()) await page.locator('#load-more').click();
  await expect(page.locator('.product')).toHaveCount(104);
  await page.locator('[data-plus="p0-1"]').click();
  await page.reload();
  await expect(page.locator('#cart-count')).toHaveText('1');
  await page.locator('#cart-open').click();
  await expect(page.locator('#checkout')).toBeDisabled();
  await expect(page.getByRole('status').filter({hasText:'Recebimento e pagamentos aguardam configuração'})).toBeVisible();
  await expect(page.locator('a[href*="wa.me"], a[href*="whatsapp"]')).toHaveCount(0);
  const personal = loadEnv('development', process.cwd(), 'VITE_').VITE_WHATSAPP_PEDIDOS_TESTE;
  const script = await page.locator('script[type=module]').getAttribute('src');
  const bundle = await (await request.get(script!)).text();
  if (personal) expect(bundle).not.toContain(personal);
});
