export type CheckoutPolicy = {
  receiving: {delivery: boolean; pickup: boolean};
  payments: {pix: boolean; cash: boolean; card: boolean};
};

export const demonstrationCheckout: CheckoutPolicy & {feeCents: number} = {
  receiving: {delivery: true, pickup: true},
  payments: {pix: true, cash: true, card: false},
  feeCents: 0,
};

// Não representam uma oferta comercial. Ativar modalidades só após confirmação.
// Taxa fixa em centavos; null significa que a taxa real ainda não foi informada.
export const commercialCheckout: CheckoutPolicy & {confirmed: boolean; feeCents: number | null} = {
  confirmed: false,
  receiving: {delivery: false, pickup: false},
  payments: {pix: false, cash: false, card: false},
  feeCents: null,
};

export function checkoutAvailable(policy: CheckoutPolicy) {
  return Object.values(policy.receiving).some(Boolean) && Object.values(policy.payments).some(Boolean);
}
