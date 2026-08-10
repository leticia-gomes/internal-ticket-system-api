# Internal Ticket System API

API REST para gerenciamento de chamados internos, desenvolvida em **Node.js + TypeScript** como parte de um **desafio técnico Full Stack**.

O projeto foi desenvolvido com foco em **arquitetura modular, separação de responsabilidades, segurança, validação de dados, persistência relacional, autenticação e manutenibilidade**.

A API faz parte de uma solução Full Stack composta por dois projetos:

| Projeto                        | Responsabilidade                    |
| ------------------------------ | ----------------------------------- |
| **Internal Ticket System UI**  | Interface web em Vue 3 + TypeScript |
| **Internal Ticket System API** | API REST em Node.js + TypeScript    |

---

## Sobre o desafio

A aplicação simula um sistema interno de atendimento, permitindo que usuários autenticados criem e acompanhem chamados, atribuam responsáveis, alterem status e prioridade e adicionem comentários.

Cada chamado possui informações como:

* Título;
* Descrição;
* Status;
* Prioridade;
* Responsável;
* Usuário criador;
* Data de criação;
* Data de atualização.

Além do CRUD de chamados, a API possui autenticação, validação de dados, comentários e infraestrutura para comunicação em tempo real.

---

# Principais funcionalidades

### Autenticação

* Login com e-mail e senha;
* Autenticação baseada em JWT;
* Senhas armazenadas utilizando hash com `bcryptjs`;
* Proteção de rotas;
* Middleware de autenticação;
* Controle de acesso baseado no usuário autenticado.

### Usuários

* Consulta de usuários;
* Associação de usuários como responsáveis pelos chamados;
* Seeds para criação dos usuários iniciais;
* Relacionamento entre usuários e chamados.

### Chamados

Implementação do fluxo de gerenciamento de chamados:

* Criar chamado;
* Listar chamados;
* Consultar detalhes;
* Editar chamado;
* Excluir chamado;
* Alterar status;
* Alterar prioridade;
* Atribuir responsável;
* Identificar usuário criador.

### Filtros

A listagem de chamados suporta filtros por informações relevantes do chamado, como:

* Status;
* Prioridade.

A filtragem é realizada na API, mantendo a regra de consulta no back-end e deixando o front-end responsável pela apresentação e interação.

### Comentários

Usuários autenticados podem adicionar comentários aos chamados.

Cada comentário possui relacionamento com:

* Chamado;
* Autor;
* Conteúdo;
* Data de criação.

Os comentários também são retornados junto aos detalhes do chamado.

### Comunicação em tempo real

A API utiliza **Socket.IO** para suportar comunicação em tempo real.

A infraestrutura permite que o mesmo servidor HTTP disponibilize:

```text
                 HTTP Server
                /           \
               /             \
              ▼               ▼
          REST API        Socket.IO
              │               │
              ▼               ▼
          Database      Connected Clients
```

O Socket.IO foi isolado em uma camada própria para evitar que detalhes de infraestrutura de comunicação em tempo real sejam acoplados às regras de negócio.

> **Observação:** a infraestrutura de Socket.IO está implementada, porém a sincronização completa e consistente de todos os eventos entre API e interface ainda possui pontos a serem refinados nesta entrega.

---

# Arquitetura

A API utiliza uma arquitetura **modular e orientada a funcionalidades (feature-based)**.

```text
src/
├── config/
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── modules/
│   ├── auth/
│   ├── role/
│   ├── user/
│   ├── ticket/
│   ├── ticket-comment/
│   └── ticket-history/
│
├── shared/
│   ├── errors/
│   ├── interfaces/
│   ├── middlewares/
│   ├── socket/
│   ├── types/
│   └── utils/
│
├── app.ts
└── server.ts
```

A separação de responsabilidades contempla:

* Routes;
* Controllers;
* Services / Use Cases;
* Repositories;
* Entities;
* Schemas de validação;
* Middlewares;
* Tratamento de erros;
* Infraestrutura de banco;
* Infraestrutura de Socket.IO.

Essa organização permite manter as regras de negócio desacopladas de detalhes de infraestrutura, facilitando manutenção, testes e evolução do projeto.

---

# Organização por domínio

Os principais módulos da aplicação são:

```text
auth
│
├── Autenticação
└── Geração e validação de tokens

user
│
├── Usuários
└── Consulta de usuários

role
│
└── Papéis e permissões

ticket
│
├── Criação
├── Listagem
├── Consulta
├── Atualização
├── Exclusão
├── Filtros
└── Atribuição de responsável

ticket-comment
│
├── Criação
└── Consulta

```

