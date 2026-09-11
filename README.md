# PK Fotografia

Portfólio público com galerias, filmes do Vimeo e painel privado. Criado com React, Vinext, Cloudflare D1 e R2, hospedado por Sites.

## Usar o painel

Abra `/admin` e entre com a conta do ChatGPT autorizada pelo proprietário.

1. Clique em **Novo trabalho** e informe o título.
2. Envie as fotos em JPG, PNG ou WebP. Até 200 por trabalho, 40 MB por original. O navegador prepara miniaturas e imagens ampliadas de até 2560 pixels, sem ampliar originais menores.
3. Marque até **cinco estrelas**: somente essas fotos aparecem na página inicial. As demais continuam na galeria completa. As primeiras cinco são selecionadas automaticamente no envio.
4. Escolha **Usar como capa**. A capa ocupa um dos cinco destaques e aparece primeiro, em posição maior.
5. Use as setas para ordenar a galeria, preencha as descrições e, se houver, cole o link completo do Vimeo. Não cole HTML. Vídeos não listados precisam do código extra no link; a incorporação deve estar permitida no Vimeo.
6. Salve como rascunho, abra a versão salva e publique quando estiver pronto. **Despublicar** retira o trabalho e suas imagens do acesso público.
7. Em **Marca & apresentação**, altere o texto e envie a logo. A versão para fundo escuro é opcional. Salve a marca para aplicar.

As fotos enviadas ficam no armazenamento R2. O banco D1 mantém galerias, seleção e ordem. O portfólio não guarda os originais e não substitui backup. Remover uma foto da seleção não apaga o arquivo armazenado. A galeria inicial é demonstrativa, identificada como tal, com créditos do Unsplash ao ampliar as fotos. Não há filme fictício: o botão aparece quando um vídeo é adicionado.

## Desenvolvimento

Node 22.13 ou superior. Execute `npm ci`, copie `.env.example` para `.env`, preencha as variáveis e rode `npm run dev`.

O mock de login da prévia usa `seedy@sites.test`. Para testes locais, defina `ADMIN_EMAIL=seedy@sites.test` e `SITE_ORIGIN=http://localhost:5173`. Em produção, o e-mail é configurado como segredo da plataforma. Não publique `.env`.

Após mudar o schema: `npm run db:generate`, `npm run build` e aplique cada migração local pendente usando Wrangler e `.wrangler/state`. A hospedagem aplica as migrações de produção antes de publicar.

Verificação: `node node_modules/typescript/bin/tsc --noEmit`; com prévia e migrações locais prontas, `node scripts/check-local-flows.mjs`. O teste cria dados somente na prévia local e verifica autorização, origem, upload, rascunhos, publicação, conflitos de versão e despublicação.

## Autenticação e segurança

A hospedagem Sites inicia o login por `/signin-with-chatgpt` e fornece identidade autenticada ao servidor. Todas as mutações exigem a conta configurada em `ADMIN_EMAIL` e origem igual a `SITE_ORIGIN`. O navegador não recebe esse segredo. Login de outro usuário não concede administração. As rotas de mídia checam a publicação e a presença da foto na seleção salva antes de responder a um visitante anônimo. Rascunhos não são indexados. Há controle otimista de versão para não sobrescrever alterações de outra aba.

A API aceita imagens WebP preparadas pelo navegador e verifica formato e tamanho. SVG e HTML não são aceitos como uploads. Links de vídeo são limitados aos domínios oficiais do Vimeo. O player só é carregado ao clicar.

No painel, WebMCP expõe leitura do editor e preparação de destaques, usando os mesmos controles; preparar destaques não salva nem publica.

## Publicação

O código público no GitHub é uma cópia do projeto. Publicar um commit no GitHub, por si só, não atualiza a hospedagem Sites. As atualizações de conteúdo feitas pelo painel aparecem diretamente, sem recompilar ou editar código. Para atualizações de código, gerar build e publicar nova versão por Sites.

## Imagens da demonstração

Fotos de Nathan Dumlao, Wu Jianxiong, Bob Oh, Jeremy Wong Weddings, Sandy Millar, Foto Pettine e Leonardo Miranda. Fontes individuais em `lib/demo.ts`. Licença: https://unsplash.com/license. As imagens de demonstração são carregadas do Unsplash; fotos próprias são armazenadas no R2.
