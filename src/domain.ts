import {products,type Product} from './catalog';
export type Cart = Record<string,number>;
export const money=(c:number)=> (c/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export const price=(p:Product)=>p.promo??p.price;
export const step=(p:Product)=>p.unit==='kg'?250:1000;
export const quantity=(p:Product,q:number)=>`${(q/1000).toLocaleString('pt-BR')} ${p.unit}`;
export function validQuantity(p:Product,q:number){return Number.isInteger(q)&&q>=step(p)&&q<=100000&&q%step(p)===0;}
export function lineTotal(p:Product,q:number){if(!validQuantity(p,q)||!Number.isInteger(price(p))||price(p)<=0)throw Error('Quantidade ou preço inválido');return Math.round(price(p)*q/1000);}
export function cleanCart(raw:unknown):Cart {if(!raw||typeof raw!=='object'||Array.isArray(raw))return {};return Object.fromEntries(products.filter(p=>p.available&&validQuantity(p,(raw as Cart)[p.id])).map(p=>[p.id,(raw as Cart)[p.id]]));}
export function subtotal(cart:Cart){return Object.entries(cart).reduce((sum,[id,q])=>{const p=products.find(p=>p.id===id);if(!p||!p.available)throw Error('Produto indisponível');return sum+lineTotal(p,q);},0);}
const ddds='11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' ');
export function validPhone(phone:string){if(!/^[\d ()-]+$/.test(phone))return false;const n=phone.replace(/\D/g,'');return ddds.includes(n.slice(0,2))&& (/^\d{2}9\d{8}$/.test(n)||/^\d{2}[2-5]\d{7}$/.test(n));}
export type Checkout={name:string;phone:string;receiving:string;street:string;number:string;district:string;complement:string;reference:string;payment:string;change:string;notes:string};
export const fieldLimits={name:100,phone:200,street:150,number:150,district:150,complement:200,reference:200,change:200,notes:1000};
export function validName(value:string){const name=value.trim().normalize('NFC');return value.trim().length>=3&&value.trim().length<=fieldLimits.name&&/^\p{L}[\p{L}\p{M}]*(?:['’ʼ.-][\p{L}\p{M}]+|\.|\s+\p{L}[\p{L}\p{M}]*)*$/u.test(name)&&name.split(/\s+/).length>=2;}
export type Errors=Partial<Record<keyof Checkout|'cart',string>>;
export function parseMoney(value:string){if(!/^\d{1,7}([,.]\d{1,2})?$/.test(value.trim()))return NaN;const [whole,fraction='']=value.trim().replace(',','.').split('.');return Number(whole)*100+Number(fraction.padEnd(2,'0'));}
export function validate(data:Checkout,cart:Cart,fee:number,card=false):Errors{
 const e:Errors={};if(!validName(data.name))e.name='Informe nome e sobrenome (3 a 100 caracteres), usando letras, espaços, apóstrofos, pontos ou hífens.';
 if(!validPhone(data.phone))e.phone='Informe um telefone brasileiro com DDD, usando somente números, espaços, parênteses ou hífen.';
 if(!['delivery','pickup'].includes(data.receiving))e.receiving='Escolha entrega ou retirada.';
 if(data.receiving==='delivery'){for(const key of ['street','number','district'] as const)if(!data[key].trim()||data[key].length>fieldLimits[key])e[key]=`Informe ${key==='street'?'a rua':key==='number'?'o número (ou S/N)':'o bairro'} (até ${fieldLimits[key]} caracteres).`;}
 if(!['pix','cash',...(card?['card']:[])].includes(data.payment))e.payment='Selecione uma forma de pagamento disponível.';
 let total=0;try{total=subtotal(cart)+(data.receiving==='delivery'?fee:0);if(!Object.keys(cart).length)e.cart='Adicione produtos ao carrinho.';}catch{e.cart='Há produtos ou quantidades inválidos. Revise o carrinho.';}
 if(data.payment==='cash'&&data.change.trim()&&(!Number.isSafeInteger(parseMoney(data.change))||parseMoney(data.change)<total))e.change='O valor para troco deve ser igual ou maior que o total.';
 if(data.notes.length>fieldLimits.notes)e.notes='Use até 1.000 caracteres.';
 for(const key of ['complement','reference'] as const)if(data[key].length>fieldLimits[key])e[key]=`Use até ${fieldLimits[key]} caracteres.`;
 return e;
}
export function orderMessage(d:Checkout,cart:Cart,fee:number,id:string){const delivery=d.receiving==='delivery';const shipping=delivery?fee:0;return [`🛒 NOVO PEDIDO — MERCADINHO ARIZONA`,`DEMONSTRAÇÃO — produtos, preços e dados fictícios`,`Pedido: ${id}`,'',`CLIENTE`,`${d.name.trim()} • ${d.phone}`,'',`PRODUTOS`,...Object.entries(cart).map(([id,q])=>{const p=products.find(p=>p.id===id)!;return `• ${p.name} — ${quantity(p,q)} × ${money(price(p))}/${p.unit} = ${money(lineTotal(p,q))}`;}),'',`RESUMO`,`Subtotal: ${money(subtotal(cart))}`,`Taxa de entrega demonstrativa: ${money(shipping)}`,`Total: ${money(subtotal(cart)+shipping)}`,'',`RECEBIMENTO: ${delivery?'Entrega':'Retirada no mercadinho'}`,...(delivery?[`Endereço: ${d.street}, ${d.number} — ${d.district}`,d.complement?`Complemento: ${d.complement}`:'',d.reference?`Referência: ${d.reference}`:'']:[]),'',`PAGAMENTO: ${{pix:'PIX',cash:'Dinheiro',card:'Cartão na entrega/retirada'}[d.payment]}`,d.payment==='cash'?d.change?`Troco para: ${money(parseMoney(d.change))} (troco: ${money(parseMoney(d.change)-subtotal(cart)-shipping)})`:'Sem necessidade de troco':'',d.notes?`Observações: ${d.notes}`:''].filter((v,i,a)=>v!==''||a[i-1]!=='').join('\n');}
export function whatsappUrl(number:string,message:string,mode:string){if(mode!=='teste')throw Error('Produção bloqueada nesta versão.');if(!/^55\d{10,11}$/.test(number)||!validPhone(number.slice(2)))throw Error('Configure WHATSAPP_PEDIDOS_TESTE com 55 + DDD + número válido.');return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;}
