# Segurança, privacidade e LGPD

## Princípios

- Coletar o mínimo necessário.
- Processar a selfie localmente por padrão.
- Negar acesso por padrão e conceder por função.
- Validar dados no limite do servidor.
- Não registrar segredos nem conteúdo pessoal desnecessário.

## Foto do apoiador

No fluxo padrão, a foto permanece no dispositivo. A aplicação não deve enviá-la, persistir cópias, incluí-la em logs ou usá-la para treinamento. A interface deve declarar isso antes do upload.

Se futuramente houver armazenamento ou processamento remoto, será necessária uma nova análise jurídica e técnica, base legal definida, prazo de retenção, política de descarte e consentimento quando aplicável.

## Autenticação administrativa

- Credenciais nunca são fixadas no código ou documentação.
- Senhas usam algoritmo resistente como Argon2id ou bcrypt com custo adequado.
- Sessões usam cookies `HttpOnly`, `Secure` e `SameSite` apropriado.
- Login recebe limitação de tentativas.
- Usuários inativos não podem renovar sessão.
- `ADMIN` e `EDITOR` possuem permissões distintas.
- Produção deve oferecer autenticação multifator quando viável.

## Uploads editoriais

- Limitar tamanho, extensão, MIME e dimensões.
- Não usar o nome original como chave pública.
- Remover metadados EXIF quando não forem necessários.
- Sanitizar SVG ou proibi-lo.
- Servir arquivos enviados de um domínio/CDN sem execução de scripts.
- Verificar autorização antes de emitir URLs de upload.

## Conteúdo e navegador

- Sanitizar conteúdo rico contra XSS.
- Validar URLs externas e adicionar `rel="noopener noreferrer"` quando necessário.
- Configurar Content Security Policy de forma progressiva.
- Usar cabeçalhos contra MIME sniffing, clickjacking e vazamento de referência.
- Não renderizar mensagens de erro internas no cliente.

## Proteção de rotas e APIs

- Middleware pode fazer redirecionamento inicial, mas a autorização final ocorre na ação ou rota de servidor.
- Mutações exigem sessão válida e função autorizada.
- Consultas Prisma devem usar parâmetros tipados; não montar SQL com entrada do usuário.
- Operações sensíveis geram auditoria.
- Rate limiting deve proteger login e endpoints de upload.

## Segredos

- `.env*` real fica fora do Git.
- `.env.example` contém apenas nomes e exemplos inofensivos.
- Segredos são armazenados no provedor de deploy.
- Rotação é obrigatória após exposição.
- Tokens nunca aparecem em screenshots, logs, seed ou documentação.

## Logs e observabilidade

- Não registrar senha, cookie, token, arquivo enviado ou conteúdo integral de formulários.
- Redigir e-mail e IP quando não forem necessários.
- Usar IDs de correlação para investigar falhas.
- Definir retenção proporcional à necessidade operacional.

## Política de privacidade

A página pública deve explicar:

- Quais dados o site coleta.
- Para quais finalidades.
- Que a foto do gerador é processada localmente.
- Quais serviços de analytics e storage são usados.
- Como exercer direitos previstos na LGPD.
- Canal de contato do controlador.
- Data da última atualização.

## Checklist antes do lançamento

- [ ] Nenhuma credencial está versionada.
- [ ] Rotas administrativas exigem sessão.
- [ ] Funções são verificadas no servidor.
- [ ] Uploads maliciosos e excessivos são rejeitados.
- [ ] Conteúdo rico é sanitizado.
- [ ] Cookies e cabeçalhos estão seguros em produção.
- [ ] A selfie não aparece em requisições de rede.
- [ ] Política de privacidade foi revisada pela equipe responsável.
- [ ] Backups e restauração foram testados.
- [ ] Dependências não possuem vulnerabilidades críticas conhecidas.
