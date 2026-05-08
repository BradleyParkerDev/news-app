# News App

This is a full-stack TypeScript news application built from a reusable PERN application foundation. It uses an Express backend, a Vite + React frontend, PostgreSQL with Drizzle ORM, shared client/server types, SSR entry points, structured logging, testing, OpenAPI, and TypeDoc.

## Overview

News App retrieves top headline articles from NewsAPI, stores article records in PostgreSQL, and serves category-based article pages from the local database. The application includes paginated article browsing by category and saved article relationships for authenticated users.

Shared code for types, API clients, Redux, routing helpers, and schema validation lives in `app/shared` and is used by both the client and server.

## Features

- TypeScript full-stack architecture across client, server, and shared modules
- Express backend with structured route, controller, service, and helper layers
- React frontend powered by Vite with server-side rendering entry points
- PostgreSQL persistence with Drizzle ORM schemas and migrations
- NewsAPI integration for top headline article ingestion
- Article category pages for business, entertainment, general, health, science, sports, and technology
- Pagination for article list responses
- Saved article create/delete functionality through `SavedArticles`
- API call tracking through the `APICall` table to limit NewsAPI requests
- Cron service for scheduled background work, including NewsAPI article fetches
- Structured logging with Winston, including cron and external API logs
- Authentication, sessions, user themes, and profile image support from the PERN foundation
- Linting with ESLint and Prettier
- Testing with Vitest and Supertest
- OpenAPI specification and TypeDoc documentation generation

## Project Structure

```
news-app/
├── app/
│   ├── client/                         # Vite React app + SSR entry points
│   │   ├── dist/
│   │   ├── public/
│   │   ├── src/
│   │   ├── entry-client.tsx
│   │   ├── entry-server.tsx
│   │   ├── index.css
│   │   ├── index.html
│   │   └── tsconfig.json
│   ├── server/                         # Express server source + build output
│   │   ├── dist/
│   │   └── src/
│   │       ├── bin/                     # Server startup entry
│   │       ├── controllers/
│   │       ├── database/
│   │       │   ├── migrations/
│   │       │   ├── schemas/
│   │       │   │   ├── APICall.ts
│   │       │   │   ├── Articles.ts
│   │       │   │   ├── SavedArticles.ts
│   │       │   │   ├── Sessions.ts
│   │       │   │   ├── Users.ts
│   │       │   │   ├── UserThemes.ts
│   │       │   │   ├── UserProfileImages.ts
│   │       │   │   └── index.ts
│   │       │   ├── db.ts
│   │       │   ├── migrate.ts
│   │       │   └── seed.ts
│   │       ├── lib/                     # Logger, server helpers, and utilities
│   │       ├── routes/
│   │       │   └── api/
│   │       │       └── news.ts
│   │       ├── services/
│   │       │   ├── helpers/
│   │       │   │   └── news/
│   │       │   │       ├── newsClient.ts
│   │       │   │       └── newsHelper.ts
│   │       │   └── main/
│   │       │       └── cron/
│   │       │           ├── index.ts
│   │       │           └── jobs/
│   │       │               ├── news/
│   │       │               │   ├── deleteOldArticles.ts
│   │       │               │   └── fetchNewArticlesFromNewsAPICron.ts
│   │       │               ├── pruneExpiredUserSession.ts
│   │       │               └── uploadLogsToS3Bucket.ts
│   │       └── app.ts
│   ├── shared/                         # Shared client/server modules
│   │   ├── axios/
│   │   ├── reactRouter/
│   │   ├── redux/
│   │   ├── types/
│   │   │   └── common/
│   │   │       └── news/
│   │   │           └── NewsArticleTypes.ts
│   │   ├── websockets/
│   │   └── zod/
│   └── tsconfig.json
├── logs/                               # Log output directory
├── tests/                              # Vitest test files
├── docs/                               # Generated TypeDoc output
├── example.env                         # Example environment variables
├── drizzle.config.ts                   # Drizzle Kit configuration
├── eslint.config.mjs                   # ESLint configuration
├── openapi.json                        # OpenAPI spec
├── package.json                        # Project metadata, scripts, dependencies
├── README.md
├── typedoc.json                        # TypeDoc configuration
└── vite.config.ts                      # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v22.13.1 or higher)
- npm (11.1.0 or higher)
- PostgreSQL database, either local or Neon
- NewsAPI API key

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/BradleyParkerDev/news-app.git
    cd news-app
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Copy the example env file and fill in local values:**

    ```sh
    cp example.env .env
    ```

4. **Build the project (client + server):**

    ```sh
    npm run build
    ```

5. **Run in dev mode:**

    ```sh
    npm run dev
    ```

6. **Run in production mode:**

    ```sh
    npm start
    ```

## Environment Variables

Use `example.env` as the source of truth for local configuration. Do not commit real secrets.

```env
APP_NAME="news-app"
UI_APP_NAME="News App"
DEVELOPER_NAME="Your Name"
NODE_ENV="production"
PORT=3001
STREAM_HTML=true
SALT_ROUNDS=5
JWT_SECRET_KEY="replace_with_secure_jwt_secret"

