# Mercadinho Arizona — catálogo de demonstração

Primeira etapa local: TypeScript + Vite, 104 produtos fictícios, 13 categorias, busca sem acentos, filtros, ofertas e carregamento progressivo. Sem banco, autenticação, pagamento online ou deploy.

## Executar

Node.js 22.12+ e npm. No PowerShell com scripts bloqueados, use `npm.cmd`.

```sh
npm install
npm run dev
```

Abra a URL indicada pelo Vite (normalmente http://127.0.0.1:5173).
Checks: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.
Testes de interface: `npm run test:e2e` (Chrome instalado; usa a porta 5174). Verificam o fluxo de checkout no desktop e em viewport de celular, sem envio de mensagem.

## WhatsApp de teste

Copie `.env.example` para `.env.local` e preencha `VITE_WHATSAPP_PEDIDOS_TESTE` com seu número pessoal: 55 + DDD + número, somente dígitos. Reinicie o servidor após alterar esse arquivo.

```dotenv
VITE_AMBIENTE=teste
VITE_WHATSAPP_PEDIDOS_TESTE=
VITE_TAXA_ENTREGA_CENTAVOS=0
VITE_ACEITA_CARTAO=false
```

`WHATSAPP_PEDIDOS_TESTE` está centralizado em `src/config.ts`. O prefixo VITE expõe a configuração pública ao navegador. Sem número válido, o checkout e a revisão funcionam, mas abrir o WhatsApp fica bloqueado. Qualquer ambiente diferente de `teste` é bloqueado nesta versão. Não existe número oficial configurado.

A taxa zero é uma configuração demonstrativa, não confirmação de entrega real gratuita. Taxa configurável em centavos. Cartão começa desabilitado até confirmação de aceitação.

## Roteiro de testes

1. Busque produtos, filtre categorias, veja ofertas e use “Mostrar mais produtos” para acessar todos os 104 itens.
2. Adicione itens e altere quantidades. Produtos por kg variam em 250 g. Remova produtos e recarregue a página para verificar a persistência.
3. Finalize o carrinho usando dados fictícios: Maria Teste, (89) 99999-9999. Para entrega: Rua Teste, 10, Bairro Teste. Não use dados de clientes reais.
4. Teste entrega e retirada, PIX, dinheiro sem troco e com troco. Endereço só é obrigatório na entrega; não há CPF ou dados de cartão.
5. Clique em “Revisar e confirmar pedido”, confira a mensagem completa e edite se necessário. Abra o WhatsApp configurado e confirme o envio manualmente no aplicativo. Abrir o WhatsApp não confirma envio e mantém o carrinho.
6. Verifique campos vazios, telefone inválido, troco insuficiente e a ração para cães indisponível.

Somente IDs e quantidades do carrinho são persistidos no localStorage. Dados de checkout ficam em memória e são descartados ao fechar a janela. Não há logs de dados pessoais. Abrir o WhatsApp transmite a mensagem ao serviço via link oficial wa.me, necessário para o fluxo solicitado.

## Organização

- `src/catalog.ts`: catálogo e ilustrações SVG próprias, específicas e identificadas como demonstrativas; não são fotografias reais. Emojis variam por dispositivo.
- `src/domain.ts`: valores em centavos, quantidades em milésimos (1000 = uma unidade ou 1 kg), validações e mensagem. Cada linha por peso é arredondada uma vez ao centavo; totais somam as linhas.
- `src/config.ts`: ambiente, destino, entrega e aceitação de cartão.
- `src/main.ts` e `src/style.css`: interface responsiva, carrinho, checkout e revisão. Dados são escapados antes da inserção em HTML.
- `tests/domain.test.ts`: testes de cálculos, validação, indisponibilidade, persistência e destino do WhatsApp.

Horário/endereço transcritos da referência: Rua 1, nº 31, Bairro Arizona, Oeiras–PI; seg. a sáb. 6h30–19h30, dom. 7h–13h. Confirmar antes de operação real. A marca é uma composição textual inspirada na referência com símbolo de carrinho; substituir pelo arquivo oficial da logo futuramente. Fontes Google opcionais têm fallback local.

Ainda validar no seu aparelho: layout, teclado, acessibilidade, entrega/retirada, destino e mensagem no WhatsApp. Testar também cesta extensa: links longos dependem do navegador e do WhatsApp. Não há confirmação automática de recebimento, registro de pedidos ou estoque em tempo real.

## Produção bloqueada

Sem publicação nesta etapa. Após seus testes e autorização explícita: confirmar produtos, fotos, preços, estoque, logo, horário, endereço, entrega e pagamentos; cadastrar número oficial; revisar segurança, acessibilidade e dispositivos móveis; preparar Vercel. Os avisos demonstrativos só podem ser removidos com dados reais confirmados.

