Here's a basic project documentation template for your TypeScript and Express-based library management system with SQLite database support. You can expand on this as needed for your specific project requirements.

---

# Library Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Migrations](#database-migrations)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

The **Library Management System** is a simple API built with **TypeScript** and **Express** for managing a library of books. The project uses **SQLite** for data storage, and the migration framework **Knex** to manage database migrations.

This application allows users to create, read, update, and delete (CRUD) books and includes features like logging and basic error handling.

---

## Features

- Manage books in a library (CRUD operations).
- Logging system to track actions and errors.
- SQLite database for persistent data storage.
- TypeScript for strong type checking and object-oriented programming (OOP) practices.
- Knex for database migrations.
- Basic error handling with custom error messages.

---

## Project Structure

```
library-management/
├── src/
│   ├── controllers/            # Controller logic for API
│   ├── db/                     # Knex and SQLite configuration
│   ├── middleware/             # Middleware functions (e.g., logging)
│   ├── models/                 # Database models
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic and services
│   ├── utils/                  # Utility functions (e.g., loggers)
│   └── index.ts                # App entry point
├── data/                       # SQLite database files
├── migrations/                 # Knex migration files
├── dist/                       # Compiled JavaScript output (after build)
├── package.json                # Project metadata and dependencies
├── tsconfig.json               # TypeScript configuration
└── yarn.lock                   # Yarn lock file for exact dependency versions
```

---

## Requirements

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (instead of npm)
- SQLite (no separate setup required, handled within the project)

---

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/library-management.git
    cd library-management
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

---

## Configuration

### `tsconfig.json`

Ensure your TypeScript configuration is properly set up to compile the source files from the `src` folder to `dist`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
```

### Knex Configuration (`src/db/knex.ts`)

The SQLite database configuration should point to the correct location of the `.sqlite` file:

```typescript
const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/library.sqlite',
  },
  useNullAsDefault: true,
});

export default db;
```

---

## Running the Application

1. **Build the project:**

    Compile TypeScript code to JavaScript:

    ```bash
    yarn build
    ```

2. **Start the server:**

    After building, start the server:

    ```bash
    yarn start
    ```

3. **Development mode:**

    If you're working on the project, run the following to start the app in development mode (using `ts-node`):

    ```bash
    yarn dev
    ```

4. **Accessing the server:**

    Once the server is running, you can access it locally at:

    ```
    http://localhost:3000
    ```

    If you need to access it from another device on the same local network, use your local IP address:

    ```
    http://<your-local-ip>:3000
    ```

---

## Database Migrations

### Running Migrations

To run the latest database migrations and create tables, use:

```bash
yarn migrate
```

If you're using the Knex CLI, you can also run:

```bash
knex migrate:latest --knexfile ./src/db/knex.ts
```

### Creating New Migrations

To create a new migration file, run:

```bash
knex migrate:make <migration_name> --knexfile ./src/db/knex.ts
```

---

## API Endpoints

Here are some of the key API endpoints in the Library Management System:

### Books

- **GET** `/books`: List all books.
- **POST** `/books`: Create a new book.
- **GET** `/books/:id`: Retrieve a specific book by ID.
- **PUT** `/books/:id`: Update a specific book by ID.
- **DELETE** `/books/:id`: Delete a book by ID.

---

## Scripts

You can use the following `yarn` scripts to manage the project:

- **`yarn build`**: Compiles TypeScript files into JavaScript in the `dist` folder.
- **`yarn start`**: Starts the compiled app from the `dist` folder.
- **`yarn dev`**: Runs the app in development mode using `ts-node` (no need to compile).
- **`yarn clean`**: Cleans up the `dist` folder (deletes all compiled files).
- **`yarn migrate`**: Runs all pending migrations to set up the database schema.
- **`yarn migrate:rollback`**: Rolls back the latest batch of migrations.

---

## Development Notes

- **Debugging**: To debug the app, consider using `console.log` statements or a debugging tool like `node --inspect` with `ts-node`.
- **Logging**: Logs are managed using a custom middleware. Logs are stored locally and can be extended to be persisted in external storage if necessary.
- **TypeScript Linting**: Use a linter like `eslint` to ensure consistent code style and catch common errors. You can configure it for TypeScript.

---

## Contributing

If you would like to contribute, feel free to submit a pull request or open an issue on GitHub. Please adhere to the code of conduct and the contribution guidelines.

### Contribution Steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes with descriptive messages.
4. Submit a pull request with a detailed explanation of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This documentation provides a basic overview of the project. You can customize it further based on specific needs or add sections for additional features and tools you integrate into your project.