SESSION_MODE=short
SESSION_SHORT_MINUTES=2
SESSION_MEDIUM_MINUTES=30
SESSION_LONG_DAYS=7

# Database
# USE_NEON=true
# NEON_DATABASE_URL="postgresql://username:password@your-neon-host/your_database?sslmode=require&channel_binding=require"
USE_NEON=false
LOCAL_DATABASE_URL="postgresql://username:password@localhost:5432/news_app_db"

# AWS
USE_AWS=true
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_S3_BUCKET="your-s3-bucket-name"
AWS_CLOUDFRONT_DOMAIN="https://your-cloudfront-domain.cloudfront.net"

# NewsAPI
NEWS_API_KEY="your_news_api_key"

# Optional NewsAPI controls supported by the news client
NEWS_API_BASE_URL="https://newsapi.org/v2/top-headlines"
NEWS_API_CALL_FREQUENCY="minutes"
CALL_NEWS_API_MINUTES=30
CALL_NEWS_API_HOURS=1

# Client
VITE_PORT=4001
# VITE_API_URL="http://localhost:3001/api"
API_URL="http://localhost:3001/api"
```

`NEWS_API_BASE_URL`, `NEWS_API_CALL_FREQUENCY`, `CALL_NEWS_API_MINUTES`, and `CALL_NEWS_API_HOURS` are supported by `newsClient.ts`. If they are omitted, the client falls back to top-headlines, minute-based scheduling, 30 minutes, and 1 hour respectively.

## Article Fetching Flow

News article ingestion is handled through `app/server/src/services/helpers/news/newsClient.ts` and is triggered at server startup and by the NewsAPI cron job.

1. The server or cron trigger calls `newsClient.fetchLatestArticlesFromAPI()`.
2. `newsClient` checks the `APICall` table for the last `NewsAPI` call time.
3. If the configured call interval has not elapsed, the request is skipped.
4. If the app can call NewsAPI, it fetches top headlines by category.
5. For each returned article, the app checks whether the article URL already exists in PostgreSQL.
6. New articles are saved to the `Articles` table with their NewsAPI metadata and category.
7. The `APICall` table is updated with the latest call time.
8. Category pages read paginated articles from PostgreSQL through `newsHelper`.

The NewsAPI call frequency is controlled with these environment variables:

- `NEWS_API_KEY`
- `NEWS_API_BASE_URL`
- `NEWS_API_CALL_FREQUENCY`
- `CALL_NEWS_API_MINUTES`
- `CALL_NEWS_API_HOURS`

## Background Services

Background jobs are coordinated from `app/server/src/services/main/cron/index.ts`.

- `fetchNewArticlesFromNewsAPICron.ts` schedules a NewsAPI fetch every five minutes and delegates the call-frequency decision to `newsClient.fetchLatestArticlesFromAPI()`.
- `pruneExpiredUserSession.ts` removes expired user sessions on a cron schedule.
- `deleteOldArticles.ts` is present under the news cron jobs directory as the cleanup job location for old articles, but the file is currently empty and is not started from `cronService.startAll()`.
- `uploadLogsToS3Bucket.ts` exists for log upload work, but it is currently commented out in `cronService.startAll()`.

## Backend News Routes

The news API routes are defined in `app/server/src/routes/api/news.ts`.

| Method   | Route                            | Description                                      |
| -------- | -------------------------------- | ------------------------------------------------ |
| `GET`    | `/api/news/top-headlines`        | Returns paginated top headlines from PostgreSQL. |
| `GET`    | `/api/news/business`             | Returns paginated business articles.             |
| `GET`    | `/api/news/entertainment`        | Returns paginated entertainment articles.        |
| `GET`    | `/api/news/general`              | Returns paginated general articles.              |
| `GET`    | `/api/news/health`               | Returns paginated health articles.               |
| `GET`    | `/api/news/science`              | Returns paginated science articles.              |
| `GET`    | `/api/news/sports`               | Returns paginated sports articles.               |
| `GET`    | `/api/news/technology`           | Returns paginated technology articles.           |
| `GET`    | `/api/news/saved-articles`       | Saved articles endpoint.                         |
| `POST`   | `/api/news/save-article`         | Saves an article relationship for a user.        |
| `DELETE` | `/api/news/delete-saved-article` | Deletes a saved article relationship for a user. |

Most article list endpoints support pagination through the shared page query shape used by `newsHelper`, with `page` and `limit` values defaulting to page `1` and limit `25`.

## Database (Drizzle + PostgreSQL)

Database code lives in `app/server/src/database` and includes:

- Drizzle schemas in `schemas/`
- Migration files in `migrations/`
- Unified DB setup in `db.ts`
- Migration and seed scripts in `migrate.ts` and `seed.ts`

Drizzle Kit is configured in `drizzle.config.ts`. The configuration selects either `NEON_DATABASE_URL` or `LOCAL_DATABASE_URL` based on `USE_NEON`.

### Database Tables

- `Articles.ts` stores article records imported from NewsAPI, including source metadata, title, description, URL, image URL, publish date, content, and category.
- `SavedArticles.ts` stores user-saved article relationships between `Users` and `Articles`.
- `APICall.ts` tracks when NewsAPI was last called so the app can avoid unnecessary external requests.
- `Users.ts`, `Sessions.ts`, `UserThemes.ts`, and `UserProfileImages.ts` come from the reusable PERN foundation and support authentication, sessions, personalization, and profile image data.

### Common Database Tasks

1. **Generate migrations from schema changes:**

    ```sh
    npm run db:generate
    ```

2. **Run migrations:**

    ```sh
    npm run db:migrate
    ```

3. **Seed the database:**

    ```sh
    npm run db:seed
    ```

4. **Push schema changes directly to the database:**

    ```sh
    npm run db:push
    ```

5. **Open Drizzle Studio:**

    ```sh
    npm run db:studio
    ```

## Available Scripts

| Script                 | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `npm run clean:client` | Removes client build output and generated docs.              |
| `npm run build:client` | Builds the Vite client bundle.                               |
| `npm run dev:client`   | Runs the Vite dev server.                                    |
| `npm run clean:server` | Removes server build output, logs, and generated docs.       |
| `npm run build:server` | Builds the Express server with TypeScript and path aliases.  |
| `npm run start:server` | Starts the compiled Express server.                          |
| `npm run dev:server`   | Builds, watches, and restarts the server during development. |
| `npm run clean`        | Removes client/server build output, logs, and docs.          |
| `npm run build`        | Builds client and server for production.                     |
| `npm run start`        | Starts the production server with `APP_ENV=production`.      |
| `npm run dev`          | Runs server and client dev processes concurrently.           |
| `npm run db:generate`  | Builds the app and generates a Drizzle migration file.       |
| `npm run db:migrate`   | Runs database migrations.                                    |
| `npm run db:seed`      | Seeds the database.                                          |
| `npm run db:push`      | Pushes schema changes directly to the database.              |
| `npm run db:studio`    | Opens Drizzle Studio for database visualization.             |
| `npm run lint`         | Lints all `.ts` and `.tsx` files with ESLint.                |
| `npm run lint:fix`     | Runs the linter and auto-fixes issues.                       |
| `npm run format`       | Formats the codebase using Prettier.                         |
| `npm run test`         | Runs all unit tests once using Vitest.                       |
| `npm run test:watch`   | Runs Vitest in watch mode.                                   |
| `npm run docs`         | Builds the app and generates TypeDoc output in `docs/`.      |

## API Documentation

`openapi.json` contains the OpenAPI specification currently used by the project. It documents the foundation auth, user, and image endpoints. The news routes are implemented in Express, but the OpenAPI file has not yet been expanded to document those endpoints.

TypeDoc is configured in `typedoc.json` and can be generated with:

```sh
npm run docs
```

## Dependencies

Core runtime dependencies include:

- **express**: Web framework for the Node.js backend
- **react** and **react-dom**: Frontend UI rendering
- **vite**: Frontend build tooling through Rolldown Vite
- **drizzle-orm**, **drizzle-kit**, **pg**, and **@neondatabase/serverless**: PostgreSQL schema and database tooling
- **axios** and native `fetch`: HTTP client support
- **@reduxjs/toolkit** and **react-redux**: Client state management
- **react-router** and **react-router-dom**: Routing
- **zod** and **@hookform/resolvers**: Shared validation and form validation support
- **bcrypt** and **jose**: Password hashing and JWT/session support
- **cookie-parser**, **cors**, **multer**, and **swagger-ui-express**: Express middleware and API tooling
- **@aws-sdk/client-s3**: S3 upload support for profile images and log workflows
- **winston**: Structured logging
- **node-cron**: Scheduled background jobs
- **lucide-react**, **Radix UI**, **sonner**, **next-themes**, **tailwind-merge**, and Tailwind animation helpers: Frontend UI utilities

Development tooling includes TypeScript, ESLint, Prettier, Vitest, Supertest, TypeDoc, `tsx`, `tsc-alias`, and `tsconfig-paths`.

## Tooling

- TypeScript for shared server/client types
- ESLint and Prettier for code quality and formatting
- Vitest and Supertest for automated tests
- Vite for the React client and SSR build
- Drizzle Kit for PostgreSQL migrations and schema management
- OpenAPI via `openapi.json`
- TypeDoc via `typedoc.json`

## Contributing

Contributions are welcome. Please open an issue or submit a pull request if you have an improvement or bug fix.

## License

This project is open for personal and educational use. No specific license applies.
