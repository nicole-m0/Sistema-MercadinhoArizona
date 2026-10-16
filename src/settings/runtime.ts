import {commercialCheckout, demonstrationCheckout} from './checkout';
import {commercialStore, demonstrationStore} from './store';

export type Environment = 'demonstracao' | 'teste' | 'producao';
type EnvironmentValues = {
  MODE?: string;
  DEV?: boolean;
  VITE_AMBIENTE?: string;
  VITE_DEMONSTRACAO_PUBLICA?: string;
  VITE_WHATSAPP_PEDIDOS_TESTE?: string;
  VITE_TAXA_ENTREGA_CENTAVOS?: string;
  VITE_ACEITA_CARTAO?: string;
  [key: string]: string | boolean | undefined;
};

function fee(value: unknown) {
  const amount = Number(value);
  if (value === null || value === '' || !Number.isSafeInteger(amount) || amount < 0) {
    throw new Error('Taxa de entrega deve ser um inteiro não negativo em centavos.');
  }
  return amount;
}

export function createConfig(env: EnvironmentValues) {
  // Apenas o servidor de desenvolvimento permite o fluxo pessoal de teste.
  // Build padrão e modos desconhecidos permanecem demonstrativos e bloqueados.
  const environment: Environment = env.MODE === 'commercial' ? 'producao'
    : env.DEV === true && env.MODE === 'development' && (env.VITE_AMBIENTE ?? 'teste') === 'teste'
      && env.VITE_DEMONSTRACAO_PUBLICA !== 'true' ? 'teste' : 'demonstracao';
  const commercial = environment === 'producao';
  const testing = environment === 'teste';
  const policy = commercial ? commercialCheckout : demonstrationCheckout;
  return {
    environment,
    publicDemo: !testing,
    mode: environment === 'demonstracao' ? 'demonstracao' : commercial ? 'producao' : 'teste',
    store: commercial ? commercialStore : demonstrationStore,
    // Nunca copiar o número pessoal para o destino oficial.
    WHATSAPP_PEDIDOS_TESTE: testing ? env.VITE_WHATSAPP_PEDIDOS_TESTE ?? '' : '',
    officialWhatsApp: commercial ? commercialStore.officialWhatsApp : '',
    commercialOrdersEnabled: false as const,
    receiving: {...policy.receiving},
    payments: {...policy.payments, card: testing ? env.VITE_ACEITA_CARTAO === 'true' : policy.payments.card},
    fee: commercial ? policy.receiving.delivery ? fee(policy.feeCents) : 0
      : testing ? fee(env.VITE_TAXA_ENTREGA_CENTAVOS ?? '0') : 0,
  };
}
