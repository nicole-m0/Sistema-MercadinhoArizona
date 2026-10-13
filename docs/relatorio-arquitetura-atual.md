# Relatório técnico da arquitetura atual

Data da análise: 12 de outubro de 2026.

O projeto atual é um catálogo estático que funciona no navegador e prepara pedidos
para envio manual pelo WhatsApp. Supabase, Cloudinary e painel administrativo ainda
não participam do funcionamento da loja.

O diretório analisado já é o Mercadinho Arizona. A análise foi feita apenas por
leitura, sem modificações, instalações, testes, migrações ou deploy. Este arquivo
foi acrescentado posteriormente, a pedido do usuário, para facilitar a leitura
e o compartilhamento do relatório.

## 1. Framework e tecnologias

A interface usa TypeScript, HTML e CSS, com manipulação direta do DOM em
`src/main.ts`. Não utiliza React, Vue, Next.js ou outro framework de interface.

Vite é a ferramenta de desenvolvimento e build. As versões registradas no
lockfile incluem Vite 7.3.7 e TypeScript 5.9.3. ESLint, Vitest e Playwright são
ferramentas de qualidade e testes.

## 2. Produtos, preços e categorias

Estão definidos diretamente em `src/catalog.ts`: 13 grupos com 8 produtos cada,
totalizando 104 produtos.

Cada produto recebe ID, nome, categoria, preço, promoção, unidade e
disponibilidade. Os preços são inteiros em centavos: `649` representa R$ 6,49.

As promoções demonstrativas são geradas pelo código: o primeiro produto de cada
categoria recebe aproximadamente 15% de desconto. Alterar esses dados hoje exige
editar o código; em uma versão publicada, exige também novo build e publicação.

## 3. Imagens dos produtos

Existem 104 JPEGs locais em `public/images/products/`, ocupando aproximadamente
3,6 MB. `src/product-images.ts` associa cada ID ao caminho da imagem.

A interface usa elementos `<img>`, carregamento `lazy` no catálogo e CSS com
`object-fit: contain`. As imagens são servidas pela mesma hospedagem do site.

Há um script de otimização para JPEG 600 × 600, qualidade 85 e fundo branco.
A documentação e os prompts registram a criação das imagens demonstrativas com
imagegen; essa ferramenta não é necessária para exibi-las.

## 4. Cloudinary ou outro armazenamento

Não existe integração operacional de armazenamento na loja.

`server/cloudinary.ts` contém funções preparatórias para assinatura SHA-256,
identificação de imagens e validação de referências Cloudinary.

Essas funções não estão conectadas à interface ou a endpoints de upload. O módulo
prepara parâmetros assinados, mas não envia nem exclui arquivos. Os limites de
formato, tamanho e pixels estão declarados; a validação efetiva dos arquivos ainda
não foi implementada.

## 5. Banco de dados

O catálogo atual não consulta banco de dados.

Existem arquivos SQL para um futuro PostgreSQL no Supabase:

- Esquema de produtos, categorias, administradores e auditoria, com regras de acesso.
- Seed dos 104 produtos, preservando os dados demonstrativos.

Esses arquivos são preparação para migração. Sua presença não significa que as
tabelas existam remotamente. A documentação registra que o SQL ainda não foi
executado.

## 6. Painel administrativo

Não existe painel administrativo funcional, tela de login, sessão, logout ou
gerenciamento de produtos.

`server/auth.ts` prepara a verificação de um token no Supabase Auth e a consulta
da permissão administrativa. Ainda não há fluxo que obtenha e mantenha essa sessão.

O único endpoint presente é `/api/status`, que retorna o estado básico da aplicação
sem consultar banco ou serviços externos.

## 7. Finalização pelo WhatsApp

O fluxo implementado é:

```text
Catálogo → Carrinho → Dados do cliente → Revisão
                                            ↓
                             Link wa.me com a mensagem
                                            ↓
                             Cliente envia no WhatsApp
```

`src/domain.ts` calcula valores, valida dados e monta a mensagem com produtos,
quantidades, total, recebimento e pagamento escolhido.

O link utiliza `encodeURIComponent` para incluir a mensagem. Não existe WhatsApp
Business API, envio automático, confirmação de recebimento ou registro de pedidos
no servidor.

O carrinho guarda apenas IDs e quantidades no `localStorage`. Os dados pessoais
preenchidos ficam em memória. A escolha de PIX, dinheiro ou cartão apenas aparece
na mensagem; o site não processa pagamentos.

O código aceita exclusivamente o ambiente `teste` e exige um número válido
configurado. A operação em produção permanece bloqueada.

## 8. Deploy na Vercel

Não foram encontradas evidências locais suficientes para confirmar uma publicação
ou suas configurações.

Não há `vercel.json`, diretório `.vercel`, workflow de deploy ou domínio publicado
identificado nos arquivos analisados. O README declara ausência de publicação
nesta etapa.

O projeto possui um comando de build que executa TypeScript e Vite, gerando
`dist/`. Isso o torna adequado para hospedagem estática. `api/status.ts` foi
preparado para uma futura função na Vercel.

Entretanto, esses arquivos não comprovam vínculo com um projeto Vercel, variáveis
configuradas, domínio ou deploy concluído. Configurações feitas exclusivamente no
painel da Vercel não podem ser confirmadas por este checkout.

## 9. Serviços externos realmente necessários

| Serviço | Participação atual |
|---|---|
| Hospedagem | Necessária para disponibilizar o site publicamente; não precisa ser especificamente Vercel |
| WhatsApp | Necessário para abrir a conversa e enviar o pedido |
| Supabase | Não utilizado pela loja atual |
| Cloudinary | Não utilizado pelas imagens atuais |
| Google Fonts | Usado para fontes; há fallback local |
| Google Maps e Instagram | Links opcionais, sem participação no carrinho ou checkout |
| Gateway de pagamento | Não utilizado |

## 10. Recursos que funcionam sem banco ou serviços pagos

A arquitetura atual permite exibir produtos e imagens, pesquisar sem acentos,
filtrar categorias e ofertas, montar e persistir o carrinho no navegador,
calcular quantidades e totais, preencher o checkout e gerar o link do WhatsApp.

Esses recursos não dependem de banco, Cloudinary, Supabase ou API paga de
mensagens. A hospedagem escolhida pode ter custos próprios.

A limitação é administrativa: o responsável ainda precisa de alterações no
código para atualizar o catálogo. Também não há estoque em tempo real, histórico
centralizado de pedidos ou validação dos preços por um servidor.

## Reprodução no Mercadinho Arizona

É possível reproduzir essa estrutura no Mercadinho Arizona — ela já é a estrutura
deste projeto. Pode ser reutilizada como catálogo estático simples, com imagens
locais e pedidos por link. Para permitir administração sem editar código, será
necessário concluir as etapas de autenticação, banco, painel e integração de
imagens que hoje estão apenas preparadas.
