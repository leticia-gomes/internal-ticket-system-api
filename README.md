# Internal Ticket System

Full Stack application for **internal ticket management**, developed as part of a technical challenge focused on **Vue.js and Node.js**.

The solution was designed to demonstrate practical knowledge of:

* Front-end development with Vue 3 and TypeScript;
* REST API development with Node.js and Express;
* Authentication and protected resources;
* Relational database modeling;
* Data validation;
* Modular architecture and separation of responsibilities;
* Ticket lifecycle management;
* Comments and ticket history;
* Real-time communication with Socket.IO;
* Automated testing;
* Database migrations and seeds;
* Front-end / back-end integration.

The visual interface intentionally follows a simple and functional approach, according to the challenge specification, which prioritizes **code quality, organization, maintainability and technical decisions** over visual complexity.

---

## Challenge

The application simulates an internal support environment where authenticated users can create, track and manage internal tickets.

A ticket contains information such as:

* Title;
* Description;
* Status;
* Priority;
* Responsible user;
* Creator;
* Creation date;
* Last update date.

Users can also add comments to tickets and follow their lifecycle.

The solution is divided into two repositories:

| Repository                   | Responsibility   |
| ---------------------------- | ---------------- |
| `internal-ticket-system-ui`  | Vue 3 front-end  |
| `internal-ticket-system-api` | Node.js REST API |

---

## Solution Architecture

The complete solution follows this architecture:

```text
                         ┌─────────────────────────┐
                         │       User / Browser     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Vue 3 + TypeScript  │
                         │        Front-end        │
                         └────────────┬────────────┘
                                      │
                       ┌──────────────┴──────────────┐
                       │                             │
                  HTTP / REST                    Socket.IO
                       │                             │
                       ▼                             ▼
              ┌─────────────────────────────────────────┐
              │             Node.js API                  │
              │              Express                     │
              ├─────────────────────────────────────────┤
              │ Authentication                          │
              │ Validation                              │
              │ Business rules                          │
              │ Ticket management                        │
              │ Comments                                 │
              │ Real-time events                         │
              └────────────────┬────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MySQL          │
                    │      TypeORM         │
                    └──────────────────────┘
```

The front-end communicates with the API through REST endpoints and uses Socket.IO for real-time communication.

The API is responsible for authentication, validation, business logic, persistence and event emission.

---

# Repositories

## Front-end

**Internal Ticket System UI**

Vue 3 + TypeScript application responsible for authentication, navigation, ticket management, users and comments.

Repository:

https://github.com/leticia-gomes/internal-ticket-system-ui

Main technologies:

* Vue 3;
* TypeScript;
* Vite;
* Pinia;
* Vue Router;
* Axios;
* Socket.IO Client;
* ESLint;
* Prettier.

---

## Back-end

**Internal Ticket System API**

REST API responsible for authentication, business rules, persistence, validation and real-time communication.

Repository:

https://github.com/leticia-gomes/internal-ticket-system-api

Main technologies:

* Node.js 22+;
* TypeScript;
* Express;
* TypeORM;
* MySQL;
* Socket.IO;
* JWT;
* bcryptjs;
* Zod;
* Helmet;
* CORS;
* Vitest;
* Supertest.

---

# Main Features

## Authentication

The system provides authentication using:

* E-mail;
* Password;
* JWT;
* Password hashing with bcryptjs;
* Protected API routes;
* Protected front-end routes.

Only authenticated users can access the ticket management area.

---

## Users

The API provides access to registered users.

Users contain information such as:

* Name;
* E-mail;
* Creation date.

Users can be assigned as responsible for tickets.

A complete public user-registration workflow was intentionally not implemented because it is outside the challenge scope.

Initial users are provided through the application's seed mechanism.

---

## Ticket Management

The application implements the complete ticket CRUD workflow:

* Create;
* List;
* View details;
* Edit;
* Delete.

Each ticket contains:

```text
Title
Description
Status
Priority
Responsible user
Creator
Created at
Updated at
```

### Statuses

```text
Open
In progress
Resolved
Closed
```

### Priorities

```text
Low
Medium
High
Urgent
```

---

## Ticket Search and Filtering

The ticket listing supports filtering/search capabilities required by the challenge.

The API exposes filtering parameters and the front-end provides the corresponding interface.

Available filtering capabilities include criteria such as:

* Status;
* Priority;
* Responsible user;
* Title search.

