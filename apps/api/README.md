# ⚙️ TaskList API (Backend)

Serviço responsável por toda a lógica de negócios, autenticação e gerenciamento de dados. Construído com **NestJS**.

## 🚀 Tecnologias

- **NestJS**: Framework progressivo para Node.js.
- **Prisma ORM**: Manipulação de banco de dados e migrações.
- **PostgreSQL**: Banco de dados relacional.
- **Passport/JWT**: Estratégias de autenticação segura.
- **Docker**: Containerização para deploy e execução consistente.

## 📂 Estrutura de Pastas Relevante

```bash
apps/api/
├── src/
│   ├── auth/          # Módulo de Autenticação (Login, Registro, JWT)
│   ├── tasks/         # Módulo de Tarefas (CRUD)
│   ├── users/         # Módulo de Usuários
│   ├── common/        # Filtros de erro, Guards e Decorators globais
│   ├── prisma/        # Serviço de conexão com o banco
│   ├── app.controller.ts # Rota de Health Check (/)
│   └── main.ts        # Ponto de entrada (Configuração de CORS e Pipes)
├── prisma/
│   ├── migrations/    # Histórico de mudanças do banco
│   └── schema.prisma  # Definição das tabelas e relacionamentos
└── Dockerfile         # Receita de build para o Docker
```

## 🔧 Variáveis de Ambiente (.env)

| Variável       | Descrição                         | Exemplo                                                 |
| :------------- | :-------------------------------- | :------------------------------------------------------ |
| `DATABASE_URL` | String de conexão com o Postgres  | `postgresql://user:password@localhost:5433/tasklist_db` |
| `JWT_SECRET`   | Chave secreta para assinar tokens | `sua_chave_secreta`                                     |
| `PORT`         | Porta da aplicação                | `3000`                                                  |
| `CORS_ORIGIN`  | Origem permitida (Frontend)       | `http://localhost:3001`                                 |

## 🛠️ Principais Comandos (Dentro da pasta `apps/api`)

```bash
# Rodar em desenvolvimento (com Watch mode)
pnpm start:dev

# Criar uma nova migração (após alterar schema.prisma)
pnpm prisma migrate dev --name nome_da_mudanca

# Visualizar o banco de dados (Prisma Studio)
pnpm prisma studio
```

## 🔌 Rotas Principais

- **GET /**: Health Check (Verifica se a API está online).
- **POST /auth/signin**: Login de usuário.
- **POST /auth/signup**: Cadastro de novo usuário.
- **GET /users/me**: Dados do usuário logado (Requer Token).