Essa divisão evita concentrar toda a regra de negócio em controllers ou arquivos genéricos.

---

# Fluxo de uma requisição

De forma simplificada, uma requisição segue o fluxo:

```text
HTTP Request
     │
     ▼
   Route
     │
     ▼
 Middleware
     │
     ▼
 Controller
     │
     ▼
 Service / Use Case
     │
     ▼
 Repository
     │
     ▼
 TypeORM
     │
     ▼
   MySQL
```

A resposta retorna pelo caminho inverso até o cliente.

Essa separação permite que cada camada tenha uma responsabilidade específica.

---

# Validação e tratamento de erros

A API utiliza **Zod** para validação dos dados recebidos.

As requisições são validadas na entrada da aplicação antes que os dados sejam encaminhados para as regras de negócio e persistência.

Exemplo de resposta de validação:

```json
{
  "message": "Falha na validação",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "title",
      "message": "Too small: expected string to have >=3 characters"
    },
    {
      "field": "description",
      "message": "Too small: expected string to have >=5 characters"
    }
  ]
}
```

Esse formato permite que o front-end identifique exatamente quais campos precisam ser corrigidos.

O tratamento de erros também é centralizado através de middleware próprio.

---

# Segurança

Foram adotadas algumas medidas básicas de segurança na API:

* JWT para autenticação;
* `bcryptjs` para hash de senhas;
* Helmet para headers de segurança;
* CORS configurável por ambiente;
* Variáveis sensíveis através de `.env`;
* Rotas protegidas por middleware;
* Validação de entrada com Zod.

---

# Banco de dados

A aplicação utiliza:

* **MySQL** como banco relacional;
* **TypeORM** como ORM;
* Migrations para versionamento do schema;
* Seeds para dados iniciais.

Os principais domínios persistidos são:

```text
roles
users
tickets
ticket_comments
```

### Relacionamentos simplificados

```text
Role
 │
 └── User
       │
       ├── Tickets criados
       │
       └── Tickets atribuídos

Ticket
 │
 ├── Comments
 │      └── User
 │
 └── History
```

O uso de migrations permite reproduzir a estrutura do banco de maneira consistente entre diferentes ambientes.

---

# Tecnologias utilizadas

## Back-end

| Tecnologia      | Utilização                |
| --------------- | ------------------------- |
| **Node.js 22+** | Runtime                   |
| **TypeScript**  | Tipagem estática          |
| **Express 5**   | Framework HTTP            |
| **TypeORM**     | ORM e persistência        |
| **MySQL**       | Banco de dados relacional |
| **Socket.IO**   | Comunicação em tempo real |
| **JWT**         | Autenticação              |
| **bcryptjs**    | Hash de senhas            |
| **Zod**         | Validação                 |
| **Helmet**      | Segurança HTTP            |
| **CORS**        | Controle de origem        |
| **Vitest**      | Testes automatizados      |
| **Supertest**   | Testes HTTP               |
| **ESLint**      | Qualidade de código       |
| **Prettier**    | Formatação                |

As dependências e scripts disponíveis no projeto estão definidos no `package.json`.

---

# Pré-requisitos

Antes de executar o projeto, tenha instalado:

* Node.js **22 ou superior**;
* npm;
* MySQL 8+;
* Git.

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/leticia-gomes/internal-ticket-system-api.git
```

Entre na pasta:

```bash
cd internal-ticket-system-api
```

Instale as dependências:

```bash
npm install
```

---

# Configuração das variáveis de ambiente

Copie o arquivo de exemplo:

### Linux / macOS

```bash
cp .env.example .env
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

Configure as variáveis de acordo com seu ambiente.

Exemplo:

```env
NODE_ENV=development

PORT=3333

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=internal_ticket_system

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d

FRONTEND_URL=http://localhost:5173
```

> Os valores acima são apenas exemplos. Não versionar o arquivo `.env` com informações sensíveis.

---

# Banco de dados

Crie o banco no MySQL:

```sql
CREATE DATABASE internal_ticket_system;
```

Execute as migrations:

```bash
npm run migration:run
```

Execute os seeds:

```bash
npm run seed
```

As migrations são responsáveis pela criação e evolução da estrutura do banco, enquanto os seeds fornecem os dados iniciais necessários para execução da aplicação.

---

# Executando a API

Para desenvolvimento:

```bash
npm run dev
```

