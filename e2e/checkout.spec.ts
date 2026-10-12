import {test,expect} from '@playwright/test';
import {loadEnv} from 'vite';
const testNumber=loadEnv('development',process.cwd(),'VITE_').VITE_WHATSAPP_PEDIDOS_TESTE;
test('erros associados aos campos, limites e aviso honesto do WhatsApp',async({page})=>{
 await page.goto('/');await page.locator('[data-plus="p0-1"]').click();await page.locator('#cart-open').click();await page.locator('#checkout').click();
 const submit=page.getByRole('button',{name:'Revisar e confirmar pedido'});
 await page.locator('[name=name]').fill('123 456');await page.locator('[name=phone]').fill('abc89999999999');await submit.click();
 await expect(page.locator('[name=name]')).toBeFocused();
 for(const key of ['name','phone','payment']){await expect(page.locator(`[name=${key}]`)).toHaveAttribute('aria-invalid','true');await expect(page.locator(`[name=${key}]`)).toHaveAttribute('aria-describedby',`error-${key}`);await expect(page.locator(`#error-${key}`)).not.toBeEmpty();}
 await page.locator('[name=name]').fill('Ana-Clara D’Ávila');await page.locator('[name=phone]').fill('(89) 99999-9999');await submit.click();await expect(page.locator('[name=payment]')).toBeFocused();
 await page.locator('[name=receiving]').selectOption('delivery');
 await expect(page.locator('[name=receiving]')).toHaveAttribute('aria-describedby','error-receiving');
 for(const key of ['street','number','district','complement','reference'])await expect(page.locator(`[name=${key}]`)).toHaveAttribute('maxlength',key==='complement'||key==='reference'?'200':'150');
 await page.locator('[name=payment]').selectOption('pix');await submit.click();await expect(page.locator('[name=street]')).toBeFocused();
 await page.locator('[name=street]').fill('Rua Teste');await page.locator('[name=number]').fill('S/N');await page.locator('[name=district]').fill('Bairro Teste');await submit.click();
 if(testNumber){
  // Cancela a navegação externa: verifica o clique sem contatar o WhatsApp.
  await page.locator('#send').evaluate(link=>link.addEventListener('click',event=>event.preventDefault()));
  await page.locator('#send').click();await expect(page.locator('#send-status')).toContainText('Tentativa de abertura');await expect(page.locator('#send-status')).not.toContainText('WhatsApp aberto');
 }
 await page.locator('#close').click();await expect(page.locator('#cart-count')).toHaveText('1');
});
test('catálogo completo, persistência e checkout até revisão',async({page})=>{
 const pageErrors:string[]=[];page.on('pageerror',e=>pageErrors.push(e.message));
 await page.goto('/');await expect(page.locator('.product')).toHaveCount(24);
 while(await page.locator('#load-more').isVisible())await page.locator('#load-more').click();
 await expect(page.locator('.product')).toHaveCount(104);
 await expect(page.getByRole('button',{name:'Indisponível'})).toBeDisabled();
 await page.locator('[data-plus="p0-1"]').click();
 await page.locator('[data-plus="p10-0"]').click();
 await page.locator('[data-plus="p10-0"]').click();
 await page.reload();await expect(page.locator('#cart-count')).toHaveText('2');
 await page.locator('#cart-open').click();await expect(page.locator('dialog')).toBeVisible();
 await page.locator('#checkout').click();await page.getByRole('button',{name:'Revisar e confirmar pedido'}).click();
 await expect(page.locator('#error-name')).not.toBeEmpty();
 await page.locator('[name=name]').fill('Maria Teste');await page.locator('[name=phone]').fill('(89) 99999-9999');
 await page.locator('[name=receiving]').selectOption('delivery');await page.locator('[name=street]').fill('Rua Teste');await page.locator('[name=number]').fill('10');await page.locator('[name=district]').fill('Bairro Teste');
 await page.locator('[name=payment]').selectOption('cash');await page.locator('[name=change]').fill('100,00');await page.locator('[name=notes]').fill('Pedido fictício de teste');
 await page.getByRole('button',{name:'Revisar e confirmar pedido'}).click();
 await expect(page.locator('#dialog-title')).toHaveText('Revise seu pedido');await expect(page.locator('.review')).toContainText('0,5 kg');await expect(page.locator('.review')).toContainText('Rua Teste');await expect(page.locator('.review')).toContainText('Pedido fictício de teste');
 if(testNumber){
  const href=await page.locator('#send').getAttribute('href');
  const url=new URL(href!);
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toBe(`/${testNumber}`);
  expect(url.searchParams.get('text')).toContain('Pedido fictício de teste');
 }else await expect(page.locator('#send')).toHaveAttribute('aria-disabled','true');
 await page.locator('#edit').click();await page.locator('[name=receiving]').selectOption('pickup');await page.locator('[name=payment]').selectOption('pix');await page.getByRole('button',{name:'Revisar e confirmar pedido'}).click();
 await expect(page.locator('.review')).not.toContainText('Rua Teste');await expect(page.locator('.review')).toContainText('Retirada no mercadinho');
 await page.locator('#close').click();
 await page.locator('#search').fill('cafe');await expect(page.locator('.product')).toHaveCount(3);
 await page.locator('#clear').click();await page.getByRole('button',{name:'Hortifruti',exact:true}).click();await expect(page.locator('.product')).toHaveCount(8);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 expect(pageErrors).toEqual([]);
 await page.screenshot({path:`test-results/catalog-${test.info().project.name}.png`,fullPage:true});
});
