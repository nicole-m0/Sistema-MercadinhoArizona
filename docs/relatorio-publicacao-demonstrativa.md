# Mercadinho Arizona — publicação demonstrativa

Data: 12 de outubro de 2026.

## Endereço público

**https://mercadinho-arizona-demo.vercel.app**

O endereço abre sem autenticação e pode ser acessado pelo celular. A publicação
foi concluída com estado `READY` e verificada após o deploy.

## Escopo preservado

- 104 produtos fictícios, 13 categorias e 104 imagens JPEG locais.
- Pesquisa, filtros, ofertas, carrinho, checkout e revisão da mensagem.
- Avisos de produtos, preços e pedidos demonstrativos.
- Carrinho persistido somente no navegador; dados do checkout ficam em memória.
- Nenhuma integração ativa com Supabase, Cloudinary ou banco de dados.
- Nenhum painel administrativo ou endpoint preparatório publicado.
- Nenhum pedido real, pagamento ou envio de mensagem habilitado.

As funções e arquivos preparatórios existentes no repositório foram preservados
e ficaram fora do pacote enviado.

## WhatsApp e privacidade

Foi acrescentado um build específico, `npm run build:demo`, que usa o modo
`public-demo` do Vite. Nesse build, a configuração é explicitamente limitada a:

- Ambiente da aplicação: `teste`.
- Demonstração pública: habilitada.
- Número de WhatsApp de teste: vazio.
- Taxa demonstrativa: zero.
- Cartão: desabilitado.

As definições do build público prevalecem sobre variáveis do shell e `.env.local`,
impedindo que o número pessoal seja incorporado ao JavaScript publicado.

Na demonstração, o contato do rodapé está desabilitado e a revisão não mostra
destinatário nem link para o WhatsApp. O botão informa que o envio está
desabilitado. A possibilidade de testar o link localmente permanece em
`npm run dev`, usando a configuração privada existente.

O número oficial não foi configurado e o número pessoal local não foi alterado.
Nenhum número pessoal é registrado neste relatório.

O pacote foi examinado em busca do telefone e das credenciais conhecidas nos
ambientes locais e do shell. Não foram encontrados esses valores, referências
às integrações administrativas ou arquivos `.env` no material publicado.
Foram publicados apenas artefatos revisados; dados pessoais do usuário não foram
incluídos. O telefone fictício de exemplo do checkout permanece identificado
como exemplo demonstrativo.

## Conta e plano

A CLI autenticada e a API da Vercel confirmaram uma equipe com plano **Hobby ativo**.
Não houve contratação, mudança de plano, instalação de integração ou serviço pago.

As regras oficiais permitem uso pessoal não comercial no Hobby. A publicação
foi limitada ao escopo de demonstração e testes definido pelo usuário, com produtos
fictícios e sem pedidos reais ou processamento de pagamentos. A verificação de
plano não representa aprovação individual do site pelo suporte da Vercel.

Uma futura utilização comercial, promocional ou remunerada precisa ser reavaliada
conforme as [regras de uso da Vercel](https://vercel.com/docs/limits/fair-use-guidelines)
e as [condições do Hobby](https://vercel.com/docs/plans/hobby), além de autorização
do usuário. Não foi feito upgrade nesta publicação.

## Forma de publicação

O build foi gerado localmente e copiado para a pasta ignorada `.deploy-demo/`.
Um inventário `vercel deploy --dry` confirmou exatamente:

| Conteúdo enviado | Quantidade |
|---|---:|
| HTML | 1 |
| CSS | 1 |
| JavaScript | 1 |
| JPEGs dos produtos | 104 |
| Configuração estática Vercel | 1 |
| Total | **108 arquivos** |

Volume total do envio: 3.624.156 bytes, aproximadamente 3,6 MB.
Não foram enviados `src/`, `api/`, `server/`, `supabase/`, testes, relatórios,
credenciais ou arquivos de ambiente. Uma whitelist `.vercelignore` exclui
metadados e arquivos locais que a CLI possa criar.

Na criação do projeto, a CLI conectou automaticamente o repositório Git. Essa
conexão foi removida e sua ausência foi confirmada antes do deploy, para impedir
publicação automática do repositório completo em futuros commits. O arquivo
`.env.local` criado pela CLI dentro da pasta temporária foi retirado dessa pasta;
o `.env.local` original do projeto foi preservado.

O projeto Vercel foi configurado sem framework de servidor, sem comando de build
remoto e sem instalação de dependências. A Vercel recebeu somente o frontend
já gerado. O canal público da hospedagem usa o parâmetro `--prod`, mas isso
**não habilita produção comercial na aplicação**: o bundle continua em ambiente
`teste`, com envio desabilitado e avisos demonstrativos.

Cabeçalhos confirmados no endereço público:

- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: no-referrer`.
- `X-Robots-Tag: noindex, nofollow`, para solicitar que buscadores não indexem a demonstração.

## Verificações executadas

| Verificação | Resultado |
|---|---|
| Typecheck | Aprovado |
| Lint | Aprovado |
| Testes automatizados | 28 aprovados |
| Interface local original | 10 testes aprovados em desktop/celular |
| Pacote público servido localmente | 4 testes aprovados em desktop/celular |
| Endereço público após deploy | 4 testes aprovados em desktop/celular |
| Build público Vite | Aprovado |
| Auditoria dos arquivos de envio | 108 arquivos esperados, nenhum inesperado |
| Integridade dos arquivos publicados | 107 arquivos servidos iguais ao build por SHA-256 |

Os testes da interface pública confirmaram busca, categoria, todos os 104 JPEGs
com dimensões de 600 × 600, carrinho, checkout até a revisão, avisos fictícios,
ausência de destinatário pessoal e envio desabilitado.

O acesso remoto foi testado sem cookies ou autenticação Vercel. Estas rotas
retornaram HTTP 404:

- `/api/status`
- `/admin`
- `/.env.local`
- `/.vercel/project.json`
- `/server/auth.ts`
- `/supabase/seeds/catalog.sql`

Os 107 arquivos servidos (HTML, CSS, JavaScript e 104 imagens) foram baixados
somente para comparação em memória, sem registrar valores pessoais. Nenhum
pedido foi enviado nos testes. Emulação de celular foi feita em Chrome; o usuário
ainda pode conferir o endereço no seu aparelho real e no Safari.

## Arquivos relevantes para manutenção

- `src/config.ts`: separação entre teste local e demonstração pública.
- `src/main.ts`: bloqueio visual do WhatsApp no site demonstrativo.
- `vite.config.ts`: definições explícitas do build público sem telefone pessoal.
- `scripts/prepare-public-demo.mjs`: auditoria e preparação local do pacote.
- `scripts/serve-public-demo.mjs`: servidor estático usado apenas nos testes.
- `scripts/verify-public-deployment.mjs`: comparação remota de integridade e rotas.
- `playwright.demo.config.ts` e `e2e-public/demo.spec.ts`: testes do artefato público.

O preparador exige pasta `.deploy-demo/` vazia ou inexistente e não faz deploy por
conta própria. Uma atualização futura precisa preparar novamente um pacote limpo,
revisar o inventário e manter a publicação limitada ao frontend estático.
O build comum `npm run build` continua disponível para uso local e pode carregar
o telefone de teste; **para publicação desta demonstração, usar `npm run build:demo`**.

Nenhuma etapa comercial ou administrativa foi iniciada.
