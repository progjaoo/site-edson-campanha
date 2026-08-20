# Design system

## Princípio visual

O site deve transmitir proximidade, mobilização e confiança. A referência funcional usa blocos de alto contraste, tipografia enfática, fotos recortadas e chamadas diretas; a identidade de Edson deve adaptar esses princípios sem copiar a marca, as peças ou a composição de outra campanha.

## Status da identidade

As cores, fontes, logotipo e fotografias abaixo são decisões **provisórias** até o recebimento do manual oficial. A implementação deve centralizá-las em tokens para permitir substituição sem reescrever componentes.

## Tokens provisórios

```css
:root {
  --brand-primary: #123b7a;
  --brand-primary-strong: #08234f;
  --brand-secondary: #f2c230;
  --brand-accent: #2f8f5b;
  --surface: #ffffff;
  --surface-muted: #f3f6fa;
  --text: #101827;
  --text-muted: #526071;
  --border: #dce3ec;
  --danger: #b42318;
  --success: #157f4c;
}
```

Não usar esses valores diretamente em componentes. Eles devem ser mapeados para variáveis semânticas do Tailwind e do shadcn/ui.

## Tipografia

- Fonte de destaque: uma família condensada ou larga de forte presença, aprovada pela campanha.
- Fonte de texto: sans-serif legível em telas pequenas.
- Fonte utilitária: pode ser a mesma do corpo para reduzir carregamento.
- Títulos não devem depender exclusivamente de caixa alta para criar hierarquia.
- Texto corrido deve manter largura aproximada de 60 a 75 caracteres.

## Escala e espaçamento

- Escala base de 4 px.
- Seções: `clamp(4rem, 8vw, 8rem)` no eixo vertical.
- Conteúdo: largura máxima entre 1200 e 1320 px.
- Texto: largura menor que a grade principal.
- Bordas arredondadas devem seguir poucos níveis consistentes: pequena, média e grande.

## Componentes-base

- `Button`: variantes primária, secundária, contorno, texto e destrutiva.
- `Card`: conteúdo editorial, apoiador, métrica e chamada.
- `Dialog` e `AlertDialog`: confirmação e tarefas focadas.
- `FormField`: rótulo, ajuda, controle e erro.
- `Toast`: retorno de ações; nunca substituir erro junto ao campo.
- `Badge`: status editorial ou categoria.
- `Tabs`: somente quando o conteúdo realmente compartilhar contexto.
- `DropdownMenu`: ações secundárias, nunca a única forma de acessar uma função crítica.

## Composição da landing page

```text
┌──────────────── Cabeçalho fixo ────────────────┐
│ Logo     Navegação            Faça sua foto    │
├────────────────────────────────────────────────┤
│ Hero: mensagem + Edson + ação principal        │
├────────────────────────────────────────────────┤
│ WhatsApp: grupo de apoiadores + contato         │
├────────────────────────────────────────────────┤
│ Redes sociais: Instagram em destaque            │
├────────────────────────────────────────────────┤
│ Galeria: fotos e registros institucionais        │
├────────────────────────────────────────────────┤
│ Notícias: 2 cards horizontais externos           │
├────────────────────────────────────────────────┤
│ Rodapé legal e institucional                    │
└────────────────────────────────────────────────┘
```

## Assinatura visual

O elemento memorável será o **celular de mobilização**: Edson aparece centralizado dentro ou emergindo de uma moldura de celular, enquanto apoiadores e conteúdos sociais se organizam ao redor. Esse recurso deve conectar visualmente a comunidade, o Instagram e a geração das peças.

## Imagens

- Usar fotos oficiais com autorização e crédito quando aplicável.
- Manter ponto focal configurável para recortes responsivos.
- Evitar texto essencial incorporado em imagens.
- Todo conteúdo editorial precisa de texto alternativo significativo.
- Imagens decorativas usam texto alternativo vazio.

## Movimento

- Uma animação principal de entrada pode articular hero e celular central.
- Microinterações devem usar `transform` e `opacity`.

## Cards de notícias externas

A seção final usa dois cards horizontais a partir do breakpoint `md` e empilha seu conteúdo em telas menores. A foto aprovada ocupa o painel esquerdo com veículo e data sobre um degradê azul; o painel direito apresenta título, resumo curto e o botão **Ler matéria**. O botão abre a fonte em nova aba com `rel="noopener noreferrer"`.
- Respeitar `prefers-reduced-motion`.
- Não animar texto corrido nem criar movimento contínuo sem controle.

## Responsividade

- Projetar primeiro para 320–430 px.
- Não criar versões desktop e mobile duplicadas da página.
- Reorganizar a mesma estrutura semântica com CSS.
- Áreas clicáveis devem ter pelo menos 44 × 44 px.
- O gerador deve ser totalmente utilizável por toque.

## Acessibilidade

- Contraste mínimo WCAG AA.
- Foco visível em todos os controles.
- Ordem de foco igual à ordem visual e semântica.
- Títulos em hierarquia lógica.
- Formulários sempre com rótulos associados.
- Estados nunca comunicados apenas por cor.
- Modais devem reter e devolver o foco corretamente.
