FROM node:20-slim

# Instalar PNPM globalmente
RUN apt-get update -y && apt-get install -y openssl && npm install -g pnpm

# Definir diretório de trabalho na raiz do container
WORKDIR /app

# Copiar arquivos de configuração do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copiar o package.json específico do Frontend e da API (para consistência do lockfile)
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/api/package.json ./apps/api/

# Instalar todas as dependências
RUN pnpm install

# Copiar todo o código fonte do projeto
COPY . .

# Construir a aplicação Next.js a partir da raiz (usando filtro do pnpm)
# Isso garante que a resolução de dependências do workspace funcione corretamente
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_PUBLIC_API_URL="http://localhost:3000"

RUN pnpm --filter frontend build --debug

# Mudar para o diretório do Frontend apenas para rodar
WORKDIR /app/apps/frontend

# Expor a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["pnpm", "start"]