This keeps filtering logic close to the API while allowing the front-end to remain focused on presentation and interaction.

---

## Ticket Details

The ticket details screen provides the complete ticket information and allows the user to update:

* Title;
* Description;
* Status;
* Priority;
* Responsible user.

The screen also displays the ticket comments.

---

## Comments

Authenticated users can add comments to tickets.

Each comment is associated with:

* Ticket;
* Author;
* Content;
* Creation date.

Comments are returned as part of the ticket details and displayed chronologically by the front-end.

---

## Ticket History

The API contains a dedicated ticket history domain to provide traceability for ticket changes.

This creates a foundation for auditing the ticket lifecycle and understanding how a ticket evolved over time.

---

# Real-Time Communication

The API uses **Socket.IO** to support real-time communication.

The architecture allows the REST API and Socket.IO to operate through the same HTTP server:

```text
                    HTTP Server
                   /           \
                  /             \
                 ▼               ▼
             REST API        Socket.IO
                 │               │
                 │               │
                 ▼               ▼
             Database      Connected clients
```

A dedicated socket service isolates Socket.IO infrastructure from the application's business logic.

The front-end includes `socket.io-client` and uses centralized application state through Pinia, providing the appropriate structure for synchronizing ticket and comment state between connected clients.

> **Current status:** the Socket.IO infrastructure is implemented, but the complete end-to-end real-time synchronization flow between all ticket/comment operations and the front-end still requires further refinement.

This is explicitly documented as an incomplete item rather than being presented as fully implemented.

---

# Back-end Architecture

The API follows a modular, feature-oriented architecture.

```text
src/
├── config/
├── database/
│   ├── migrations/
│   └── seeds/
├── modules/
│   ├── auth/
│   ├── role/
│   ├── user/
│   ├── ticket/
│   ├── ticket-comment/
│   └── ticket-history/
├── shared/
│   ├── errors/
│   ├── interfaces/
│   ├── middlewares/
│   ├── socket/
│   ├── types/
│   └── utils/
├── app.ts
└── server.ts
```

Responsibilities are separated between:

* Routes;
* Controllers;
* Use cases/services;
* Repositories;
* Entities;
* Validation;
* Middleware;
* Error handling;
* Socket infrastructure;
* Database infrastructure.

This organization keeps business rules independent from infrastructure concerns and makes the application easier to maintain and evolve.

---

# Front-end Architecture

The front-end follows a feature-based organization.

```text
src/
├── app/
│   ├── guards/
│   └── router/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── tickets/
│   ├── users/
│   └── errors/
├── assets/
└── main.ts
```

Each domain contains the resources necessary for its own functionality, including:

* Pages;
* Components;
* API modules;
* Services;
* Stores;
* Types;
* Routes.

The general communication flow is:

```text
Vue Page
    ↓
Pinia Store
    ↓
Domain Service
    ↓
API Module
    ↓
Axios
    ↓
REST API
```

This prevents Vue pages from becoming tightly coupled to HTTP implementation details.

---

# Validation and Error Handling

The API validates incoming data using **Zod**.

Validation occurs at the API boundary before data reaches business logic or persistence.

Errors are handled through a centralized application error mechanism.

For example:

```json
{
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "title",
      "message": "Too small: expected string to have >=3 characters"
    }
  ]
}
```

This structured response allows the front-end to display validation errors consistently.

The API also uses:

* Helmet;
* CORS;
* Environment configuration;
* JWT authentication;
* Password hashing.

---

# Database

The application uses:

* MySQL;
* TypeORM;
* Versioned migrations;
* Database seeds.

Main domains include:

```text
roles
users
tickets
ticket_comments
ticket_history
```

Database changes are versioned through migrations, making the database structure reproducible across environments.

---

# Technology Stack

## Front-end

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| Vue 3            | UI framework            |
| TypeScript       | Static typing           |
| Vite             | Build tooling           |
| Pinia            | State management        |
| Vue Router       | Navigation              |
| Axios            | HTTP communication      |
| Socket.IO Client | Real-time communication |
| ESLint           | Code quality            |
| Prettier         | Code formatting         |

## Back-end

