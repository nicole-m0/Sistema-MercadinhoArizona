# Refinamentos visuais locais — Mercadinho Arizona

Data: 13 de outubro de 2026. Estado: implementado e validado localmente,
aguardando revisão do usuário. Nenhum deploy foi realizado nesta etapa.

## Interface

- Paleta vermelha, amarela e branca preservada, mantendo as seções existentes.
- Banner com título mais equilibrado e ilustração vetorial local em lugar dos
  emojis. Em telas estreitas, texto e ilustração ocupam áreas separadas.
- Textos de apresentação descrevem o checkout demonstrativo, sem prometer envio.
- Busca, carrinho e categorias permanecem acessíveis durante a rolagem. Há uma
  indicação de rolagem lateral das categorias no celular.
- Ícones vetoriais consistentes; áreas de toque dos principais controles de
  carrinho, adição e quantidade têm pelo menos 44 px.
- Cards com fundo de imagem branco, fotos proporcionais, preços alinhados,
  textos auxiliares maiores e estado indisponível padronizado.
- Resumo final com lista de produtos, quantidade, preço por unidade, subtotal
  por item e total em destaque. Dados de teste e mensagem completa permanecem
  disponíveis. A mensagem usada no WhatsApp local não foi modificada.
- Revisão abre no início do modal, com o aviso demonstrativo integralmente visível.
- Rodapé com alinhamento em grade, contraste e espaços revisados.

## Imagens e fontes

Os 104 JPEGs originais permanecem intactos. Foram geradas 104 cópias WebP de
600 × 600, com qualidade 0,82 no encoder do Chrome. Comparação visual de uma
amostra e inspeção dos cards não apontaram perda relevante nos tamanhos usados.
WebP é uma compressão com perdas; os originais ficam disponíveis como fallback.

Volume dos JPEGs: **3.584.297 bytes**. Volume dos WebP: **2.103.130 bytes**.
Redução de **41,3%** para navegadores que selecionam WebP. O pacote total em disco
fica maior por preservar ambos os formatos, mas o navegador seleciona apenas um
formato para cada imagem. Carregamento lazy e decodificação assíncrona mantidos.

DM Sans e Outfit continuam sendo usadas, agora com dois arquivos WOFF2 locais
(69.224 bytes no total), preload e `font-display: swap`. Não há chamadas ao
Google Fonts durante a navegação. As licenças OFL acompanham os arquivos em
`public/fonts/`. Arial/sans-serif continuam como fallback.

## Validação

- Lint, typecheck e build demonstrativo aprovados.
- **29 testes unitários** aprovados, incluindo validação dos WebP e fallback.
- **10 testes Playwright existentes** aprovados em desktop e celular:
  categorias, busca, ofertas, persistência, quantidades, entrega, retirada,
  pagamentos demonstrativos, validação de formulário e revisão.
- **8 testes Playwright demonstrativos** aprovados: privacidade, bloqueio de
  envio, 104 imagens WebP, 104 JPEGs como fallback, layouts de 320/360/390/1440 px,
  resumo estruturado e aviso visível na revisão.
- Conferência visual adicional com Chrome em 1440 × 900, 390 × 844 e 320 × 740.
  Sem transbordamento horizontal da página; duas fontes locais carregadas.
- Auditoria do build: **215 arquivos estáticos**, incluindo 104 JPEGs, 104 WebP,
  duas fontes com licenças, HTML, CSS e JS. Sem telefone pessoal ou credenciais
  locais conhecidos; sem endpoints ou código administrativo no artefato.

A validação móvel usa emulação do Chrome. A revisão em aparelho físico e Safari
pode ser feita pelo usuário antes da atualização pública.

## Revisão local

```sh
npm run build:demo
node scripts/serve-public-demo.mjs
```

Abrir **http://127.0.0.1:5175**. Esse servidor serve somente `dist/`, com o
WhatsApp bloqueado. Para auditoria sem preparar pacote de publicação:

```sh
node scripts/prepare-public-demo.mjs --audit-only
```

Os 104 produtos, preços, categorias e regras do domínio não foram alterados.
Endereço, horários, links comerciais e modalidades de pagamento foram preservados.
Não foram adicionados serviços externos, dependências, banco ou painel. O teste
local de WhatsApp continua disponível pelo fluxo de desenvolvimento existente.

A Vercel permanece na versão anterior até autorização explícita para atualização.
