# Mercadinho Arizona — catálogo de demonstração

Demonstração pública: https://mercadinho-arizona-demo.vercel.app
Publicada apenas como frontend estático, sem número pessoal e com WhatsApp
desabilitado. Veja [o relatório de publicação](docs/relatorio-publicacao-demonstrativa.md).

Refinamentos visuais publicados em 14/10/2026:
[relatório do deploy](docs/relatorio-deploy-refinamentos-2026-10-14.md).
Para revisar a demonstração com envio bloqueado, execute `npm run build:demo`
e `node scripts/serve-public-demo.mjs`; abra http://127.0.0.1:5175.
Esse servidor lê `dist/` e não publica arquivos.

Versão pública demonstrativa: `npm run build:demo` gera `dist/` com o WhatsApp
desabilitado e sem o número pessoal. O teste local permanece com `npm run dev`.
Para auditar e preparar somente os arquivos estáticos: `node scripts/prepare-public-demo.mjs`.
O script exige uma pasta `.deploy-demo/` vazia ou inexistente para evitar arquivos antigos.
Teste do build demonstrativo local: `npx playwright test --config playwright.demo.config.ts`.

Os testes demonstrativos agora servem diretamente o build de `dist/`.
Auditoria sem copiar arquivos nem publicar: `node scripts/prepare-public-demo.mjs --audit-only`.
Os 104 JPEGs originais permanecem como fallback de 104 WebP locais, derivados
com `node scripts/optimize-webp.mjs` (Chrome instalado). As fontes DM Sans e
Outfit são locais em `public/fonts/`, com as licenças OFL no mesmo diretório.

Arquivos da preparação administrativa estão preservados apenas como histórico:
[arquitetura e limites da etapa suspensa](docs/admin-stage-1.md). Esta versão usa
o catálogo original e imagens locais, sem Supabase, Cloudinary ou painel.

TypeScript + Vite, 104 produtos fictícios, 13 categorias, busca sem acentos,
filtros, ofertas e carregamento progressivo. Sem banco, autenticação ou pagamento
online. A publicação existente é exclusivamente demonstrativa.

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

