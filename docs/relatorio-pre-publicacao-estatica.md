# Mercadinho Arizona — revisão antes da publicação estática

Data: 12 de outubro de 2026.

## Resultado

O catálogo estático está funcionando nos testes locais e pode ser publicado como
prévia demonstrativa sem banco, Supabase, Cloudinary ou painel administrativo.
A operação comercial ainda depende de dados reais e de ajustes no modo de produção.
Não houve deploy, instalação, contratação de serviços, migração ou alteração do
WhatsApp. Os 104 produtos e suas imagens locais foram preservados.

Nesta revisão foram acrescentados apenas testes, um script de auditoria local e
este relatório. Nenhuma funcionalidade da loja foi modificada. Arquivos de build,
resultados e capturas de testes foram gerados localmente e são ignorados pelo Git.

## 1. Catálogo, pesquisa e categorias

- 104 produtos com identificadores únicos e 13 categorias de 8 produtos.
- Exibição inicial de 24 itens e carregamento progressivo até todos os 104.
- Pesquisa sem acentos e sem distinção de maiúsculas/minúsculas.
- Estado de busca sem resultados e limpeza de filtros funcionando.
- Navegação por todas as 13 categorias e filtro das 13 ofertas testados.
- O produto `p12-7` (ração para cães) continua indisponível e não pode ser adicionado.

Os produtos continuam definidos em `src/catalog.ts`. Não há consulta a banco nem
estoque em tempo real. Atualizações do catálogo exigem edição do código e novo build.

## 2. Imagens

- Todas as 104 imagens carregaram com resposta HTTP 200 no navegador de teste.
- Os JPEGs têm dimensões de 600 × 600 e associação distinta por produto.
- Carregamento lazy do catálogo confirmado em desktop e celular.
- Os testes de arquivos confirmaram JPEGs distintos com menos de 180.000 bytes cada.
- Volume total dos JPEGs: 3.584.297 bytes, aproximadamente 3,6 MB.
- A auditoria SHA-256 confirmou que os 104 JPEGs em `dist/images/products/`
  correspondem byte a byte aos de `public/images/products/`.

As imagens são demonstrativas, geradas previamente; não representam necessariamente
as marcas e embalagens vendidas pelo mercadinho. Elas foram preservadas e podem
continuar sendo usadas, desde que sua apresentação como ilustrativas seja aprovada.

## 3. Cálculos, promoções e totais

Preços e totais são calculados em centavos. Quantidades usam milésimos: 1000
representa uma unidade/pacote ou 1 kg; produtos por kg variam em passos de 250 g.
Cada linha por peso é arredondada ao centavo antes da soma.

Os testes conferiram preços inteiros positivos, promoções positivas menores que
o preço original, quantidades inválidas e soma das linhas. Existem 13 promoções
demonstrativas: o primeiro produto de cada categoria recebe aproximadamente 15%
de desconto por regra do código.

Exemplo conferido independentemente e na interface:

| Item | Quantidade | Preço aplicado | Total |
|---|---|---|---|
| Arroz branco 1 kg | 1 pacote | R$ 5,52 promocional | R$ 5,52 |
| Arroz parboilizado 1 kg | 2 pacotes | R$ 6,99 por pacote | R$ 13,98 |
| Banana prata | 750 g | R$ 5,09/kg promocional | R$ 3,82 |
| Subtotal, retirada | | | **R$ 23,32** |

Após remover os dois pacotes de arroz parboilizado, o total ficou em R$ 9,34.
Reduzindo a banana para 500 g, ficou em R$ 8,07; aumentando novamente para 750 g,
voltou a R$ 9,34. Esses valores foram conferidos no navegador.

## 4. Carrinho e checkout

- Inclusão, aumento, redução e remoção de itens funcionando.
- Carrinho preservado após recarregar a página, com apenas IDs e quantidades em
  `localStorage`; itens e quantidades inválidos são descartados na recuperação.
- Validações de nome, telefone brasileiro, endereço, pagamento e troco testadas.
- Endereço obrigatório para entrega e omitido da mensagem na retirada.
- Taxa considerada na entrega; retirada não acrescenta taxa.
- Seleção de PIX/dinheiro e opção de cartão condicionada à configuração.
- Revisão do pedido, edição dos dados e montagem da mensagem funcionando.
- Abertura do WhatsApp mantém o carrinho e informa que o envio ainda é manual.

Não existe processamento de pagamento, gravação de pedidos, confirmação automática
de recebimento ou validação de preços em servidor. O mercadinho deverá conferir o
pedido recebido antes de confirmar preço, disponibilidade e entrega.

## 5. Responsividade e limites da verificação

