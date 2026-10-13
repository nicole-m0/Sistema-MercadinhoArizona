const env=import.meta.env;
const fee=Number(env.VITE_TAXA_ENTREGA_CENTAVOS??'0');
const publicDemo=env.VITE_DEMONSTRACAO_PUBLICA==='true';
export const config={publicDemo,mode:env.VITE_AMBIENTE??'teste',WHATSAPP_PEDIDOS_TESTE:publicDemo?'':env.VITE_WHATSAPP_PEDIDOS_TESTE??'',fee:Number.isSafeInteger(fee)&&fee>=0?fee:0,card:env.VITE_ACEITA_CARTAO==='true'};
