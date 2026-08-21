# Visão geral

## Propósito

O site deve apresentar a atuação e as mensagens institucionais de Edson Albertassi, manter apoiadores informados e transformar apoio em participação digital. Sua principal ação é **Faça sua foto**, que permite criar peças oficiais da campanha sem exigir conhecimento de edição.

## Público

- Eleitores buscando informações oficiais.
- Apoiadores que desejam divulgar a campanha.
- Imprensa e lideranças consultando notícias e agenda.
- Equipe de comunicação responsável por notícias, banners e materiais.

## Objetivos do produto

1. Comunicar com clareza a identidade e as prioridades da campanha.
2. Destacar eventos e comunicados urgentes por meio de banners administráveis.
3. Publicar notícias institucionais, inclusive conteúdos relacionados à Justiça.
4. Dar visibilidade às redes sociais, com destaque para o Instagram.
5. Exibir o grupo de apoiadores com Edson em posição central na composição.
6. Gerar peças prontas para avatar, feed e story a partir de uma foto enviada pelo usuário.

## Escopo do MVP

### Área pública

- Landing page responsiva.
- Cabeçalho com navegação por seções e chamada para o gerador.
- Hero institucional.
- Seção **Faça sua foto**.
- Seção de apoiadores com composição visual e celular central de Edson.
- Seção de redes sociais com Instagram em evidência.
- Banner de evento, reunião, adesivaço ou comunicado.
- Seção final com duas matérias externas fixas, atribuídas ao veículo e à data de publicação.
- Listagem de notícias com paginação.
- Página individual de notícia com metadados sociais e SEO.
- Rodapé com redes, informações legais e canais oficiais.

### Área administrativa

- Login protegido.
- Dashboard com resumo do conteúdo.
- Criar, editar, visualizar, publicar e arquivar notícias.
- Criar, programar, ativar e desativar banners.
- Gerenciar imagens públicas e textos alternativos.
- Gerenciar molduras oficiais do gerador de imagens.

### Ordem da landing page

A home segue a ordem definida para a entrega atual: **Hero → WhatsApp → Redes sociais → Galeria → Notícias**. A seção de notícias é a última dentro de `main` e apresenta somente os dois cards externos aprovados. O admin e as páginas internas continuam disponíveis para o fluxo editorial existente, mas não alimentam essa seção da home.

### Gerador de imagens

- Upload por seleção ou arrastar e soltar.
- Validação de formato, tamanho e resolução.
- Reposicionamento, zoom e pré-visualização.
- Escolha entre temas oficiais ativos.
- Exportação em PNG para avatar, post, story e Moldura Redonda.
- Compartilhamento nativo quando suportado pelo dispositivo.

## Fora do MVP

- Doações e pagamentos.
- Cadastro público de apoiadores.
- Disparo de WhatsApp, e-mail ou SMS.
- Comentários nas notícias.
- Aplicativo móvel nativo.
- Geração de imagem por inteligência artificial.
- Armazenamento permanente da foto enviada pelo apoiador.

## Critérios de sucesso

- Um visitante encontra e inicia **Faça sua foto** em até dois cliques.
- A equipe publica uma notícia sem intervenção técnica.
- Os três formatos são gerados corretamente em celular e desktop.
- A landing page mantém boa leitura entre 320 px e telas largas.
- Conteúdo essencial permanece utilizável com teclado e tecnologias assistivas.
- A aplicação não envia a foto do apoiador ao servidor no fluxo padrão.
- Os dois cards da home exibem veículo e data e abrem a publicação original em nova aba.

## Premissas provisórias

A identidade visual final, fotos oficiais, logotipo, textos de campanha, links sociais e molduras ainda precisam ser entregues pela equipe. Até lá, implementações devem usar conteúdo demonstrativo claramente marcado e facilmente substituível.