Testes completos foram executados em Chrome com viewport desktop de 1440 × 900
e viewport móvel de 390 × 844. A navegação também foi verificada em larguras de
320, 768 e 1440 pixels, sem rolagem horizontal no documento.

As capturas de catálogo em desktop e celular foram inspecionadas: imagens contidas
nos cards, preços legíveis e organização de quatro colunas no desktop e duas no
celular de 390 pixels. O checkout usa uma coluna em telas menores.

As capturas estão em `test-results/`, incluindo:

- `product-images-desktop-viewport.png`
- `product-images-mobile-viewport.png`
- `catalog-desktop.png`
- `catalog-mobile.png`

Os testes de navegador usam o servidor local do Vite. A saída estática foi
verificada pela auditoria de arquivos, mas ainda não foi testada na Vercel.
Emulação móvel não substitui teste no aparelho real, Safari/iPhone, teclado móvel
e abertura do WhatsApp instalado. Nenhuma mensagem foi enviada durante os testes.

## 6. WhatsApp e configuração atual

A configuração local efetiva foi conferida com `loadEnv` nos modos development
e production, sem imprimir o número do telefone:

| Configuração | Resultado |
|---|---|
| Ambiente da aplicação | `teste` |
| Número de WhatsApp de teste | Presente e com formato brasileiro válido, incluindo 55 e DDD |
| Destino no JavaScript do build | Corresponde ao número local de teste |
| Taxa de entrega | 0 centavos |
| Cartão | Desabilitado |

Isso confirma formato e consistência da configuração, não a existência da conta
WhatsApp, identidade do titular ou recebimento real. Esses pontos exigem teste
manual pelo responsável. O número não foi alterado.

Importante: `npm run build` gera um pacote otimizado, mas não habilita a operação
comercial. `whatsappUrl` em `src/domain.ts` rejeita qualquer ambiente diferente
de `teste`. Apenas definir `VITE_AMBIENTE=producao` atualmente bloqueia o link.
Na Vercel, `.env.local` não é enviado pelo Git; as variáveis necessárias terão de
ser configuradas explicitamente no ambiente escolhido antes do build.

## 7. Informações comerciais que precisam de confirmação

Informações atualmente exibidas, transcritas da referência anterior:

| Informação | Valor no projeto | Confirmação necessária |
|---|---|---|
| Nome | Mercadinho Arizona | Nome público aprovado |
| Endereço | Rua 1, nº 31, Bairro Arizona, Oeiras–PI | Endereço completo e localização correta no mapa |
| Horário | Segunda a sábado, 6h30–19h30; domingo, 7h–13h | Horário de atendimento e de recebimento de pedidos |
| Instagram | `mercadinhoarizona.oeiras` | Perfil correto |
| Marca | Composição textual com símbolo de carrinho | Aprovação ou arquivo da logo oficial |
| Produtos e preços | 104 itens demonstrativos | Preços reais, categorias, unidades e disponibilidade |
| Promoções | Descontos automáticos demonstrativos | Ofertas reais e eventual validade |
| Entrega | Opção visível com taxa zero de teste | Bairros, cobertura, taxas, mínimo e prazo, se aplicáveis |
| Pagamento | PIX e dinheiro; cartão desabilitado | Formas aceitas e condições de troco |
| Imagens | Ilustrações demonstrativas locais | Aprovação do uso como ilustrativas |

O responsável ainda deverá informar o número oficial quando autorizar a mudança,
o domínio desejado (se houver) e a conta/projeto Vercel para a publicação.
Nenhuma configuração de Supabase ou Cloudinary é necessária nesta versão.

## 8. Ajustes necessários antes da operação comercial

1. Confirmar os dados da seção anterior, preservando os 104 produtos e imagens
   conforme solicitado e atualizando seus dados comerciais quando aprovados.
2. Preparar um modo de produção explícito com destino próprio, separando-o do
   WhatsApp de teste; não enfraquecer a validação de formato nem aceitar destino
   ausente. Esta mudança ainda não foi aplicada.
3. Atualizar mensagens, avisos, ID do pedido, título e descrição que hoje dizem
   demonstração, teste ou dados fictícios. Remover tais avisos somente quando
   produtos, valores e informações reais estiverem aprovados.
4. Configurar taxa e pagamentos reais, com explicação clara caso a entrega seja
   combinada pelo WhatsApp, em vez de apresentar zero como taxa confirmada.
5. Revisar o README e identificar a documentação administrativa como histórica:
   parte dela ainda descreve a arquitetura Supabase/Cloudinary, agora suspensa.
6. Definir publicação exclusivamente estática, evitando uma função API dispensável.
7. Reexecutar os checks após mudanças e testar o destino/recebimento manualmente,
   inclusive com uma cesta extensa, pois links longos dependem do navegador e do
   WhatsApp. Manter conferência do pedido pelo atendente.