| Technology  | Purpose                    |
| ----------- | -------------------------- |
| Node.js 22+ | Runtime                    |
| TypeScript  | Static typing              |
| Express     | HTTP framework             |
| TypeORM     | ORM                        |
| MySQL       | Relational database        |
| Socket.IO   | Real-time communication    |
| JWT         | Authentication             |
| bcryptjs    | Password hashing           |
| Zod         | Request validation         |
| Helmet      | HTTP security headers      |
| CORS        | Cross-origin configuration |
| Vitest      | Automated testing          |
| Supertest   | HTTP testing               |

---

# Running the Solution

The application consists of two independent projects.

Both repositories must be available locally.

## 1. Clone the repositories

```bash
git clone https://github.com/leticia-gomes/internal-ticket-system-ui.git
git clone https://github.com/leticia-gomes/internal-ticket-system-api.git
```

You can organize them as:

```text
internal-ticket-system/
├── internal-ticket-system-ui/
└── internal-ticket-system-api/
```

---

# ⚙️ Back-end Setup

Enter the API directory:

```bash
cd internal-ticket-system-api
```

Install dependencies:

```bash
npm install
```

Create the MySQL database:

```sql
CREATE DATABASE internal_ticket_system;
```

Create the environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the environment variables:

```env
NODE_ENV=development
PORT=3333

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=internal_ticket_system

JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d

FRONTEND_URL=http://localhost:5173
```

Run migrations:

```bash
npm run migration:run
```

Run seeds:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

The API will normally be available at:

```text
http://localhost:3333
```

Health check:

```text
GET /health
```

---

# Front-end Setup

Open another terminal and enter the UI directory:

```bash
cd internal-ticket-system-ui
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure:

```env
VITE_API_URL=http://localhost:3333
```

Start the application:

```bash
npm run dev
```

The front-end will normally be available at:

```text
http://localhost:5173
```

---

# Tests

The challenge requires automated API tests consisting of:

* At least two unit tests;
* At least two integration tests using a database.

Unit testing was implemented using Vitest.

At the current submission stage:

* ✅ Unit tests are implemented;
* ⚠️ Integration test coverage is incomplete;
* ℹ️ Front-end automated tests were not required by the challenge.

Run unit tests:

```bash
npm run test:unit
```

Integration test command:

```bash
npm run test:integration
```

The integration-test requirement is intentionally documented as incomplete.

---

# API Documentation

The API is documented through **Postman**.

The Postman documentation provides the endpoint catalog and examples for:

* Authentication;
* Users;
* Tickets;
* Ticket filtering;
* Ticket details;
* Ticket updates;
* Ticket deletion;
* Comments;
* Validation errors.

The Postman collection is being provided as part of the technical challenge delivery so the API can be manually explored and tested independently of the front-end.

---

# Docker

Docker is a requirement of the complete challenge and should provide an environment containing:

```text
Front-end
    +
API
    +
MySQL
```

The final full-stack Docker configuration is **not complete in the current submission**.

For this reason, no Docker command is presented as fully supported when it cannot currently be guaranteed to work.

The application can be executed locally following the setup instructions above.

---

# Challenge Requirements

The following table summarizes the current implementation status.

| Requirement                        | Status        |
| ---------------------------------- | ------------- |
| Vue 3                              | ✅ Implemented |
| TypeScript                         | ✅ Implemented |
| Node.js 22+                        | ✅ Implemented |
| Express                            | ✅ Implemented |
| MySQL                              | ✅ Implemented |
| Authentication                     | ✅ Implemented |
| Protected routes                   | ✅ Implemented |
| Password hashing                   | ✅ Implemented |
| Users                              | ✅ Implemented |
| Ticket creation                    | ✅ Implemented |
| Ticket listing                     | ✅ Implemented |
| Ticket details                     | ✅ Implemented |
| Ticket editing                     | ✅ Implemented |
| Ticket deletion                    | ✅ Implemented |
| Ticket status                      | ✅ Implemented |
| Ticket priority                    | ✅ Implemented |
| Responsible user                   | ✅ Implemented |
| Ticket filtering/search            | ✅ Implemented |
| Comments                           | ✅ Implemented |
| Ticket history                     | ✅ Implemented |
| Request validation                 | ✅ Implemented |
| Centralized error handling         | ✅ Implemented |
| Database migrations                | ✅ Implemented |
| Database seeds                     | ✅ Implemented |
| Socket.IO infrastructure           | ✅ Implemented |
| Complete real-time synchronization | ⚠️ Incomplete |
| Unit tests                         | ✅ Implemented |
| Integration tests                  | ⚠️ Incomplete |
| Postman documentation              | ✅ Available   |
| Full-stack Docker setup            | ⚠️ Incomplete |

---

# Technical Decisions

## Feature-based architecture

The solution uses a feature-oriented structure instead of grouping the entire application by technical layer.

This makes business domains easier to locate and allows features such as authentication, tickets and users to evolve independently.

---

## TypeScript throughout the stack

Both front-end and back-end use TypeScript.

This provides stronger contracts between:

* API requests;
* API responses;
* Domain models;
* Stores;
* Services;
* Components.

---

## REST + Socket.IO

REST was used for traditional CRUD and resource operations, while Socket.IO was selected for real-time communication.

This combination keeps responsibilities clear:

```text
REST
↓
CRUD / Queries / Authentication

