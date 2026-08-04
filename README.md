# Internal Ticket System API

Backend da aplicação **Internal Ticket System**, desenvolvido como parte de um desafio técnico utilizando **Node.js**, **TypeScript**, **Express**, **TypeORM** e **MySQL**.

O objetivo deste projeto é demonstrar boas práticas de desenvolvimento back-end, organização de código, arquitetura em camadas, qualidade de código e versionamento utilizando Git e GitHub.

> **Este repositório contém apenas a API.**

---

# 🚀 Tecnologias

* Node.js 22+
* TypeScript
* Express
* TypeORM
* MySQL
* Socket.IO
* dotenv
* ESLint
* Prettier

---

# 📂 Estrutura do Projeto

```text
src/
├── config/
│   └── environment.ts
├── database/
│   ├── data-source.ts
│   ├── migrations/
│   └── seeds/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── role/
│   ├── user/
│   ├── ticket/
│   ├── ticket-status/
│   ├── ticket-priority/
│   ├── ticket-comment/
│   └── ticket-history/
├── shared/
│   ├── errors/
│   ├── interfaces/
│   ├── types/
│   └── utils/
├── app.ts
└── server.ts
```

---

# ⚙️ Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir instalado:

* Node.js 22 ou superior
* npm
* MySQL Server
* Git

---

# 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/internal-ticket-system-api.git
```

Acesse a pasta do projeto:

```bash
cd internal-ticket-system-api
```

Instale as dependências:

```bash
npm install
```

---

# 🔧 Configuração das Variáveis de Ambiente

Copie o arquivo de exemplo:

### Linux / macOS

```bash
cp .env.example .env
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

Configure o arquivo `.env` conforme sua instalação do MySQL.

Exemplo:

```env
NODE_ENV=development

PORT=3333

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=senha

DATABASE_NAME=internal_ticket_system

FRONTEND_URL=http://localhost:5173
```

> O arquivo `.env` não deve ser enviado ao repositório.

---

# 🗄️ Banco de Dados

Criar o banco:

```sql
CREATE DATABASE internal_ticket_system;
```

Após a criação do banco de dados, a estrutura será criada através das migrations do TypeORM.

```bash
npm run migration:run
```

# 📊 Modelo de Dados

O banco de dados foi modelado utilizando tabelas de configuração para permitir maior flexibilidade na administração da aplicação.

### Tabelas principais

- `roles`
- `users`
- `ticket_statuses`
- `ticket_priorities`
- `tickets`
- `ticket_comments`
- `ticket_history`

Os status e prioridades dos tickets foram modelados como tabelas próprias, permitindo personalização de nomes, cores, ordem de exibição e ativação sem necessidade de alterações no código-fonte.

O suporte a anexos foi propositalmente deixado fora do escopo inicial para manter o foco nas funcionalidades obrigatórias do desafio.

---

# ▶️ Executando o Projeto

Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3333
```

Health Check:

```text
GET /health
```

Resposta esperada:

```json
{
  "status": "ok",
  "application": "Internal Ticket System API"
}
```

---

# 📜 Scripts Disponíveis

| Script                 | Descrição                                 |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Executa a aplicação em desenvolvimento    |
| `npm run build`        | Compila o projeto                         |
| `npm start`            | Executa a versão compilada                |
| `npm run typecheck`    | Verifica erros de TypeScript              |
| `npm run lint`         | Executa o ESLint                          |
| `npm run lint:fix`     | Corrige problemas encontrados pelo ESLint |
| `npm run format`       | Formata o código utilizando Prettier      |
| `npm run format:check` | Verifica a formatação                     |
| `npm run validate`     | Executa as validações configuradas        |

---

# ✅ Configurações Implementadas

* Projeto Node.js inicializado
* TypeScript configurado
* Configuração do `tsconfig.json`
* Estrutura inicial de pastas
* Scripts de desenvolvimento
* Endpoint `/health`
* ESLint configurado
* Prettier configurado
* Variáveis de ambiente centralizadas
* Configuração do `dotenv`
* Arquivo `.env.example`
* Configuração centralizada da aplicação
* Configuração do TypeORM
* Configuração da conexão com o MySQL
* Criação do DataSource
* Configuração de scripts para migrations
* Inicialização da conexão com o banco de dados
* Estrutura modular baseada em domínios
* Configuração das migrations do TypeORM
* Schema inicial do banco de dados
* Relacionamentos entre entidades

---

# 🛣️ Roadmap

## Configuração Inicial

* [x] Initialize Node.js project
* [x] Configure TypeScript
* [x] Configure tsconfig.json
* [x] Configure development scripts
* [x] Create project structure
* [x] Configure ESLint
* [x] Configure Prettier
* [x] Configure environment variables

## Infraestrutura

- [x] Configure Express
- [x] Configure TypeORM
- [x] Configure MySQL
- [x] Configure environment variables
- [x] Configure database connection
- [x] Create database schema
- [ ] Configure Socket.IO

## Funcionalidades

- [ ] Authentication (JWT)
- [ ] Roles
- [ ] User Management
- [ ] Ticket Status Management
- [ ] Ticket Priority Management
- [ ] Ticket Management
- [ ] Ticket Comments
- [ ] Ticket History
- [ ] Real-time Notifications

## Qualidade

* [ ] Unit Tests
* [ ] Integration Tests
* [ ] API Documentation
* [ ] Docker
* [ ] CI/CD

---

# 🏛️ Arquitetura

O projeto segue uma arquitetura modular (**feature-based**), onde cada domínio da aplicação possui sua própria organização interna.

Exemplo:

```text
modules/
└── ticket/
    ├── controllers/
    ├── dtos/
    ├── entities/
    ├── repositories/
    ├── routes/
    ├── services/
    └── validations/
```

Essa abordagem facilita a manutenção, escalabilidade e organização do código, mantendo todos os arquivos relacionados a um mesmo domínio agrupados em um único módulo.

---

# 🌿 Git Workflow

Cada funcionalidade é desenvolvida em uma branch específica.

Exemplo:

```text
main
│
├── chore/3-configure-environment-variables
├── chore/5-configure-orm-database
├── feat/4-create-database-schema
├── feat/auth
├── feat/user
├── feat/ticket
└── feat/socket
```

Após a conclusão de cada tarefa, é aberto um Pull Request para a branch `main`.

---

# 📋 Convenção de Commits

O projeto utiliza o padrão **Conventional Commits**.

Exemplos:

```text
chore: configure environment variables
feat: implement authentication
feat: create ticket entity
fix: correct database connection
docs: update README
test: add authentication tests
```

---

# 📌 Próximos Passos

As próximas etapas previstas são:

1. Criar seeds iniciais (roles, ticket statuses e ticket priorities)
2. Implementar autenticação com JWT
3. Implementar gerenciamento de usuários
4. Implementar gerenciamento de tickets
5. Implementar comentários
6. Registrar histórico das alterações dos tickets
7. Implementar notificações em tempo real com Socket.IO
8. Criar testes automatizados
9. Documentar a API

---

# 👩‍💻 Autora

**Letícia Gomes**

Desenvolvedora Full Stack

GitHub: https://github.com/leticia-gomes
