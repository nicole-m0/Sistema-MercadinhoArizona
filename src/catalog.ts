import {productImages} from './product-images';
export type Product = { id:string; name:string; category:string; price:number; promo?:number; unit:string; available:boolean; icon:string; color:string };
const groups: [string,string,string,string,string[],number[]][] = [
 ['Arroz, feijão e cereais','🌾','#e4bc74','pacote',['Arroz branco 1 kg','Arroz parboilizado 1 kg','Arroz integral 1 kg','Feijão carioca 1 kg','Feijão preto 1 kg','Feijão verde 1 kg','Milho de pipoca 500 g','Aveia em flocos 170 g'],[649,699,899,849,899,1099,499,599]],
 ['Açúcar, café e farináceos','☕','#b77747','pacote',['Açúcar cristal 1 kg','Açúcar demerara 1 kg','Café torrado 250 g','Café moído 500 g','Farinha de trigo 1 kg','Farinha de mandioca 1 kg','Flocão de milho 500 g','Goma de tapioca 500 g'],[449,699,1299,2399,599,799,249,699]],
 ['Massas e enlatados','🍝','#e8b348','unidade',['Macarrão espaguete 500 g','Macarrão parafuso 500 g','Massa para lasanha 500 g','Milho verde 170 g','Ervilha 170 g','Sardinha em óleo 125 g','Atum ralado 170 g','Seleta de legumes 170 g'],[399,449,899,449,449,649,899,499]],
 ['Óleos, temperos e molhos','🫙','#d5a441','unidade',['Óleo de soja 900 ml','Azeite de oliva 500 ml','Sal refinado 1 kg','Molho de tomate 300 g','Extrato de tomate 300 g','Vinagre de álcool 750 ml','Tempero completo 300 g','Pimenta do reino 30 g'],[799,3499,249,249,499,299,599,399]],
 ['Leites e derivados','🥛','#79a9d0','unidade',['Leite integral 1 L','Leite desnatado 1 L','Leite em pó 400 g','Leite condensado 395 g','Creme de leite 200 g','Bebida láctea 1 L','Leite sem lactose 1 L','Achocolatado 400 g'],[599,599,1599,749,399,699,749,899]],
 ['Biscoitos, bolachas e doces','🍪','#ce915e','pacote',['Biscoito cream cracker 350 g','Biscoito maisena 350 g','Biscoito recheado chocolate 130 g','Biscoito recheado morango 130 g','Rosquinhas de coco 300 g','Chocolate ao leite 80 g','Paçoca 200 g','Goiabada 300 g'],[599,549,249,249,649,699,799,599]],
 ['Bebidas e refrigerantes','🥤','#e26558','unidade',['Refrigerante cola 2 L','Refrigerante guaraná 2 L','Refrigerante laranja 2 L','Água mineral 1,5 L','Água com gás 500 ml','Suco de uva 1 L','Suco de laranja 1 L','Água de coco 1 L'],[999,899,799,349,249,1199,999,1099]],
 ['Frios e laticínios','🧀','#f1c95b','unidade',['Manteiga 200 g','Margarina 250 g','Requeijão 200 g','Iogurte natural 170 g','Queijo mussarela','Presunto cozido','Queijo coalho','Iogurte morango 900 g'],[1199,499,899,399,4290,2990,3990,1199]],
 ['Produtos de limpeza','🧴','#72bcb2','unidade',['Detergente neutro 500 ml','Água sanitária 1 L','Sabão em pó 800 g','Amaciante 2 L','Desinfetante 2 L','Sabão em barra 5 unidades','Esponja de cozinha 3 unidades','Limpador multiuso 500 ml'],[249,449,1199,999,799,1099,449,599]],
 ['Higiene pessoal','🧼','#b99aca','unidade',['Sabonete 85 g','Creme dental 90 g','Escova dental macia','Shampoo 350 ml','Condicionador 350 ml','Papel higiênico 4 rolos','Desodorante 150 ml','Algodão 50 g'],[249,499,599,1299,1399,699,1199,499]],
 ['Hortifruti','🥬','#89af65','kg',['Banana prata','Maçã gala','Laranja pera','Mamão formosa','Tomate','Cebola','Batata inglesa','Cenoura'],[599,999,499,599,799,499,699,599]],
 ['Carnes e congelados','🥩','#d18d86','kg',['Peito de frango','Coxa de frango','Carne bovina acém','Carne moída bovina','Linguiça toscana','Filé de tilápia','Costela bovina','Bisteca suína'],[1899,1299,2999,3299,2199,4299,2599,1999]],
 ['Outros produtos de supermercado','🛍️','#d1ad7c','unidade',['Papel toalha 2 rolos','Guardanapos 50 unidades','Filtro de café 30 unidades','Saco para lixo 30 L','Papel alumínio 7,5 m','Filme plástico 15 m','Fósforos 10 caixas','Ração para cães 1 kg'],[599,299,499,699,599,499,399,1299]]
];
const specificIcons:Record<number,string[]>={2:['🍝','🍝','🍝','🌽','🫛','🐟','🐟','🥕'],5:['🍘','🍪','🍫','🍓','🥥','🍫','🥜','🍬'],6:['🥤','🥤','🍊','💧','💧','🍇','🍊','🥥'],7:['🧈','🧈','🧀','🥛','🧀','🍖','🧀','🍓'],10:['🍌','🍎','🍊','🍈','🍅','🧅','🥔','🥕'],11:['🍗','🍗','🥩','🥩','🌭','🐟','🥩','🥩']};
export const products: Product[] = groups.flatMap(([category,icon,color,unit,names,prices],g)=> names.map((name,i)=>({id:`p${g}-${i}`,name,category,price:prices[i],promo:i===0?Math.round(prices[i]*0.85):undefined,unit:g===7&&i>=4&&i<=6?'kg':unit,available:!(g===12&&i===7),icon:specificIcons[g]?.[i]??icon,color})));
export const categories=groups.map(g=>g[0]);
export function illustration(p:Product){
 return productImages[p.id];
}
