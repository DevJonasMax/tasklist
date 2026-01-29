# 🔐 TaskList Monorepo

Este projeto é um **Monorepo** que integra uma API robusta em **NestJS** e um Frontend moderno em **Next.js**, utilizando **Docker** para padronização de ambiente.

## 🏗️ Estrutura do Projeto

O projeto utiliza **TurboRepo** e **PNPM Workspaces** para gerenciar os pacotes.

- **apps/api**: Backend (NestJS + Prisma + PostgreSQL)
- **apps/frontend**: Frontend (Next.js + TailwindCSS)
- **docker-compose.yml**: Orquestração dos serviços (API, Frontend e Banco de Dados)

---

## 🚀 Como Rodar (Modo Docker - Recomendado para Teste Final)

O Docker garante que a aplicação rode exatamente igual em qualquer máquina, sem conflitos de versões.

### Pré-requisitos
- [Docker](https://www.docker.com/) instalado
- [Git](https://git-scm.com/) instalado

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone <seu-repositorio-git>
   cd tasklist
   ```

2. **Suba os containers:**
   ```bash
   docker-compose up -d --build
   ```
   > Aguarde alguns minutos enquanto as imagens são baixadas e construídas.

3. **Configure o Banco de Dados (Apenas na 1ª vez):**
   Como o banco é criado vazio, precisamos criar as tabelas:
   ```bash
   docker-compose exec api pnpm --filter api exec prisma migrate deploy
   ```

4. **Acesse:**
   - 🎨 **Frontend (Site):** [http://localhost:3001](http://localhost:3001)
   - ⚙️ **API (Backend):** [http://localhost:3000](http://localhost:3000)
   - 🗄️ **Banco (Postgres):** `localhost:5433` (Usuário: `user`, Senha: `password`, Banco: `tasklist_db`)

---

## 💻 Como Desenvolver (Modo Local - Recomendado para o Dia a Dia)

Para ter mais velocidade e *Hot Reload* (atualização automática ao salvar arquivos), rode localmente:

1. **Instale as dependências:**
   ```bash
   pnpm install
   ```

2. **Suba apenas o Banco de Dados (via Docker):**
   ```bash
   docker-compose up -d postgres
   ```

3. **Rode as migrações locais:**
   ```bash
   cd apps/api
   pnpm prisma migrate dev
   ```

4. **Inicie o projeto (Raiz):**
   ```bash
   pnpm dev
   ```
   *Isso iniciará tanto o Frontend quanto o Backend simultaneamente.*

---

## 🛠️ Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `docker-compose up -d` | Inicia todos os serviços em segundo plano |
| `docker-compose down` | Para e remove os containers |
| `docker-compose logs -f` | Acompanha os logs em tempo real |
| `docker-compose up -d --build` | Reconstrói as imagens (use após alterar dependências) |

## 📦 Tecnologias Principais

- **Linguagem:** TypeScript
- **Backend:** NestJS, Prisma ORM, Passport (JWT)
- **Frontend:** Next.js 16, TailwindCSS, Lucide React
- **Infra:** Docker, Docker Compose, Postgres
- **Gerenciador de Pacotes:** PNPM + TurboRepo