Para gerar o build:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm start
```

A API estará disponível, por padrão, em:

```text
http://localhost:3333
```

---

# Health Check

A aplicação possui endpoint para verificar a disponibilidade da API:

```http
GET /health
```

Exemplo:

```bash
curl http://localhost:3333/health
```

---

# Testes

O projeto utiliza **Vitest** para testes automatizados e **Supertest** para testes HTTP.

Scripts disponíveis:

### Executar todos os testes

```bash
npm test
```

### Testes unitários

```bash
npm run test:unit
```

### Testes em modo watch

```bash
npm run test:watch
```

### Testes de integração

```bash
npm run test:integration
```

### Verificação de tipos

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

### Formatação

```bash
npm run format:check
```

### Validação completa

```bash
npm run validate
```

O projeto possui testes unitários implementados.

> **Status da entrega:** a cobertura de testes de integração ainda está incompleta. Essa limitação é apresentada de forma explícita nesta documentação para refletir o estado real da entrega do desafio.

---

# Estratégia de testes

A estrutura de testes foi separada por responsabilidade:

```text
Testes
│
├── Unitários
│   └── Regras e componentes isolados
│
└── Integração
    └── Integração com banco/API
```

Essa separação permite evoluir a cobertura sem misturar testes unitários com testes que dependem de infraestrutura externa.

---

# Migrations

Comandos disponíveis:

### Criar migration

```bash
npm run migration:create
```

### Gerar migration

```bash
npm run migration:generate
```

### Executar migrations

```bash
npm run migration:run
```

### Reverter última migration

```bash
npm run migration:revert
```

### Visualizar status

```bash
npm run migration:show
```

---

# API

A API disponibiliza endpoints para os principais domínios da aplicação:

```text
/auth
/users
/tickets
/tickets/:id
/tickets/:id/comments
```

Entre as operações disponibilizadas estão:

* Autenticação;
* Consulta de usuários;
* Criação de chamados;
* Listagem de chamados;
* Filtros;
* Consulta de detalhes;
* Atualização;
* Exclusão;
* Atribuição de responsável;
* Criação de comentários.

A documentação e exploração dos endpoints pode ser realizada através da coleção/documentação disponibilizada no **Postman**.

---

# Socket.IO

O servidor HTTP também disponibiliza a infraestrutura de Socket.IO.

Arquiteturalmente:

```text
                    Node.js Server
                    /            \
                   /              \
                  ▼                ▼
             Express API       Socket.IO
                  │                │
                  ▼                ▼
               MySQL          Connected Clients
```

O serviço de socket é mantido separado da lógica de negócio.

Eventos relacionados a alterações de chamados e comentários podem ser utilizados para manter clientes conectados sincronizados.

> A implementação da infraestrutura está presente no projeto, porém o fluxo completo de sincronização em tempo real ainda pode receber melhorias.

---

# Integração com o Front-end

O front-end correspondente está disponível em outro repositório:

**Internal Ticket System UI**

```text
Vue 3
   │
   ├── Axios ───────────────► REST API
   │
   └── Socket.IO Client ───► Socket.IO