Socket.IO
↓
Real-time events
```

---

## Centralized state management

Pinia was selected for the front-end because the application contains shared state such as:

* Authentication;
* Tickets;
* Users;
* Comments.

It also provides a suitable integration point for Socket.IO events.

---

## API validation

Zod was selected to validate external input at the API boundary.

Invalid data is rejected before reaching the business and persistence layers.

---

## Database migrations

TypeORM migrations were used instead of relying on a manually configured database.

This makes schema changes reproducible and version-controlled.

---

## Transparent scope management

The challenge had a fixed delivery period.

Features outside the mandatory scope were intentionally not prioritized when they would not contribute significantly to the evaluation.

Remaining mandatory gaps are explicitly documented instead of being presented as completed functionality.

---

# Development Workflow

Development followed a feature-oriented Git workflow.

Examples:

```text
main
├── feat/auth
├── feat/user
├── feat/ticket
├── feat/socket
├── chore/database
└── chore/environment
```

Commits follow the **Conventional Commits** style:

```text
feat: implement authentication
feat: create ticket entity
feat: add ticket comments
fix: correct database connection
test: add authentication unit tests
docs: update README
chore: configure environment
```

This keeps the development history easier to understand and review.

---

# Known Limitations

The following points are intentionally disclosed as part of the technical evaluation:

### 1. Integration tests

The required integration-test coverage is not complete.

Unit tests are implemented, but the required database-backed integration tests remain a pending item.

### 2. Docker

The final Docker Compose configuration covering front-end, API and MySQL is not complete in the current submission.

### 3. Real-time synchronization

Socket.IO infrastructure is present on the API and the front-end includes the client dependency and state architecture required for integration.

However, the complete end-to-end synchronization of every ticket/comment event still requires further refinement.

These limitations are documented to provide an accurate representation of the submitted implementation.

---

# Future Improvements

If the project continued beyond the challenge deadline, the next priorities would be:

1. Complete database-backed integration tests.
2. Finalize Docker Compose for the complete stack.
3. Complete end-to-end Socket.IO synchronization.
4. Expand authentication and authorization test coverage.
5. Add CI/CD pipelines for:

   * Type checking;
   * Linting;
   * Automated tests;
   * Production builds.
6. Expand automated front-end testing if the application evolves further.
7. Add additional observability and logging mechanisms.

---

# Project Documentation

For detailed information about each part of the application, refer to the individual repositories:

### Front-end

**Internal Ticket System UI**

https://github.com/leticia-gomes/internal-ticket-system-ui

Contains:

* Vue architecture;
* Pages;
* Components;
* Pinia stores;
* API integration;
* Authentication flow;
* Ticket UI;
* User selection;
* Comments.

### Back-end

**Internal Ticket System API**

https://github.com/leticia-gomes/internal-ticket-system-api

Contains:

* API architecture;
* Authentication;
* Business logic;
* Repositories;
* Entities;
* Migrations;
* Seeds;
* Validation;
* Error handling;
* Socket.IO infrastructure;
* Tests.

---

# Author

**Letícia Gomes Ribeiro**

Full Stack Developer

Technologies demonstrated in this project:

`Vue.js` · `TypeScript` · `Node.js` · `Express` · `TypeORM` · `MySQL` · `Socket.IO`

---

# Technical Challenge

This project was developed as part of a **Full Stack Programming Challenge**, with emphasis on:

* Vue.js;
* Node.js;
* API development;
* Authentication;
* Database modeling;
* Code organization;
* Separation of responsibilities;
* Real-time communication;
* Testing;
* Maintainability.

The implementation prioritizes **clarity, organization and technical consistency**, while explicitly documenting the remaining gaps in the current submission.
