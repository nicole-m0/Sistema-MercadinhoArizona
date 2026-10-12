import {describe,it,expect} from 'vitest';
import {products} from '../src/catalog';
import {cleanCart,subtotal,lineTotal,price,validPhone,validate,parseMoney,whatsappUrl,orderMessage,type Checkout} from '../src/domain';
const data:Checkout={name:'Maria Teste',phone:'89999999999',receiving:'pickup',street:'',number:'',district:'',complement:'',reference:'',payment:'pix',change:'',notes:''};
const unit=products[1],kg=products.find(p=>p.unit==='kg')!;
describe('Catálogo e valores',()=>{
 it('contém 104 itens únicos, 13 categorias e preços válidos',()=>{expect(products).toHaveLength(104);expect(new Set(products.map(p=>p.id)).size).toBe(104);expect(new Set(products.map(p=>p.category)).size).toBe(13);expect(products.every(p=>Number.isInteger(p.price)&&p.price>0&&(!p.promo||p.promo<p.price))).toBe(true);});
 it('calcula unidades e arredonda cada linha por peso em centavos',()=>{expect(lineTotal(unit,2000)).toBe(price(unit)*2);expect(lineTotal(kg,750)).toBe(Math.round(price(kg)*.75));expect(subtotal({[unit.id]:2000,[kg.id]:750})).toBe(price(unit)*2+Math.round(price(kg)*.75));});
 it('rejeita frações em unidades, peso inválido, negativo e excesso',()=>{for(const q of [0,-250,125,100250,NaN])expect(()=>lineTotal(kg,q)).toThrow();expect(()=>lineTotal(unit,500)).toThrow();});
 it('recupera somente itens válidos do armazenamento',()=>{expect(cleanCart({[unit.id]:1000,[kg.id]:750,unknown:1000,'p12-7':1000})).toEqual({[unit.id]:1000,[kg.id]:750});expect(cleanCart('bad')).toEqual({});expect(cleanCart({[unit.id]:'1000'})).toEqual({});});
});
describe('Checkout',()=>{
 it('aceita nomes com acentos, hífens, apóstrofos, iniciais e letras Unicode',()=>{for(const name of ['José da Silva','Ana-Clara D’Ávila',"João D'Almeida",'Maria J. Santos','Jose\u0301 Teste','李 王'])expect(validate({...data,name},{[unit.id]:1000},0).name).toBeUndefined();});
 it('rejeita nomes numéricos, símbolos, dígitos misturados e nome sem sobrenome',()=>{for(const name of ['123 456','!!! ???','Maria 123','Maria @Silva','Maria <Silva>','Maria','- Maria','Maria 😀'])expect(validate({...data,name},{[unit.id]:1000},0).name).toBeDefined();});
 it('rejeita letras e caracteres inesperados em telefones',()=>{for(const phone of ['abc89999999999','89 99999-9999 ramal','89/99999/9999','89😀999999999'])expect(validPhone(phone)).toBe(false);for(const phone of ['89999999999','(89) 99999-9999','11 3333-4444'])expect(validPhone(phone)).toBe(true);});
 it('respeita os limites dos campos obrigatórios e opcionais do endereço',()=>{const delivery={...data,receiving:'delivery',street:'Rua Teste',number:'S/N',district:'Bairro Teste'};for(const key of ['street','number','district','complement','reference'] as const){const limit=key==='complement'||key==='reference'?200:150;expect(validate({...delivery,[key]:'a'.repeat(limit)},{[unit.id]:1000},0)[key]).toBeUndefined();expect(validate({...delivery,[key]:'a'.repeat(limit+1)},{[unit.id]:1000},0)[key]).toBeDefined();}expect(validate({...delivery,street:'   '},{[unit.id]:1000},0).street).toContain('rua');});
 it('aceita retirada fictícia sem CPF',()=>expect(validate(data,{[unit.id]:1000},0)).toEqual({}));
 it('valida DDD, comprimento e prefixo',()=>{expect(validPhone('(89) 99999-9999')).toBe(true);expect(validPhone('1133334444')).toBe(true);for(const phone of ['00999999999','899999','89899999999','1111111111'])expect(validPhone(phone)).toBe(false);});
 it('rejeita nome, telefone, carrinho vazio e pagamento inválidos',()=>{expect(Object.keys(validate({...data,name:'A',phone:'123',payment:''},{},0))).toEqual(expect.arrayContaining(['name','phone','cart','payment']));});
 it('exige endereço apenas na entrega',()=>{expect(validate({...data,receiving:'delivery'},{[unit.id]:1000},0)).toMatchObject({street:expect.any(String),number:expect.any(String),district:expect.any(String)});expect(validate({...data,receiving:'delivery',street:'Rua Teste',number:'10',district:'Bairro Teste'},{[unit.id]:1000},500)).toEqual({});});
 it('aplica taxa no troco apenas na entrega',()=>{const change=(price(unit)/100).toFixed(2);expect(validate({...data,payment:'cash',change},{[unit.id]:1000},500).change).toBeUndefined();expect(validate({...data,payment:'cash',change,receiving:'delivery'},{[unit.id]:1000},500).change).toBeDefined();expect(validate({...data,payment:'cash',change:'abc'},{[unit.id]:1000},0).change).toBeDefined();});
 it('cartão depende de configuração',()=>{expect(validate({...data,payment:'card'},{[unit.id]:1000},0).payment).toBeDefined();expect(validate({...data,payment:'card'},{[unit.id]:1000},0,true).payment).toBeUndefined();});
 it('converte dinheiro corretamente',()=>{expect(parseMoney('12,34')).toBe(1234);expect(parseMoney('12.3')).toBe(1230);expect(parseMoney('12')).toBe(1200);expect(parseMoney('12,345')).toBeNaN();});
 it('bloqueia produto indisponível',()=>expect(validate(data,{'p12-7':1000},0).cart).toBeDefined());
});
describe('WhatsApp',()=>{
 it('codifica mensagem e exige ambiente de teste e número válido',()=>{expect(new URL(whatsappUrl('5589999999999','Olá & teste\nPedido','teste')).searchParams.get('text')).toBe('Olá & teste\nPedido');expect(()=>whatsappUrl('5589999999999','teste','producao')).toThrow();expect(()=>whatsappUrl('','teste','teste')).toThrow();});
 it('inclui itens, peso, observações e exclui endereço na retirada',()=>{const message=orderMessage({...data,street:'NÃO EXIBIR',notes:'Teste de observação'},{[unit.id]:2000,[kg.id]:750},500,'TESTE-1');expect(message).toContain(unit.name);expect(message).toContain(kg.name);expect(message).toContain('0,75 kg');expect(message).toContain('Teste de observação');expect(message).not.toContain('NÃO EXIBIR');expect(message).toContain('DEMONSTRAÇÃO');});
});