```

O front-end utiliza:

* Vue 3;
* TypeScript;
* Vite;
* Pinia;
* Vue Router;
* Axios;
* Socket.IO Client.

---

# Repositório do Front-end

[Internal Ticket System UI](https://github.com/leticia-gomes/internal-ticket-system-ui)

O projeto de interface é responsável por:

* Login;
* Navegação;
* Listagem de chamados;
* Filtros;
* Criação;
* Edição;
* Exclusão;
* Detalhes;
* Atribuição de responsáveis;
* Comentários;
* Integração com a API.

---

# Docker

A especificação do desafio prevê uma configuração Docker contemplando:

```text
┌───────────────────────┐
│      Front-end        │
├───────────────────────┤
│         API           │
├───────────────────────┤
│        MySQL          │
└───────────────────────┘
```

A configuração Docker completa da solução Full Stack ainda não está finalizada nesta entrega.

Por esse motivo, o README não apresenta comandos Docker como se fossem uma funcionalidade concluída e validada.

A execução local através de Node.js + MySQL é o fluxo recomendado para avaliação desta versão.

---

# Status do desafio

| Requisito                        |     Status     |
| -------------------------------- | :------------: |
| Node.js 22+                      |        ✅       |
| TypeScript                       |        ✅       |
| Express                          |        ✅       |
| MySQL                            |        ✅       |
| TypeORM                          |        ✅       |
| Autenticação                     |        ✅       |
| JWT                              |        ✅       |
| Hash de senha                    |        ✅       |
| Usuários                         |        ✅       |
| CRUD de chamados                 |        ✅       |
| Status do chamado                |        ✅       |
| Prioridade                       |        ✅       |
| Responsável                      |        ✅       |
| Filtros                          |        ✅       |
| Comentários                      |        ✅       |
| Histórico                        |        ✅       |
| Validação com Zod                |        ✅       |
| Tratamento centralizado de erros |        ✅       |
| Migrations                       |        ✅       |
| Seeds                            |        ✅       |
| Socket.IO                        |        ✅       |
| Sincronização realtime completa  | ⚠️ Em evolução |
| Testes unitários                 |        ✅       |
| Testes de integração             | ⚠️ Incompletos |
| Documentação Postman             |        ✅       |
| Docker Full Stack                |  ⚠️ Incompleto |

---

# Decisões técnicas

## Arquitetura modular

A organização por domínio foi escolhida para facilitar a manutenção e permitir que cada funcionalidade evolua de maneira independente.

Em vez de concentrar controllers, services e repositories em diretórios globais, cada módulo mantém os elementos relacionados à sua própria regra de negócio.

---

## TypeScript

TypeScript foi utilizado em todo o back-end para:

* Tipagem estática;
* Maior segurança durante o desenvolvimento;
* Melhor suporte da IDE;
* Contratos explícitos;
* Redução de erros em tempo de execução.

---

## TypeORM + Migrations

O TypeORM foi escolhido para facilitar a comunicação com o MySQL e manter as entidades relacionadas ao domínio.

As migrations foram utilizadas para evitar alterações manuais e não versionadas no banco de dados.

---

## Zod

A validação foi colocada na fronteira da aplicação para garantir que dados inválidos não avancem para as regras de negócio.

Além disso, o formato padronizado de erros facilita o tratamento pelo front-end.

---

## JWT

JWT foi utilizado para autenticação stateless da API.

Após o login, o cliente recebe um token que deve ser enviado nas requisições protegidas.

---

## Separação entre Controller, Service e Repository

A divisão permite:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Com isso:

* Controllers lidam com HTTP;
* Services concentram regras de negócio;
* Repositories lidam com persistência.

Essa abordagem facilita testes e reduz acoplamento.

---

# Limitações conhecidas

Como se trata de uma entrega de desafio técnico realizada dentro de um período limitado, alguns pontos permanecem como oportunidades de evolução:

### Testes de integração

A estrutura de testes de integração está preparada, porém a cobertura ainda não foi concluída.

### Sincronização em tempo real

A infraestrutura Socket.IO está implementada, mas o fluxo completo de sincronização entre todos os eventos da API e o estado da aplicação cliente ainda pode ser aprimorado.

### Docker Full Stack

A configuração Docker envolvendo simultaneamente front-end, API e banco de dados ainda não está concluída nesta versão.

Esses pontos são documentados intencionalmente para manter transparência sobre o estado atual da solução.

---

# Próximos passos

Entre as evoluções planejadas estão:

* Aumentar a cobertura de testes unitários;
* Implementar testes de integração com banco isolado;
* Refinar a sincronização Socket.IO;
* Finalizar o ambiente Docker Full Stack;
* Expandir a cobertura de testes da API;
* Evoluir a documentação dos endpoints;
* Adicionar testes automatizados de cenários de autenticação e autorização.

---

# Scripts disponíveis

| Comando                      | Descrição                           |
| ---------------------------- | ----------------------------------- |
| `npm run dev`                | Executa em desenvolvimento          |
| `npm run build`              | Compila o projeto                   |
| `npm start`                  | Executa o build                     |
| `npm run typecheck`          | Verifica os tipos                   |
| `npm run lint`               | Executa ESLint                      |
| `npm run lint:fix`           | Corrige problemas do ESLint         |
| `npm run format`             | Formata o projeto                   |
| `npm run format:check`       | Verifica formatação                 |
| `npm run validate`           | Executa typecheck + lint + prettier |
| `npm run migration:create`   | Cria migration                      |
| `npm run migration:generate` | Gera migration                      |
| `npm run migration:run`      | Executa migrations                  |
| `npm run migration:revert`   | Reverte migration                   |
| `npm run migration:show`     | Exibe status das migrations         |
| `npm run seed`               | Executa seeds                       |
| `npm test`                   | Executa testes                      |
| `npm run test:unit`          | Executa testes unitários            |
| `npm run test:integration`   | Executa testes de integração        |
| `npm run test:watch`         | Executa testes em watch             |

---

# Autora

**Letícia Gomes Ribeiro**

Desenvolvedora Full Stack com experiência em desenvolvimento de aplicações web, APIs, bancos de dados e interfaces modernas.

---

## Projeto do desafio

**Back-end**

[Internal Ticket System API](https://github.com/leticia-gomes/internal-ticket-system-api)

**Front-end**

[Internal Ticket System UI](https://github.com/leticia-gomes/internal-ticket-system-ui)

---

## Licença

Este projeto foi desenvolvido para fins de **avaliação técnica**.
