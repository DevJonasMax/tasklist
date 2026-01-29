# 🎨 TaskList Frontend

Interface visual da aplicação, construída com **Next.js 16** e focada em performance e experiência do usuário.

## 🚀 Tecnologias

- **Next.js 16**: Framework React com suporte a Server Components e App Router.
- **TailwindCSS**: Estilização utilitária rápida e responsiva.
- **Lucide React**: Ícones leves e modernos.
- **Zod**: Validação de formulários.
- **Docker**: Execução isolada em container.

## 📂 Estrutura de Pastas Relevante

```bash
apps/frontend/
├── app/
│   ├── (auth)/        # Rotas de Autenticação (Login, Cadastro)
│   │   ├── signin/    # Página de Login
│   │   └── signup/    # Página de Cadastro
│   ├── (dashboard)/   # Rotas protegidas (Área logada)
│   └── layout.tsx     # Layout global da aplicação
├── components/        # Componentes reutilizáveis (Botões, Inputs, Cards)
├── lib/               # Funções utilitárias e configurações
└── Dockerfile         # Receita de build para o Docker
```

## 🔧 Configuração

O frontend se comunica com a API através de variáveis de ambiente.

| Variável              | Descrição               | Valor Padrão (Docker)   |
| :-------------------- | :---------------------- | :---------------------- |
| `NEXT_PUBLIC_API_URL` | URL base da API Backend | `http://localhost:3000` |

## 🛠️ Desenvolvimento

Para rodar apenas o frontend localmente:

```bash
# Instalar dependências (na raiz do monorepo)
pnpm install

# Rodar o servidor de desenvolvimento
pnpm dev --filter frontend
```

O site estará disponível em `http://localhost:3000` (ou 3001 se a API estiver ocupando a 3000).

## 🐳 Docker

No ambiente Docker, o frontend é servido na porta **3001** para evitar conflito com a API.

- Acesso: `http://localhost:3001`
