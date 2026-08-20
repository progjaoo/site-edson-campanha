# Git e contribuição

## Fluxo

- `main` representa código pronto para produção.
- Cada mudança usa uma branch curta criada a partir de `main`.
- Pull requests devem ser pequenos o suficiente para revisão segura.
- Não misturar refatorações sem relação com a entrega.

## Nomes de branch

```text
feat/photo-generator
feat/admin-banners
fix/post-scheduling-timezone
docs/security-guidelines
chore/update-dependencies
```

## Commits

Usar mensagens no formato Conventional Commits:

```text
feat(admin): add scheduled post publishing
fix(photo): preserve mobile image orientation
docs: document media upload policy
test(banners): cover priority tie-breaker
```

Cada commit deve representar uma intenção coerente. Não versionar artefatos de build, arquivos de ambiente, dumps, fotos pessoais ou credenciais.

## Pull request

O texto deve informar:

- Problema e objetivo.
- Solução escolhida.
- Rotas, schema ou contratos alterados.
- Como validar.
- Evidências visuais quando houver UI.
- Riscos, migrations e plano de reversão.
- Documentação atualizada.

## Checklist de revisão

- [ ] A mudança atende ao requisito e evita escopo extra.
- [ ] Limites entre cliente e servidor estão corretos.
- [ ] Entradas e permissões são validadas no servidor.
- [ ] Estados de erro, vazio e carregamento existem.
- [ ] Interface é responsiva e acessível.
- [ ] Testes cobrem regras críticas.
- [ ] Migration é segura e compatível com produção.
- [ ] Nenhum segredo ou dado pessoal foi incluído.
- [ ] Documentação continua verdadeira.

## Revisão de interface

Para mudanças visuais, anexar capturas em pelo menos:

- 390 × 844 px.
- 768 × 1024 px quando a quebra intermediária for relevante.
- 1440 × 900 px.

Revisar também foco de teclado, redução de movimento, conteúdo longo e ausência de imagem.

## Migrations

- Revisar SQL gerado antes do merge.
- Mudanças destrutivas exigem estratégia em etapas.
- Dados necessários devem ser migrados antes de remover coluna antiga.
- O pull request explica duração, bloqueios e rollback quando houver risco.

## Dependências

Adicionar dependência somente quando seu custo for menor do que implementar e manter a solução local. Registrar finalidade, impacto no bundle, licença e atividade de manutenção.

## Responsabilidade documental

Quem altera uma decisão atualiza o documento correspondente. Divergências entre código e documentação devem ser tratadas como defeito do projeto.
