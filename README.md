# Portfolio JA

My full-stack portfolio web application consisting of a **Spring Boot** backend REST API and an **Angular** single-page frontend application.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Getting Started](#getting-started)
  - [1. Database Setup](#1-database-setup)
  - [2. Backend Setup & Run](#2-backend-setup--run)
  - [3. Frontend Setup & Run](#3-frontend-setup--run)
- [Available Scripts](#available-scripts)

---

## Overview

Portfolio JA is structured as a multi-module monolithic repository containing:
- **`backend/`**: A Spring Boot application exposing REST API endpoints, persisting data to PostgreSQL via Spring Data JPA and managing schema migrations with Flyway.
- **`frontend/`**: An Angular client consuming the backend API. During development, requests to `/api` are proxied directly to the backend server.

---

## Tech Stack

To be updated...

### Backend
- **Language**: Java 21
- **Framework**: Spring Boot 3.2.5
- **Database**: PostgreSQL (Driver: `org.postgresql:postgresql`)
- **Build Tool / Package Manager**: Apache Maven (`pom.xml`)
- **Utilities**: Project Lombok

### Frontend
- **Framework**: Angular 22 (v22.2.x)
- **Language**: TypeScript (~6.0.2)
- **Package Manager**: npm (`npm@11.17.0`)
- **Build / Tooling**: `@angular/cli` & `@angular/build` (v22.2.4)
- **Testing**: Vitest (`vitest` ^5.0.0, `jsdom` ^30.0.0)
- **Code Formatter**: Prettier (`prettier` ^3.8.1)

---

## Project Structure

```text
portfolio_ja/
├── backend/                              # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/backend/
│   │   │   │   ├── BackendApplication.java       # Main Spring Boot entry point
│   │   │   │   ├── HealthCheckController.java   # /api/health endpoint
│   │   │   │   └── ServletInitializer.java      # WAR deployment initializer
│   │   │   └── resources/
│   │   │       └── application.yaml             # Backend application configuration
│   │   └── test/
│   │       └── java/backend/
│   │           └── BackendApplicationTests.java # Backend context load tests
│   ├── HELP.md                           # Spring Boot reference guides
│   └── pom.xml                           # Maven project configuration
├── frontend/                             # Angular Single Page Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.config.ts             # Application routing & HTTP client providers
│   │   │   ├── app.routes.ts             # Frontend routing configuration
│   │   │   ├── app.ts                    # Root component logic (fetches health status)
│   │   │   ├── app.html                  # Root component template
│   │   │   ├── app.css                   # Root component styling
│   │   │   └── app.spec.ts               # Root component unit tests
│   │   ├── index.html                    # Main HTML page
│   │   ├── main.ts                       # Angular bootstrapping entry point
│   │   └── styles.css                    # Global styling
│   ├── public/                           # Static assets
│   ├── angular.json                      # Angular CLI project configuration
│   ├── package.json                      # npm dependencies and scripts
│   ├── proxy.conf.json                   # Proxy configuration for development (/api -> backend)
│   ├── tsconfig.json                     # TypeScript compiler configuration
│   ├── tsconfig.app.json                 # Angular application TypeScript config
│   ├── tsconfig.spec.json                # Test suite TypeScript config
│   └── README.md                         # Frontend-specific documentation
└── README.md                             # Repository root documentation (this file)
```

---

## Requirements

Ensure you have the following installed on your system:

- **Java Development Kit (JDK)**: Version 21 or later
- **Apache Maven**: Version 3.8+ (or use IDE-bundled Maven)
- **Node.js**: Version 20.x or later (compatible with npm 11+)
- **npm**: Version 11.x (managed via `packageManager` in `package.json`)
- **PostgreSQL**: Version 16.x or compatible

---

## Configuration & Environment Variables

### Backend Configuration

Backend properties are configured in `backend/src/main/resources/application.yaml`:

| Property                        | Default Value                                    | Description                                  |
|:--------------------------------|:-------------------------------------------------|:---------------------------------------------|
| `server.port`                   | `8080`                                           | Port on which the Spring Boot server listens |
| `spring.application.name`       | `backend`                                        | Spring application name                      |
| `spring.datasource.url`         | `jdbc:postgresql://localhost:5434/database_name` | PostgreSQL JDBC connection URL               |
| `spring.datasource.username`    | `postgres`                                       | Database username                            |
| `spring.datasource.password`    | `{password}`                                     | Database password                            |
| `spring.jpa.hibernate.ddl-auto` | `validate`                                       | Hibernate schema management mode             |
| `spring.jpa.open-in-view`       | `false`                                          | Open-Session-In-View pattern setting         |

#### Common Environment Overrides
You can override default settings via standard Spring Boot environment variables or command-line properties:
- `SERVER_PORT`: Port number for backend service.
- `SPRING_DATASOURCE_URL`: JDBC database URL.
- `SPRING_DATASOURCE_USERNAME`: PostgreSQL username.
- `SPRING_DATASOURCE_PASSWORD`: PostgreSQL password.

### Frontend Configuration

- **Development Proxy (`frontend/proxy.conf.json`)**:
  - Automatically routes all `/api/*` HTTP calls to `http://localhost:8080` to avoid CORS issues in local development.
- **Angular Configuration (`frontend/angular.json`)**:
  - Configures build options, development server options, and test builders.

---

## Getting Started

### 1. Database Setup

Ensure PostgreSQL is running and the database specified in `application.yaml` exists:

```sql
CREATE DATABASE database_name;
```

By default, the backend connects to `localhost:5434` with user `postgres` and password `{password}`. Adjust `backend/src/main/resources/application.yaml` or set environment variables if your local database runs on a different port or credentials.

### 2. Backend Setup & Run

Open a terminal and navigate to the `backend/` directory:

```bash
cd backend
```

Build and compile the backend:
```bash
mvn clean compile
```

Run the backend application:
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`. You can test the health endpoint:
```bash
curl http://localhost:8080/api/health
```
Response:
```json
{"status":"The application is up and running"}
```

### 3. Frontend Setup & Run

Open a new terminal and navigate to the `frontend/` directory:

```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the Angular development server:
```bash
npm start
```
*(Alternatively: `ng serve`)*

Navigate your browser to `http://localhost:4200/`. The frontend will load and display the backend connection status retrieved via the `/api/health` endpoint.

---

## Available Scripts

### Frontend Scripts (`frontend/package.json`)

Run from the `frontend/` directory:

- `npm start` – Starts the local development server with the proxy enabled (`ng serve` on `http://localhost:4200/`).
- `npm run build` – Compiles the Angular application into the `dist/` directory for production deployment.
- `npm run watch` – Builds the project in development mode and watches for file changes.
- `npm test` – Runs unit tests using the Vitest test runner.
- `npm run ng` – Runs Angular CLI commands (e.g. `npm run ng -- generate component <name>`).

### Backend Commands (Maven)

Run from the `backend/` directory:

- `mvn clean compile` – Cleans and compiles Java source code.
- `mvn test` – Executes backend unit and integration tests.
- `mvn spring-boot:run` – Runs the Spring Boot application locally.
- `mvn package` – Packages the application into an executable artifact (`.war`).
