import {test, expect, type Page} from '@playwright/test';
import {createConfig} from '../src/settings/runtime';

type Settings = ReturnType<typeof createConfig>;
async function settings(page: Page, overrides: Partial<Settings>) {
  const config = {...createConfig({MODE:'public-demo'}), ...overrides};
  // Simulação no navegador de teste; não existe parâmetro público de sobrescrita.
  await page.route(/\/src\/config\.ts(?:\?|$)/, route => route.fulfill({
    contentType:'application/javascript', body:`export const config = ${JSON.stringify(config)};`,
  }));
  await page.goto('/');
  await page.locator('[data-plus="p0-1"]').click();
  await page.locator('#cart-open').click();
}

test('somente entrega e dinheiro: escolhe entrega, cobra taxa e preserva revisão bloqueada', async ({page}) => {
  await settings(page, {receiving:{pickup:false,delivery:true}, payments:{pix:false,cash:true,card:false}, fee:500});
  await page.locator('#checkout').click();
  await expect(page.locator('[name=receiving] option')).toHaveCount(1);
  await expect(page.locator('[name=receiving]')).toHaveValue('delivery');
  await expect(page.locator('[name=payment] option')).toHaveCount(2);
  await page.locator('[name=name]').fill('Maria Teste');
  await page.locator('[name=phone]').fill('(89) 99999-9999');
  await page.locator('[name=street]').fill('Rua Teste');
  await page.locator('[name=number]').fill('10');
  await page.locator('[name=district]').fill('Bairro Teste');
  await page.locator('[name=payment]').selectOption('cash');
  await page.locator('[name=change]').fill('20,00');
  await page.getByRole('button', {name:'Revisar e confirmar pedido'}).click();
  await expect(page.locator('.review .total')).toContainText('11,99');
  await expect(page.locator('.review')).toContainText('8,01');
  await expect(page.locator('#send')).toHaveAttribute('aria-disabled','true');
  expect(await page.locator('#send').getAttribute('href')).toBeNull();
});

test('somente retirada e cartão: não exige endereço e não cobra entrega', async ({page}) => {
  await settings(page, {receiving:{pickup:true,delivery:false}, payments:{pix:false,cash:false,card:true}, fee:500});
  await page.locator('#checkout').click();
  await expect(page.locator('[name=receiving] option')).toHaveCount(1);
  await expect(page.locator('[name=street]')).toHaveCount(0);
  await expect(page.locator('[name=payment] option')).toHaveCount(2);
  await page.locator('[name=name]').fill('Maria Teste');
  await page.locator('[name=phone]').fill('(89) 99999-9999');
  await page.locator('[name=payment]').selectOption('card');
  await page.getByRole('button', {name:'Revisar e confirmar pedido'}).click();
  await expect(page.locator('.review .total')).toContainText('6,99');
  await expect(page.locator('.review')).toContainText('Cartão');
});

for (const missing of ['receiving','payments'] as const) {
  test(`bloqueia checkout sem opções de ${missing}`, async ({page}) => {
    await settings(page, missing === 'receiving' ? {receiving:{delivery:false,pickup:false}} : {payments:{pix:false,cash:false,card:false}});
    await expect(page.locator('#checkout')).toBeDisabled();
    await expect(page.locator('dialog')).toContainText('Recebimento e pagamentos aguardam configuração');
  });
}
