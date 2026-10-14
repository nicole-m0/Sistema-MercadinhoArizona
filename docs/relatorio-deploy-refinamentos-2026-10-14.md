# Publicação dos refinamentos visuais — 14/10/2026

## Resultado

Refinamentos do commit `8f3a46c765228dd462fe07a4c7ac0b241e0658eb` publicados no projeto demonstrativo existente `mercadinho-arizona-demo`, com autorização do usuário.

- URL pública: https://mercadinho-arizona-demo.vercel.app
- Deployment: `dpl_3tES1Z7DB3E9iNmC7Jmso11gYJhP`.
- Estado informado pela CLI: `READY`.
- URL específica: https://mercadinho-arizona-demo-7ovoyucf9-nick-fb67.vercel.app
- Projeto: `prj_yn5RXg5cc2MrQdgqGEb6rkROvwN0`, equipe `team_sMB0J5D3RlDTM9dHDluheyRl`.

## Diagnóstico e solução da CLI

A CLI instalada é a Vercel 59.24.0, executada com Node.js 22.19.0 no Windows. O erro anterior `Worker timed out after 10 seconds` seguido de `write EPIPE` ocorreu no processo auxiliar `get latest worker`, que verifica novas versões da CLI. O código instalado mostra que a criação desse processo é desativada quando `NO_UPDATE_NOTIFIER` está definido.

Foi definido `$env:NO_UPDATE_NOTIFIER='1'` somente nos processos dos comandos Vercel. Não houve instalação ou atualização de ferramentas, alteração persistente de configuração global ou mudança de código da aplicação. Com essa opção, versão, `whoami`, inspeção do projeto, dry-run e deploy terminaram sem o erro. Autenticação e acesso ao projeto foram confirmados.

O diagnóstico identifica a origem do timeout e do EPIPE no processo auxiliar de atualização; não estabelece a causa ambiental exata de sua inicialização lenta. Não houve evidência de falha de autenticação ou comunicação com a API de deploy na execução corrigida.

O vínculo existente foi preservado, com `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` explícitos durante dry-run/deploy. A opção `--prod` atualizou o domínio público da demonstração; o build da aplicação continua demonstrativo, sem pedidos reais.

Referências consultadas: [CLI da Vercel](https://vercel.com/docs/cli), [opções globais e seleção do projeto](https://vercel.com/docs/cli/global-options) e [deploy](https://vercel.com/docs/cli/deploy). O suporte a `NO_UPDATE_NOTIFIER` foi confirmado diretamente no código da CLI instalada.

## Validação antes da publicação

Na preparação desta publicação, em 14/10:

| Verificação | Resultado |
|---|---|
| Lint | Aprovado |
| Typecheck | Aprovado |
| Testes unitários | 29 aprovados em 4 arquivos |
| Playwright da loja local | 10 aprovados |
| Playwright do build demonstrativo local | 8 aprovados |
| Build `build:demo` | Aprovado |
| Auditoria do build | 215 arquivos estáticos; imagens e fontes iguais às origens |
| Inventário Vercel `deploy --prod --dry --yes` | 216 arquivos, 5.818.071 bytes; `.vercel` e `.vercelignore` excluídos |

O primeiro início dos testes unitários foi bloqueado por leitura do sandbox no esbuild. A repetição fora do sandbox, autorizada pelo usuário, passou. O build e os testes de navegador também foram executados com a permissão necessária.

Pacote enviado: HTML, CSS, JavaScript, 104 JPEGs, 104 WebP, duas fontes WOFF2, duas licenças OFL e `vercel.json`. Nenhum código administrativo, endpoint, arquivo de ambiente ou fonte da aplicação foi enviado. A auditoria não encontrou credenciais ou número pessoal conhecidos nos arquivos da aplicação.

## Verificação depois da publicação

`node scripts/verify-public-deployment.mjs https://mercadinho-arizona-demo.vercel.app` passou:

- Os 215 arquivos servidos coincidem com `dist/` por SHA-256, incluindo os 208 arquivos de imagens e as fontes/licenças.
- HTML referencia `assets/index-C4c_2MV4.js` e `assets/index-B57O31sD.css`, além dos preloads das fontes locais.
- API, admin e caminhos privados examinados retornaram HTTP 404.
- Cabeçalhos `nosniff`, `no-referrer` e `noindex, nofollow` confirmados.
- A verificação usou acesso público, sem autenticação.

Os oito testes Playwright demonstrativos foram executados novamente na URL pública e passaram em 20,5 segundos, com projetos desktop e celular. Cobriram checkout sem envio ou exposição do telefone pessoal, WebP, fallback JPEG, busca/categorias, telas de 320/360/390/1440 px, resumo do pedido e avisos demonstrativos. Não houve envio de pedido ou mensagem. A verificação móvel usa emulação do Chrome.

## Preservação

Código, arquitetura, 104 produtos e funcionalidades foram preservados, sem diferenças nos arquivos de aplicação em relação ao commit autorizado. WhatsApp público e pedidos reais permanecem bloqueados. Não foi criado outro projeto, contratado plano ou ativado Supabase, Cloudinary ou banco de dados.

O pacote anterior foi movido integralmente para `.deploy-demo-previous-20261014-before-refinements/`, dentro do projeto, após verificar os caminhos e o vínculo Vercel. A pasta `.deploy-demo/` foi preparada novamente pelo script existente e recebeu uma cópia dos metadados de vínculo do pacote anterior. Backups anteriores não foram apagados. Os artefatos de validação anteriores foram preservados em `.deploy-demo-previous-20261014-validation/`.

O relatório de retomada existente foi preservado como registro do estado anterior ao deploy. Este relatório registra a conclusão da publicação; nenhuma mudança no código da aplicação foi necessária.
