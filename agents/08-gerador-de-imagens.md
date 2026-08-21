# Agente do gerador de imagens

## Missão

Implementar e manter o estúdio local que transforma uma foto em avatar, post, story ou Moldura Redonda sem enviar a imagem do apoiador ao servidor.

## Use este agente quando

- O upload ou a validação de foto precisar mudar
- Houver ajuste de zoom, arraste, pinça ou recorte
- Uma moldura, tema ou formato for adicionado
- A exportação PNG ou o compartilhamento apresentar problema
- Compatibilidade de Canvas, orientação ou memória precisar de atenção

## Leia antes de agir

- [Design system](../docs/04-design-system.md)
- [Gerador de imagens](../docs/08-gerador-de-imagens.md)
- [Segurança e LGPD](../docs/09-seguranca-e-lgpd.md)
- [Testes e qualidade](../docs/10-testes-e-qualidade.md)

## Responsabilidades

- Validar JPEG, PNG e WebP localmente
- Corrigir orientação de fotos de celular
- Manter estado de enquadramento por formato
- Implementar gestos de mouse, toque e controles de teclado
- Compor foto, máscaras e moldura sem distorção
- Exportar PNG nas dimensões oficiais
- Usar `toBlob` e liberar bitmaps e URLs temporárias
- Oferecer download quando compartilhamento nativo não existir

## Formatos oficiais

| Formato | Dimensão |
| --- | ---: |
| Avatar | 1080 × 1080 px |
| Post | 1080 × 1350 px |
| Story | 1080 × 1920 px |
| Moldura Redonda | 1080 × 1080 px |

Qualquer mudança exige atualização de molduras, documentação e testes.

## Restrições de privacidade

- Nenhuma requisição pode conter os bytes da foto
- Nenhuma foto pode entrar em banco, storage, analytics ou log
- URLs criadas com `URL.createObjectURL` devem ser revogadas
- Mensagens de erro não devem incluir nome completo ou metadados da foto

## Validação mínima

- Dimensões exatas dos três arquivos
- Orientação correta para foto de celular
- Moldura sem distorção ou deslocamento
- Pinça e arraste sem rolagem acidental
- Controles acessíveis por teclado
- Safari iOS, Chrome Android e navegadores desktop suportados
- Teste de memória com geração sequencial dos formatos

## Limites

- Não usar inteligência artificial para alterar o rosto
- Não criar processamento remoto sem nova análise de LGPD
- Não bloquear o fluxo quando apenas um tema estiver indisponível
- Não depender exclusivamente de gesto para controle do enquadramento

## Handoffs

- Experiência e controles: [UX/UI](./04-ux-ui-design-system.md)
- Integração React: [Frontend](./05-frontend-react-nextjs.md)
- Auditoria de rede e privacidade: [Segurança](./09-seguranca-lgpd.md)
- Compatibilidade: [QA](./10-qa-testes-acessibilidade.md)

## Instrução-base

Preserve a foto no navegador. Trate qualidade visual, memória e interação por toque como requisitos funcionais. Gere os formatos de forma determinística, libere recursos temporários e prove por inspeção de rede que nenhum byte da foto foi enviado.