- `src/settings/products.ts`: 104 registros explícitos, preços em centavos e promoções preservadas. Editar somente após aprovação; preservar IDs para não trocar itens em carrinhos salvos.
- `src/catalog.ts`: acesso aos produtos, categorias e imagens, sem geração automática de descontos.
- `src/product-images.ts`: associação de cada produto a um JPEG local exclusivo em `public/images/products/`.
- `scripts/product-image-prompts.json`: prompts das imagens demonstrativas criadas com a ferramenta imagegen; aparência fotográfica, sem marcas comerciais, sem fotografias de embalagens reais copiadas.
- `scripts/optimize-product-image.ps1`: otimização dos originais para JPEG 600 × 600, qualidade 85, fundo branco e proporção preservada. No Windows: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/optimize-product-image.ps1 -Source caminho-do-original.png -Destination caminho-do-produto.jpg`.
- `scripts/preview-product-images.mjs`: gera pranchas para revisão visual em `test-results/image-review/` com `node scripts/preview-product-images.mjs` (Chrome instalado).
- `tests/product-images.test.js` e `e2e/product-images.spec.ts`: verificam arquivos únicos, tamanho e carregamento das 104 imagens no desktop e celular. O catálogo mantém carregamento lazy.
- `src/domain.ts`: valores em centavos, quantidades em milésimos (1000 = uma unidade ou 1 kg), validações e mensagem. Cada linha por peso é arredondada uma vez ao centavo; totais somam as linhas.
- `src/config.ts` e `src/settings/runtime.ts`: resolução do ambiente, sem fallback do telefone pessoal para o oficial.
- `src/main.ts` e `src/style.css`: interface responsiva, carrinho, checkout e revisão. Dados são escapados antes da inserção em HTML.
- `tests/domain.test.ts`: testes de cálculos, validação, indisponibilidade, persistência e destino do WhatsApp.

Horário/endereço transcritos da referência: Rua 1, nº 31, Bairro Arizona, Oeiras–PI; seg. a sáb. 6h30–19h30, dom. 7h–13h. Confirmar antes de operação real. A marca é uma composição textual inspirada na referência com símbolo de carrinho; substituir pelo arquivo oficial da logo futuramente. Fontes locais com fallback para Arial e sans-serif, sem chamadas ao Google Fonts.

Ainda validar no seu aparelho: layout, teclado, acessibilidade, entrega/retirada, destino e mensagem no WhatsApp. Testar também cesta extensa: links longos dependem do navegador e do WhatsApp. Não há confirmação automática de recebimento, registro de pedidos ou estoque em tempo real.

## Produção bloqueada

A publicação demonstrativa não habilita operação comercial: o site público mantém
avisos fictícios e não abre o WhatsApp. Uma versão comercial exige autorização
explícita e confirmação de produtos, fotos, preços, estoque, logo, horário,
endereço, entrega e pagamentos, além do número oficial e plano de hospedagem
compatível. Os avisos demonstrativos só podem ser removidos com dados reais confirmados.

## Preparação comercial local — pedidos reais bloqueados

Esta preparação não foi publicada. Nenhum serviço remoto, painel ou banco foi ativado.

| Comando | Ambiente | Resultado |
|---|---|---|
| `npm run dev` | Teste local | Mantém `.env.local` e WhatsApp pessoal exclusivamente para testes |
| `npm run build:demo` | Demonstração | `dist/`, avisos fictícios, telefone pessoal excluído e envio bloqueado |
| `npm run build` | Demonstração segura | Mesmo bloqueio, sem herdar o destino pessoal |
| `npm run build:commercial` | Preparação de produção comercial | `dist-commercial/`, avisos preservados e pedidos reais bloqueados |

Configurações públicas editáveis, sempre mediante confirmação:

- `src/settings/store.ts`: nome, marca textual, endereço, horários, localização, Instagram e `officialWhatsApp`. Os valores atuais vieram da demonstração e `confirmed` permanece `false`. O número oficial começa vazio; não usar telefone pessoal neste campo.
- `src/settings/checkout.ts`: `commercialCheckout.receiving` habilita entrega/retirada; `payments` habilita PIX/dinheiro/cartão; `feeCents` define taxa fixa em centavos. Todas as opções comerciais começam desabilitadas e a taxa começa `null` (não confirmada). Entrega configurada exige taxa inteira não negativa; zero só após confirmar gratuidade.
- As opções `demonstrationStore` e `demonstrationCheckout` mantêm o funcionamento demonstrativo separado da preparação comercial. O teste local preserva a taxa e aceitação de cartão já configuradas no ambiente local.
- `src/settings/products.ts`: nome, categoria, preço, promoção opcional, unidade e disponibilidade de cada produto. Fotos continuam locais, com vínculos em `src/product-images.ts`; os 104 JPEGs e 104 WebP foram preservados.

As opções desabilitadas somem do checkout e são rejeitadas pela validação. Sem recebimento ou pagamento habilitado, o catálogo e o carrinho continuam funcionando, mas o checkout não avança. O campo `confirmed` registra a confirmação dos dados; não é um interruptor de envio.

Revisão local da preparação comercial: `npm run build:commercial`, depois
`node scripts/serve-public-demo.mjs --commercial`, em http://127.0.0.1:5176.
Usar somente dados fictícios. Comandos locais não fazem deploy.

Validação: lint, typecheck, `npm test`, `npm run test:e2e`, `npm run test:e2e:demo`
(após build demonstrativo) e `npm run test:e2e:commercial` (após build comercial).
Auditoria demonstrativa somente de leitura: `node scripts/prepare-public-demo.mjs --audit-only`.
Auditoria da preparação comercial: `node scripts/prepare-public-demo.mjs --audit-only --commercial`.
O preparador rejeita a criação de pacote comercial nesta etapa.

Ativação futura exige nova autorização: aprovar dados reais e regras comerciais,
adaptar os avisos/mensagem e habilitar explicitamente um fluxo comercial testado.
Preencher o número oficial, mudar os campos `confirmed` ou gerar o build comercial
não ativa pedidos nesta etapa: `commercialOrdersEnabled` é fixo em `false`,
o fluxo comercial não cria links de envio e `whatsappUrl` rejeita produção.
O atendente continuará conferindo preços, disponibilidade e peso final; não há
validação por servidor, pagamento online ou confirmação automática do pedido.

