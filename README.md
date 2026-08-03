# Internal Ticket System API

Backend da aplicação **Internal Ticket System**, desenvolvido com
**Node.js**, **TypeScript** e **Express**.

> Este repositório contém apenas a API.

## Tecnologias

-   Node.js 22+
-   TypeScript
-   Express
-   ESLint
-   Prettier

## Estrutura atual

``` text
src/
├── config/
├── controllers/
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

## Configurações realizadas

-   Projeto Node.js inicializado
-   TypeScript configurado
-   tsconfig.json configurado
-   Scripts de desenvolvimento
-   Estrutura inicial de pastas
-   Endpoint /health
-   ESLint configurado
-   Prettier configurado

## Scripts

``` bash
npm run dev
npm run build
npm start
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run validate
```

## Executando

``` bash
npm install
npm run dev
```

Acesse:

http://localhost:3333/health

## Roadmap

-   [x] Initialize the Node.js project
-   [x] Install TypeScript
-   [x] Configure tsconfig.json
-   [x] Configure development scripts
-   [x] Create the initial folder structure
-   [x] Verify that the application runs locally
-   [x] Configure ESLint
-   [x] Configure Prettier
-   [ ] Configure Express
-   [ ] Configure TypeORM
-   [ ] Configure MySQL
-   [ ] Configure Socket.IO
-   [ ] Configure Authentication
-   [ ] Docker
-   [ ] CI/CD