Não foram encontrados defeitos funcionais nos fluxos cobertos pelos testes finais.
As pendências são de produção, dados comerciais e simplificação do contexto de deploy.

## 9. Arquivos preparatórios preservados

Os seguintes itens não são necessários ao funcionamento da loja estática:

| Arquivo ou diretório | Finalidade atual |
|---|---|
| `server/auth.ts`, `server/config.ts`, `server/cloudinary.ts` | Fundação do backend administrativo |
| `supabase/migrations/001_catalog.sql` | Esquema futuro de banco |
| `supabase/seeds/catalog.sql` | Importação futura dos dados |
| `scripts/prepare-catalog-seed.mjs` | Geração local do seed |
| `.env.server.example` | Modelo das variáveis de backend |
| `tests/admin-foundation.test.ts` | Testes simulados da fundação administrativa |
| `api/status.ts` | Endpoint de status dispensável à loja |
| Plugin `local-api-foundation` em `vite.config.ts` | Disponibiliza esse endpoint no desenvolvimento |
| `docs/admin-stage-1.md` | Documentação da etapa administrativa suspensa |

Todos foram preservados. O frontend não os usa, e o build estático inspecionado
não contém referências às integrações Supabase/Cloudinary no JavaScript.
O TypeScript ainda inclui `server` e `api` no typecheck; isso não significa que
esses módulos sejam incluídos no JavaScript da loja.

Para manter o repositório completo como origem do deploy, deve-se impedir que
`api/status.ts` seja publicado como função, por exemplo arquivando-o fora de `api/`
após autorização. Outra opção é publicar apenas o artefato `dist/`, sem enviar o
diretório `api/`. O método será definido antes de publicar; não foi alterado agora.

## 10. Publicação estática na Vercel

É tecnicamente possível publicar a loja sem banco, Supabase, Cloudinary,
autenticação, servidor permanente ou API paga de WhatsApp. A hospedagem pode
servir HTML, CSS, JavaScript e os JPEGs locais gerados em `dist/`.
O suporte ao build Vite é descrito na [documentação oficial da Vercel](https://vercel.com/docs/frameworks/frontend/vite).

Configurações previstas para um build a partir do código-fonte:

- Preset: Vite.
- Diretório raiz: raiz deste projeto.
- Comando de instalação: `npm ci`, com o lockfile existente.
- Comando de build: `npm run build`.
- Diretório de saída: `dist`.
- Variáveis públicas do catálogo configuradas explicitamente no ambiente de deploy.
- Nenhuma variável de Supabase ou Cloudinary necessária.
- A loja usa uma página com navegação por âncoras; não há rota `/admin` a publicar.

Ausência de banco não significa hospedagem comercial gratuita: o plano Hobby
da Vercel é destinado a uso pessoal não comercial. Para a operação do mercadinho,
é necessário escolher um plano compatível com uso comercial antes de publicar.
Fonte: [regras do Vercel Hobby](https://vercel.com/docs/plans/hobby).
Não houve contratação ou mudança de plano.

As fontes Google são opcionais e têm fallback local; Maps e Instagram são links
opcionais. O WhatsApp é necessário apenas na etapa de abrir/enviar a conversa.

## 11. Verificações executadas

| Verificação | Resultado final |
|---|---|
| `npm run typecheck` | Aprovado |
| `npm run lint` | Aprovado |
| `npm test` | 28 testes aprovados em 4 arquivos |
| `npm run test:e2e` | 10 testes aprovados em desktop/celular |
| `npm run build` | Aprovado |
| `node scripts/audit-static-build.mjs` | 104 imagens preservadas e configuração local de teste consistente |
| `git diff --check` | Sem erros de whitespace |

Build gerado: HTML de aproximadamente 0,59 kB, CSS de 11,62 kB e JavaScript de
27,38 kB, além das imagens locais. Os testes adicionais estão em
`tests/static-release.test.js` e `e2e/static-release.spec.ts`.
O script de auditoria é uma verificação local específica desta fase demonstrativa,
executada depois do build; ele deliberadamente exige ambiente `teste` e deve ser
adaptado quando o modo comercial for implementado. Ele não faz chamadas remotas
e não altera arquivos.

Os testes/build que usam esbuild foram executados com a permissão local já
autorizada, devido ao bloqueio de leitura do sandbox. Os testes administrativos
usaram fetch simulado. Nenhuma credencial administrativa foi usada.

## Próxima decisão

Fornecer e aprovar as informações comerciais pendentes, autorizar os ajustes de
produção e decidir como preservar os arquivos preparatórios fora do contexto da
publicação estática. A publicação continua aguardando autorização explícita.
