# Manual Completo do Site de Campanha — Edson Albertassi (15088)

Este documento explica todos os passos para gerenciar, personalizar, adicionar mídias (Jingle/Vídeo), configurar o armazenamento na Vercel e publicar o site.

---

## 1. Onde e Como Colocar o Arquivo do Jingle (Áudio e Vídeo)

### Arquivo de Áudio (MP3)
O player de áudio na seção **JINGLE** já está configurado para consumir o arquivo localizado em:
```
public/audio/jingle-edson-albertassi.mp3
```

**Como adicionar:**
1. Crie a pasta `public/audio/` (se não existir).
2. Salve o seu arquivo de áudio exatamente com o nome: `jingle-edson-albertassi.mp3`.
3. O player da landing page carregará e reproduzirá automaticamente, incluindo o botão de download para os apoiadores.

### Vídeo do Jingle / Campanha (Opcional)
Se você desejar exibir um vídeo do YouTube ou arquivo MP4 na seção do Jingle:
1. Para vídeo local: salve em `public/video/jingle-campanha.mp4`.
2. Para vídeo do YouTube: basta inserir o `iframe` incorporado ou link no componente `src/components/sections/JingleSection.tsx`.

---

## 2. Acesso ao Painel de Notícias (Admin)

O site possui um blog/portal de notícias corporativo interno protegido por senha, sem necessidade de banco de dados SQL pesado.

- **URL de Acesso:** `/admin`
- **Usuário Padrão:** `emilly`
- **Senha Padrão:** `Conquistas@07`

### Como criar notícias:
1. Acesse `http://seusite.com.br/admin` e faça login.
2. Preencha o formulário: **Título**, **Categoria**, **Resumo**, **Conteúdo** e **Upload de Imagem**.
3. A imagem será salva no **Vercel Blob Storage** (ou em formato otimizado local).
4. A notícia ficará disponível na listagem e na página individual com URL amigável (`/noticias/titulo-da-materia`). A seção de notícias da landing page usa, nesta entrega, duas matérias externas fixas e não é alimentada pelo admin.

---

## 3. Como Configurar o Vercel Blob Storage

Para o upload de imagens de notícias em produção no ambiente serverless da Vercel:

1. Acesse o painel da [Vercel](https://vercel.com).
2. Abra o seu projeto da campanha.
3. Clique na aba **Storage** e selecione **Create Database** → **Blob**.
4. Siga os passos e clique em **Connect to Project**.
5. A Vercel criará automaticamente a variável de ambiente:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```
6. Faça um novo Deploy. Pronto! O upload de imagens já estará conectado ao CDN global da Vercel.

---

## 4. Vercel Analytics e Speed Insights

As bibliotecas `@vercel/analytics` e `@vercel/speed-insights` já estão totalmente integradas no `src/app/layout.tsx`.

1. No painel do projeto na Vercel, acesse a aba **Analytics** e clique em **Enable**.
2. Acesse a aba **Speed Insights** e clique em **Enable**.
3. Você passará a ver dados de tráfego, visitantes, páginas mais acessadas e métricas de Core Web Vitals (LCP, INP, CLS) em tempo real.

---

## 5. Ferramenta "Faça sua Foto de Apoio"

A ferramenta está disponível em `/faca-sua-foto` e na Hero Section:

- **Formatos Gerados:**
  - **Avatar / Perfil:** 1080 × 1080 px (Quadrado para WhatsApp, Facebook, Instagram)
  - **Feed Instagram:** 1080 × 1440 px (Retrato 3:4)
  - **Story / Status:** 1080 × 1920 px (Vertical 9:16)
- **Molduras Utilizadas:**
  - `public/images/molduras/moldura-euapoio.png`
  - `public/images/molduras/moldura-padrao.png`
- **Privacidade (LGPD):** O processamento da imagem é feito 100% no navegador do usuário via HTML5 Canvas (nenhuma foto pessoal é salva em servidores).

---

## 6. Estrutura de SEO e Compartilhamento

- **Sitemap Dinâmico:** Gerado automaticamente em `/sitemap.xml` com todas as páginas e matérias.
- **Robots.txt:** Configurado em `/robots.txt` permitindo indexação total e protegendo a área de `/admin`.
- **Rich Snippets (Schema.org):**
  - Schema `Person` para Edson Albertassi no Google Search.
  - Schema `NewsArticle` para cada notícia publicada.
- **OpenGraph & Twitter Cards:** Configurados com as artes oficiais para prévias automáticas no WhatsApp, Telegram, Facebook e Twitter.

---

## 7. Como Subir para o GitHub e Fazer o Deploy na Vercel

```bash
# 1. Inicializar git
git init
git add .
git commit -m "feat: site oficial edson albertassi 15088"

# 2. Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/site-edson-albertassi.git
git branch -M main
git push -u origin main

# 3. Na Vercel
# Importe o repositório do GitHub e clique em "Deploy".
```

NAS SEÇÕES, NO TITULO
"Mudança requer fé e coragem" fonte archivo EXTRABOLD ITALIC - 89 de tamanho
texto abaixo menor: Veja como nossa história carrega tudo isso! - fonte archivo - bold - tamanho 30

NAS SEÇÕES, NO TITULO
"Acompanhe minhas redes" - font archivo - extrabold - tamanho 89

NAS SEÇÕES, NO TITULO
"Fique por dentro" - font archivo - extrabold - tamanho 89

- Nessa seção precisamos ajustar igual ao designer fez, você fez correto, porém a foto dele deve ser centralizada,  um pouco maior e as 4 redes sociais ficarem na altura do peito dele, 

- whatsapp: +55 24 99891-7371
- link do. grupo: https://chat.whatsapp.com/KErXZ76O2rRAaMXOd58pvj?s=cl&p=i&mlu=0&ilr=0&amv=1

Precisamos colocar um degrade nos seguintes lugares onde tem azul
#0066B8
#1256CE

HEADER E FOOTER - BACKGROUND DA HEROSECTION - BACKGROUND DA TELA DE HISTÓRIA

DIMIMNUIR ESPAÇO WHATSAPP SECTION
