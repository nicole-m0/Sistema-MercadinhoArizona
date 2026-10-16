import {afterEach, describe, expect, it} from 'vitest';
import {products} from '../src/catalog';
import {validate, whatsappUrl, type Checkout} from '../src/domain';
import {createConfig} from '../src/settings/runtime';
import {commercialCheckout, demonstrationCheckout, checkoutAvailable} from '../src/settings/checkout';
import {commercialStore} from '../src/settings/store';

const initialStore = structuredClone(commercialStore);
const initialCheckout = structuredClone(commercialCheckout);
afterEach(() => {
  Object.assign(commercialStore, structuredClone(initialStore));
  Object.assign(commercialCheckout, structuredClone(initialCheckout));
});
const personalNumber = '5511999999999';
const env = {VITE_WHATSAPP_PEDIDOS_TESTE: personalNumber, VITE_TAXA_ENTREGA_CENTAVOS: '725', VITE_ACEITA_CARTAO: 'true'};
const data: Checkout = {name:'Maria Teste',phone:'89999999999',receiving:'pickup',street:'Rua Teste',number:'1',district:'Teste',complement:'',reference:'',payment:'pix',change:'',notes:''};

describe('Separação de ambientes e bloqueio comercial', () => {
  it('preserva o teste pessoal somente no servidor de desenvolvimento', () => {
    const config = createConfig({...env, MODE:'development', DEV:true});
    expect(config.environment).toBe('teste');
    expect(config.WHATSAPP_PEDIDOS_TESTE).toBe(personalNumber);
    expect(config.officialWhatsApp).toBe('');
    expect(config.fee).toBe(725);
    expect(config.payments.card).toBe(true);
  });
  it.each(['public-demo', 'production', 'desconhecido', undefined])('bloqueia o telefone pessoal no modo %s', MODE => {
    const config = createConfig({...env, MODE, VITE_AMBIENTE:'teste', VITE_DEMONSTRACAO_PUBLICA:'false'});
    expect(config.environment).toBe('demonstracao');
    expect(config.publicDemo).toBe(true);
    expect(config.WHATSAPP_PEDIDOS_TESTE).toBe('');
    expect(config.officialWhatsApp).toBe('');
    expect(config.fee).toBe(0);
    expect(config.payments.card).toBe(false);
    expect(() => whatsappUrl(personalNumber, 'teste', config.mode)).toThrow();
  });
  it('não converte configuração local de produção em envio de teste', () => {
    expect(createConfig({...env, MODE:'development', DEV:true, VITE_AMBIENTE:'producao'}).WHATSAPP_PEDIDOS_TESTE).toBe('');
    expect(createConfig({...env, MODE:'development', DEV:false}).WHATSAPP_PEDIDOS_TESTE).toBe('');
  });
  it('não ativa pedidos mesmo com dados oficiais e sinalizadores preenchidos', () => {
    commercialStore.officialWhatsApp = '5589999999999';
    commercialStore.confirmed = true;
    commercialCheckout.confirmed = true;
    commercialCheckout.receiving.pickup = true;
    commercialCheckout.payments.pix = true;
    const config = createConfig({...env, MODE:'commercial', VITE_ENABLE_ORDERS:'true'});
    expect(config.environment).toBe('producao');
    expect(config.publicDemo).toBe(true);
    expect(config.commercialOrdersEnabled).toBe(false);
    expect(config.WHATSAPP_PEDIDOS_TESTE).toBe('');
    expect(config.officialWhatsApp).toBe(commercialStore.officialWhatsApp);
    expect(() => whatsappUrl(config.officialWhatsApp, 'teste', config.mode)).toThrow();
    expect(createConfig({...env, MODE:'public-demo'}).officialWhatsApp).toBe('');
  });
  it('exige taxa confirmada válida quando entrega comercial estiver configurada', () => {
    commercialCheckout.receiving.delivery = true;
    for (const amount of [null, -1, 0.5, NaN, Infinity]) {
      commercialCheckout.feeCents = amount;
      expect(() => createConfig({MODE:'commercial'})).toThrow('Taxa');
    }
    commercialCheckout.feeCents = 500;
    expect(createConfig({MODE:'commercial'}).fee).toBe(500);
    commercialCheckout.feeCents = 0;
    expect(createConfig({MODE:'commercial'}).fee).toBe(0);
  });
});

describe('Modalidades e pagamentos', () => {
  it.each(['pickup', 'delivery'] as const)('rejeita %s desabilitado mesmo se o formulário for manipulado', method => {
    const policy = structuredClone(demonstrationCheckout);
    policy.receiving[method] = false;
    expect(validate({...data, receiving:method}, {'p0-1':1000}, 0, policy).receiving).toBeDefined();
    policy.receiving[method] = true;
    expect(validate({...data, receiving:method}, {'p0-1':1000}, 0, policy)).toEqual({});
  });
  it.each(['pix', 'cash', 'card'] as const)('respeita a opção de pagamento %s', payment => {
    const policy = structuredClone(demonstrationCheckout);
    policy.payments[payment] = false;
    expect(validate({...data, payment}, {'p0-1':1000}, 0, policy).payment).toBeDefined();
    policy.payments[payment] = true;
    expect(validate({...data, payment}, {'p0-1':1000}, 0, policy)).toEqual({});
  });
  it('não libera checkout sem modalidade ou sem pagamento', () => {
    expect(checkoutAvailable(commercialCheckout)).toBe(false);
    expect(checkoutAvailable({...demonstrationCheckout, receiving:{pickup:false,delivery:false}})).toBe(false);
    expect(checkoutAvailable({...demonstrationCheckout, payments:{pix:false,cash:false,card:false}})).toBe(false);
    expect(checkoutAvailable(demonstrationCheckout)).toBe(true);
  });
});

it('preserva integralmente os 104 registros anteriores à preparação comercial', async () => {
  // Alterar esta referência somente após aprovação de alterações no catálogo.
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(products)));
  expect(Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join(''))
    .toBe('9ddbebedfdeb17b251c2cfb7a2d082275b14a598e6d9ae43f3ca24d369deb66e');
});
