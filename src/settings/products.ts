import type {Product} from '../product-types';

// Catálogo demonstrativo preservado. Preços em centavos; promoções explícitas.
// Manter IDs estáveis: carrinhos e imagens usam essas referências.
export const catalogProducts: Product[] = [
  {
    "id": "p0-0",
    "name": "Arroz branco 1 kg",
    "category": "Arroz, feijão e cereais",
    "price": 649,
    "promo": 552,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-1",
    "name": "Arroz parboilizado 1 kg",
    "category": "Arroz, feijão e cereais",
    "price": 699,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-2",
    "name": "Arroz integral 1 kg",
    "category": "Arroz, feijão e cereais",
    "price": 899,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-3",
    "name": "Feijão carioca 1 kg",
    "category": "Arroz, feijão e cereais",
    "price": 849,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-4",
    "name": "Feijão preto 1 kg",
    "category": "Arroz, feijão e cereais",
    "price": 899,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-5",
    "name": "Feijão verde 1 kg",
    "category": "Arroz, feijão e cereais",
    "price": 1099,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-6",
    "name": "Milho de pipoca 500 g",
    "category": "Arroz, feijão e cereais",
    "price": 499,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p0-7",
    "name": "Aveia em flocos 170 g",
    "category": "Arroz, feijão e cereais",
    "price": 599,
    "unit": "pacote",
    "available": true,
    "icon": "🌾",
    "color": "#e4bc74"
  },
  {
    "id": "p1-0",
    "name": "Açúcar cristal 1 kg",
    "category": "Açúcar, café e farináceos",
    "price": 449,
    "promo": 382,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-1",
    "name": "Açúcar demerara 1 kg",
    "category": "Açúcar, café e farináceos",
    "price": 699,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-2",
    "name": "Café torrado 250 g",
    "category": "Açúcar, café e farináceos",
    "price": 1299,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-3",
    "name": "Café moído 500 g",
    "category": "Açúcar, café e farináceos",
    "price": 2399,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-4",
    "name": "Farinha de trigo 1 kg",
    "category": "Açúcar, café e farináceos",
    "price": 599,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-5",
    "name": "Farinha de mandioca 1 kg",
    "category": "Açúcar, café e farináceos",
    "price": 799,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-6",
    "name": "Flocão de milho 500 g",
    "category": "Açúcar, café e farináceos",
    "price": 249,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p1-7",
    "name": "Goma de tapioca 500 g",
    "category": "Açúcar, café e farináceos",
    "price": 699,
    "unit": "pacote",
    "available": true,
    "icon": "☕",
    "color": "#b77747"
  },
  {
    "id": "p2-0",
    "name": "Macarrão espaguete 500 g",
    "category": "Massas e enlatados",
    "price": 399,
    "promo": 339,
    "unit": "unidade",
    "available": true,
    "icon": "🍝",
    "color": "#e8b348"
  },
  {
    "id": "p2-1",
    "name": "Macarrão parafuso 500 g",
    "category": "Massas e enlatados",
    "price": 449,
    "unit": "unidade",
    "available": true,
    "icon": "🍝",
    "color": "#e8b348"
  },
  {
    "id": "p2-2",
    "name": "Massa para lasanha 500 g",
    "category": "Massas e enlatados",
    "price": 899,
    "unit": "unidade",
    "available": true,
    "icon": "🍝",
    "color": "#e8b348"
  },
  {
    "id": "p2-3",
    "name": "Milho verde 170 g",
    "category": "Massas e enlatados",
    "price": 449,
    "unit": "unidade",
    "available": true,
    "icon": "🌽",
    "color": "#e8b348"
  },
  {
    "id": "p2-4",
    "name": "Ervilha 170 g",
    "category": "Massas e enlatados",
    "price": 449,
    "unit": "unidade",
    "available": true,
    "icon": "🫛",
    "color": "#e8b348"
  },
  {
    "id": "p2-5",
    "name": "Sardinha em óleo 125 g",
    "category": "Massas e enlatados",
    "price": 649,
    "unit": "unidade",
    "available": true,
    "icon": "🐟",
    "color": "#e8b348"
  },
  {
    "id": "p2-6",
    "name": "Atum ralado 170 g",
    "category": "Massas e enlatados",
    "price": 899,
    "unit": "unidade",
    "available": true,
    "icon": "🐟",
    "color": "#e8b348"
  },
  {
    "id": "p2-7",
    "name": "Seleta de legumes 170 g",
    "category": "Massas e enlatados",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🥕",
    "color": "#e8b348"
  },
  {
    "id": "p3-0",
    "name": "Óleo de soja 900 ml",
    "category": "Óleos, temperos e molhos",
    "price": 799,
    "promo": 679,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-1",
    "name": "Azeite de oliva 500 ml",
    "category": "Óleos, temperos e molhos",
    "price": 3499,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-2",
    "name": "Sal refinado 1 kg",
    "category": "Óleos, temperos e molhos",
    "price": 249,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-3",
    "name": "Molho de tomate 300 g",
    "category": "Óleos, temperos e molhos",
    "price": 249,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-4",
    "name": "Extrato de tomate 300 g",
    "category": "Óleos, temperos e molhos",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-5",
    "name": "Vinagre de álcool 750 ml",
    "category": "Óleos, temperos e molhos",
    "price": 299,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-6",
    "name": "Tempero completo 300 g",
    "category": "Óleos, temperos e molhos",
    "price": 599,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p3-7",
    "name": "Pimenta do reino 30 g",
    "category": "Óleos, temperos e molhos",
    "price": 399,
    "unit": "unidade",
    "available": true,
    "icon": "🫙",
    "color": "#d5a441"
  },
  {
    "id": "p4-0",
    "name": "Leite integral 1 L",
    "category": "Leites e derivados",
    "price": 599,
    "promo": 509,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-1",
    "name": "Leite desnatado 1 L",
    "category": "Leites e derivados",
    "price": 599,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-2",
    "name": "Leite em pó 400 g",
    "category": "Leites e derivados",
    "price": 1599,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-3",
    "name": "Leite condensado 395 g",
    "category": "Leites e derivados",
    "price": 749,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-4",
    "name": "Creme de leite 200 g",
    "category": "Leites e derivados",
    "price": 399,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-5",
    "name": "Bebida láctea 1 L",
    "category": "Leites e derivados",
    "price": 699,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-6",
    "name": "Leite sem lactose 1 L",
    "category": "Leites e derivados",
    "price": 749,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p4-7",
    "name": "Achocolatado 400 g",
    "category": "Leites e derivados",
    "price": 899,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#79a9d0"
  },
  {
    "id": "p5-0",
    "name": "Biscoito cream cracker 350 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 599,
    "promo": 509,
    "unit": "pacote",
    "available": true,
    "icon": "🍘",
    "color": "#ce915e"
  },
  {
    "id": "p5-1",
    "name": "Biscoito maisena 350 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 549,
    "unit": "pacote",
    "available": true,
    "icon": "🍪",
    "color": "#ce915e"
  },
  {
    "id": "p5-2",
    "name": "Biscoito recheado chocolate 130 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 249,
    "unit": "pacote",
    "available": true,
    "icon": "🍫",
    "color": "#ce915e"
  },
  {
    "id": "p5-3",
    "name": "Biscoito recheado morango 130 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 249,
    "unit": "pacote",
    "available": true,
    "icon": "🍓",
    "color": "#ce915e"
  },
  {
    "id": "p5-4",
    "name": "Rosquinhas de coco 300 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 649,
    "unit": "pacote",
    "available": true,
    "icon": "🥥",
    "color": "#ce915e"
  },
  {
    "id": "p5-5",
    "name": "Chocolate ao leite 80 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 699,
    "unit": "pacote",
    "available": true,
    "icon": "🍫",
    "color": "#ce915e"
  },
  {
    "id": "p5-6",
    "name": "Paçoca 200 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 799,
    "unit": "pacote",
    "available": true,
    "icon": "🥜",
    "color": "#ce915e"
  },
  {
    "id": "p5-7",
    "name": "Goiabada 300 g",
    "category": "Biscoitos, bolachas e doces",
    "price": 599,
    "unit": "pacote",
    "available": true,
    "icon": "🍬",
    "color": "#ce915e"
  },
  {
    "id": "p6-0",
    "name": "Refrigerante cola 2 L",
    "category": "Bebidas e refrigerantes",
    "price": 999,
    "promo": 849,
    "unit": "unidade",
    "available": true,
    "icon": "🥤",
    "color": "#e26558"
  },
  {
    "id": "p6-1",
    "name": "Refrigerante guaraná 2 L",
    "category": "Bebidas e refrigerantes",
    "price": 899,
    "unit": "unidade",
    "available": true,
    "icon": "🥤",
    "color": "#e26558"
  },
  {
    "id": "p6-2",
    "name": "Refrigerante laranja 2 L",
    "category": "Bebidas e refrigerantes",
    "price": 799,
    "unit": "unidade",
    "available": true,
    "icon": "🍊",
    "color": "#e26558"
  },
  {
    "id": "p6-3",
    "name": "Água mineral 1,5 L",
    "category": "Bebidas e refrigerantes",
    "price": 349,
    "unit": "unidade",
    "available": true,
    "icon": "💧",
    "color": "#e26558"
  },
  {
    "id": "p6-4",
    "name": "Água com gás 500 ml",
    "category": "Bebidas e refrigerantes",
    "price": 249,
    "unit": "unidade",
    "available": true,
    "icon": "💧",
    "color": "#e26558"
  },
  {
    "id": "p6-5",
    "name": "Suco de uva 1 L",
    "category": "Bebidas e refrigerantes",
    "price": 1199,
    "unit": "unidade",
    "available": true,
    "icon": "🍇",
    "color": "#e26558"
  },
  {
    "id": "p6-6",
    "name": "Suco de laranja 1 L",
    "category": "Bebidas e refrigerantes",
    "price": 999,
    "unit": "unidade",
    "available": true,
    "icon": "🍊",
    "color": "#e26558"
  },
  {
    "id": "p6-7",
    "name": "Água de coco 1 L",
    "category": "Bebidas e refrigerantes",
    "price": 1099,
    "unit": "unidade",
    "available": true,
    "icon": "🥥",
    "color": "#e26558"
  },
  {
    "id": "p7-0",
    "name": "Manteiga 200 g",
    "category": "Frios e laticínios",
    "price": 1199,
    "promo": 1019,
    "unit": "unidade",
    "available": true,
    "icon": "🧈",
    "color": "#f1c95b"
  },
  {
    "id": "p7-1",
    "name": "Margarina 250 g",
    "category": "Frios e laticínios",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🧈",
    "color": "#f1c95b"
  },
  {
    "id": "p7-2",
    "name": "Requeijão 200 g",
    "category": "Frios e laticínios",
    "price": 899,
    "unit": "unidade",
    "available": true,
    "icon": "🧀",
    "color": "#f1c95b"
  },
  {
    "id": "p7-3",
    "name": "Iogurte natural 170 g",
    "category": "Frios e laticínios",
    "price": 399,
    "unit": "unidade",
    "available": true,
    "icon": "🥛",
    "color": "#f1c95b"
  },
  {
    "id": "p7-4",
    "name": "Queijo mussarela",
    "category": "Frios e laticínios",
    "price": 4290,
    "unit": "kg",
    "available": true,
    "icon": "🧀",
    "color": "#f1c95b"
  },
  {
    "id": "p7-5",
    "name": "Presunto cozido",
    "category": "Frios e laticínios",
    "price": 2990,
    "unit": "kg",
    "available": true,
    "icon": "🍖",
    "color": "#f1c95b"
  },
  {
    "id": "p7-6",
    "name": "Queijo coalho",
    "category": "Frios e laticínios",
    "price": 3990,
    "unit": "kg",
    "available": true,
    "icon": "🧀",
    "color": "#f1c95b"
  },
  {
    "id": "p7-7",
    "name": "Iogurte morango 900 g",
    "category": "Frios e laticínios",
    "price": 1199,
    "unit": "unidade",
    "available": true,
    "icon": "🍓",
    "color": "#f1c95b"
  },
  {
    "id": "p8-0",
    "name": "Detergente neutro 500 ml",
    "category": "Produtos de limpeza",
    "price": 249,
    "promo": 212,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-1",
    "name": "Água sanitária 1 L",
    "category": "Produtos de limpeza",
    "price": 449,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-2",
    "name": "Sabão em pó 800 g",
    "category": "Produtos de limpeza",
    "price": 1199,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-3",
    "name": "Amaciante 2 L",
    "category": "Produtos de limpeza",
    "price": 999,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-4",
    "name": "Desinfetante 2 L",
    "category": "Produtos de limpeza",
    "price": 799,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-5",
    "name": "Sabão em barra 5 unidades",
    "category": "Produtos de limpeza",
    "price": 1099,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-6",
    "name": "Esponja de cozinha 3 unidades",
    "category": "Produtos de limpeza",
    "price": 449,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p8-7",
    "name": "Limpador multiuso 500 ml",
    "category": "Produtos de limpeza",
    "price": 599,
    "unit": "unidade",
    "available": true,
    "icon": "🧴",
    "color": "#72bcb2"
  },
  {
    "id": "p9-0",
    "name": "Sabonete 85 g",
    "category": "Higiene pessoal",
    "price": 249,
    "promo": 212,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-1",
    "name": "Creme dental 90 g",
    "category": "Higiene pessoal",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-2",
    "name": "Escova dental macia",
    "category": "Higiene pessoal",
    "price": 599,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-3",
    "name": "Shampoo 350 ml",
    "category": "Higiene pessoal",
    "price": 1299,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-4",
    "name": "Condicionador 350 ml",
    "category": "Higiene pessoal",
    "price": 1399,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-5",
    "name": "Papel higiênico 4 rolos",
    "category": "Higiene pessoal",
    "price": 699,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-6",
    "name": "Desodorante 150 ml",
    "category": "Higiene pessoal",
    "price": 1199,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p9-7",
    "name": "Algodão 50 g",
    "category": "Higiene pessoal",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🧼",
    "color": "#b99aca"
  },
  {
    "id": "p10-0",
    "name": "Banana prata",
    "category": "Hortifruti",
    "price": 599,
    "promo": 509,
    "unit": "kg",
    "available": true,
    "icon": "🍌",
    "color": "#89af65"
  },
  {
    "id": "p10-1",
    "name": "Maçã gala",
    "category": "Hortifruti",
    "price": 999,
    "unit": "kg",
    "available": true,
    "icon": "🍎",
    "color": "#89af65"
  },
  {
    "id": "p10-2",
    "name": "Laranja pera",
    "category": "Hortifruti",
    "price": 499,
    "unit": "kg",
    "available": true,
    "icon": "🍊",
    "color": "#89af65"
  },
  {
    "id": "p10-3",
    "name": "Mamão formosa",
    "category": "Hortifruti",
    "price": 599,
    "unit": "kg",
    "available": true,
    "icon": "🍈",
    "color": "#89af65"
  },
  {
    "id": "p10-4",
    "name": "Tomate",
    "category": "Hortifruti",
    "price": 799,
    "unit": "kg",
    "available": true,
    "icon": "🍅",
    "color": "#89af65"
  },
  {
    "id": "p10-5",
    "name": "Cebola",
    "category": "Hortifruti",
    "price": 499,
    "unit": "kg",
    "available": true,
    "icon": "🧅",
    "color": "#89af65"
  },
  {
    "id": "p10-6",
    "name": "Batata inglesa",
    "category": "Hortifruti",
    "price": 699,
    "unit": "kg",
    "available": true,
    "icon": "🥔",
    "color": "#89af65"
  },
  {
    "id": "p10-7",
    "name": "Cenoura",
    "category": "Hortifruti",
    "price": 599,
    "unit": "kg",
    "available": true,
    "icon": "🥕",
    "color": "#89af65"
  },
  {
    "id": "p11-0",
    "name": "Peito de frango",
    "category": "Carnes e congelados",
    "price": 1899,
    "promo": 1614,
    "unit": "kg",
    "available": true,
    "icon": "🍗",
    "color": "#d18d86"
  },
  {
    "id": "p11-1",
    "name": "Coxa de frango",
    "category": "Carnes e congelados",
    "price": 1299,
    "unit": "kg",
    "available": true,
    "icon": "🍗",
    "color": "#d18d86"
  },
  {
    "id": "p11-2",
    "name": "Carne bovina acém",
    "category": "Carnes e congelados",
    "price": 2999,
    "unit": "kg",
    "available": true,
    "icon": "🥩",
    "color": "#d18d86"
  },
  {
    "id": "p11-3",
    "name": "Carne moída bovina",
    "category": "Carnes e congelados",
    "price": 3299,
    "unit": "kg",
    "available": true,
    "icon": "🥩",
    "color": "#d18d86"
  },
  {
    "id": "p11-4",
    "name": "Linguiça toscana",
    "category": "Carnes e congelados",
    "price": 2199,
    "unit": "kg",
    "available": true,
    "icon": "🌭",
    "color": "#d18d86"
  },
  {
    "id": "p11-5",
    "name": "Filé de tilápia",
    "category": "Carnes e congelados",
    "price": 4299,
    "unit": "kg",
    "available": true,
    "icon": "🐟",
    "color": "#d18d86"
  },
  {
    "id": "p11-6",
    "name": "Costela bovina",
    "category": "Carnes e congelados",
    "price": 2599,
    "unit": "kg",
    "available": true,
    "icon": "🥩",
    "color": "#d18d86"
  },
  {
    "id": "p11-7",
    "name": "Bisteca suína",
    "category": "Carnes e congelados",
    "price": 1999,
    "unit": "kg",
    "available": true,
    "icon": "🥩",
    "color": "#d18d86"
  },
  {
    "id": "p12-0",
    "name": "Papel toalha 2 rolos",
    "category": "Outros produtos de supermercado",
    "price": 599,
    "promo": 509,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-1",
    "name": "Guardanapos 50 unidades",
    "category": "Outros produtos de supermercado",
    "price": 299,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-2",
    "name": "Filtro de café 30 unidades",
    "category": "Outros produtos de supermercado",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-3",
    "name": "Saco para lixo 30 L",
    "category": "Outros produtos de supermercado",
    "price": 699,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-4",
    "name": "Papel alumínio 7,5 m",
    "category": "Outros produtos de supermercado",
    "price": 599,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-5",
    "name": "Filme plástico 15 m",
    "category": "Outros produtos de supermercado",
    "price": 499,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-6",
    "name": "Fósforos 10 caixas",
    "category": "Outros produtos de supermercado",
    "price": 399,
    "unit": "unidade",
    "available": true,
    "icon": "🛍️",
    "color": "#d1ad7c"
  },
  {
    "id": "p12-7",
    "name": "Ração para cães 1 kg",
    "category": "Outros produtos de supermercado",
    "price": 1299,
    "unit": "unidade",
    "available": false,
    "icon": "🛍️",
    "color": "#d1ad7c"
  }
];
