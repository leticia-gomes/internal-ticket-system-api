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
├── controllers/
├── database/
│   ├── data-source.ts
│   └── migrations/
├── entities/
├── errors/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── sockets/
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

* [ ] Configure Express
* [ ] Configure TypeORM
* [ ] Configure MySQL
* [ ] Configure Socket.IO

## Funcionalidades

* [ ] Authentication (JWT)
* [ ] User Management
* [ ] Ticket Management
* [ ] Comments
* [ ] Attachments
* [ ] Real-time Notifications

## Qualidade

* [ ] Unit Tests
* [ ] Integration Tests
* [ ] API Documentation
* [ ] Docker
* [ ] CI/CD

---

# 🌿 Git Workflow

Cada funcionalidade é desenvolvida em uma branch específica.

Exemplo:

```text
main
│
├── chore/configure-eslint
├── chore/configure-prettier
├── chore/configure-environment-variables
├── feat/authentication
├── feat/ticket-crud
└── feat/socket-notifications
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

1. Configuração completa do Express
2. Configuração do TypeORM
3. Configuração do MySQL
4. Configuração do Socket.IO
5. Implementação da autenticação JWT
6. CRUD de usuários
7. CRUD de tickets
8. Comentários
9. Notificações em tempo real
10. Testes automatizados
11. Documentação da API

---

# 👩‍💻 Autora

**Letícia Gomes**

Desenvolvedora Full Stack

GitHub: https://github.com/leticia-gomes
