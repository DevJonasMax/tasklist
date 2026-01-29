FROM node:20-slim

# Instalar PNPM globalmente, OpenSSL e ferramentas de build nativo (para bcrypt)
RUN apt-get update -y && apt-get install -y openssl python3 make g++ && npm install -g pnpm

# Definir diretório de trabalho na raiz do container
WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copiar o package.json específico da API
COPY apps/api/package.json ./apps/api/

# Instalar todas as dependências
RUN pnpm install

# Copiar todo o código fonte do projeto
COPY . .

# Gerar o Prisma Client a partir da raiz
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN pnpm --filter api exec prisma generate

# Mudar para o diretório da API
WORKDIR /app/apps/api

# Construir a aplicação NestJS
RUN pnpm build

# Expor a porta que a API usa
EXPOSE 3000

# Comando para iniciar a API em produção
CMD ["node", "dist/main"]
