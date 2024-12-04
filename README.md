# **OnTrack**

## Progress

Project's progress can be viewed in [changelog](./changelog.md).

## About

OnTrack is a task and note management system designed to help users organize their personal and collaborative workflows. The application supports:

- Creating and managing tasks or notes.
- Assigning tasks and notes to tags for better organization.
- Creating or joining groups using an invite code for collaboration.
- Sharing tasks and notes within groups, visible to all members.

The application consists of a **frontend** and a **backend**. The backend is built with NestJS, and the frontend provides an intuitive interface for users. The application runs on:

- **Frontend:** `http://localhost:3001`
- **Backend Swagger Documentation:** `http://localhost:3000/api`

---

## Installation

### Prerequisites

- Install NestJS CLI:
  ```bash
  npm install -g @nestjs/cli
  ```
- Ensure Ensure Docker is installed for containerized development.

---

### Run in Docker

**Note:** Ensure Docker is installed.
Install the Prettier plugin in your IDE and set it to auto-format code on save.

Run the following command to start the application using Docker Compose:

```bash
docker-compose up
```

This will spin up the backend and database and frontend in Docker containers.

---

Run locally
Set environment variables in the `.env` file in the root directory.

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
```

Install the dependencies for the backend and frontend:

```bash
npm install
```

Start the backend:

```bash
cd backend
npm run start:dev
```

Start the frontend:

```bash
cd frontend
npm run start:frontend
```

---

## Usage

1. Open the application in your browser at `http://localhost:3001`.
2. Access the backend Swagger documentation at `http://localhost:3000/api`.

---

## Features

### Task Management

- Create, update, and delete tasks or notes.
- Assign tasks and notes to tags for better categorization.

### Group Management

- Create groups using an invite code.
- Join groups using an invite code.
- Share tasks and notes within a group, making them visible to all group members.
