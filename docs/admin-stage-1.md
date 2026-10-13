# Painel administrativo — Etapa 1

Arquitetura: Vite/TypeScript na loja e painel; API TypeScript em Vercel Functions;
Supabase PostgreSQL/Auth; Cloudinary para imagens; finalização pelo link atual do WhatsApp.

## O que está preparado

- `GET /api/status` localmente com `npm run dev` e como função da Vercel futuramente.
- Configuração exclusivamente de servidor em `.env.server.example`.
- Verificação de identidade pela API Auth do Supabase e de permissão em `admin_users`.
- Política de mesma origem para operações futuras com cookies.
- Assinatura SHA-256 Cloudinary com public IDs restritos, únicos e sem sobrescrita.
- Validação de referências HTTPS do ambiente Cloudinary configurado.
- Esquema SQL com RLS e escritas fechadas para usuários do navegador.
- Seed SQL local dos 104 produtos e 13 categorias com IDs, preços, promoções,
  unidades, disponibilidade, ordem, ícones, cores e caminhos originais preservados.

A loja continua usando o catálogo original. Nenhuma sessão administrativa, tela de
login, CRUD, envio de arquivo ou exclusão remota foi ativada. Nenhum segredo é
importado por `src/`. Os módulos não carregam `.env.server` automaticamente nesta
etapa; o backend futuro receberá as variáveis pelo ambiente do processo.

## Configurações necessárias para continuar

Supabase:

- `SUPABASE_URL`: URL HTTPS do projeto.
- `SUPABASE_PUBLISHABLE_KEY`: chave publicável (ou chave anon legada).
- Definir o e-mail do primeiro administrador; não colocar sua senha no código.
- Desabilitar cadastro público no Auth. Configurar Site URL e redirecionamentos
  somente para as origens aprovadas quando login/recuperação forem implementados.
- Um operador deverá vincular o UUID do usuário a `admin_users` futuramente.
  Essa permissão não poderá ser alterada pelo próprio usuário.
- A chave privilegiada/secret ou service_role só será necessária para ferramentas
  administrativas/provisionamento ou escritas futuras que precisem dela. Não é
  utilizada nesta etapa e nunca deve ter prefixo VITE_.

Cloudinary:

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
- Usar um ambiente de teste separado, se possível.
- Não criar nem habilitar preset unsigned. O fluxo previsto usa uploads assinados
  de servidor, com `resource_type=image` e `type=upload`.
- Nenhum upload preset é necessário para a fundação atual.

Aplicação:

- `APP_ORIGIN`: origem exata (local: `http://127.0.0.1:5173`).
- Manter `ENABLE_REMOTE_OPERATIONS=false`.
- Guardar segredos em variáveis do backend ou `.env.server` ignorado pelo Git;
  não enviar segredos em mensagens, não usar `VITE_*` e não incluí-los em commits.
- Não é necessário fornecer token da Vercel nesta etapa.

## Migração futura, sem execução nesta etapa

1. Revisar `supabase/migrations/001_catalog.sql` e aplicar somente em banco de teste
   vazio, após aprovação. É uma migração versionada para executar uma vez;
   não reutilizar em banco existente com tabelas homônimas.
2. Revisar/aplicar `supabase/seeds/catalog.sql`. O seed usa transação e
   `ON CONFLICT (id) DO NOTHING`; nunca sobrescreve edições.
3. Comparar integralmente os 104 registros, 13 categorias e referências às imagens
   com o catálogo original. Conflitos de IDs devem ser investigados, não ignorados.
4. Testar RLS com usuários anônimos, administradores e autenticados sem permissão.
5. Somente em etapa posterior e autorizada: copiar imagens ao Cloudinary, validar
   conteúdo/URL/public_id e gravar referências. Preservar arquivos demonstrativos.

Regenerar **somente o SQL local**: `node scripts/prepare-catalog-seed.mjs`.
Esse comando não contém conexão com Supabase/Cloudinary.

## Contrato previsto para imagens (etapa posterior)

O backend deverá obter os tokens de uma sessão HttpOnly validada, verificar origem
e administrador e conferir o produto no banco antes de chamar o Cloudinary.
`prepareImageOperation` é uma função interna: seus parâmetros assinados não devem
ser retornados ao navegador. Mesmo uma assinatura não cobre o conteúdo do arquivo.

Antes do envio: validar tamanho (3 MB), bytes reais JPEG/PNG/WebP, decodificação,
dimensões (até 20 milhões de pixels), otimizar e remover metadados. Os limites
estão declarados como política; validação binária/otimização virá na etapa de imagens.

Cadastro: enviar imagem com public_id único e persistir `secure_url` e `public_id`
após verificar a resposta. Substituição: enviar novo arquivo, atualizar o banco
com controle de revisão e só depois retirar a imagem antiga. Falhas precisam de
compensação e limpeza de arquivos órfãos.

Remoção: buscar o public_id armazenado no banco, conferir que pertence ao produto,
desvincular com controle de revisão e solicitar `destroy` assinado com invalidação.
Nunca aceitar um public_id arbitrário vindo do navegador. Preservar fallback local
para produtos migrados; novos produtos deverão ter imagem padrão ou substituta.
Será necessária uma fila persistente de limpeza/repetição antes de ativar remoções.

Login, cookies Secure/HttpOnly/SameSite, renovação/revogação, proteção CSRF e limites
de tentativas serão implementados na Etapa 2. CRUD, auditoria, controle de revisões,
uploads e integração da loja exigem autorização de suas próximas etapas.

## Validação local

Testes da fundação usam somente fetch simulado. SQL ainda não foi executado em
PostgreSQL: sintaxe, grants e RLS deverão ser validados em ambiente de teste
autorizado antes de integrar o catálogo público. Não houve upload, migração remota,
deploy ou contratação de serviço.

Referências: https://cloudinary.com/documentation/signatures e
https://supabase.com/docs/reference/javascript/auth-getuser.
