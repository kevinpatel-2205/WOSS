# NestJS Prisma RBAC API

A complete NestJS backend API with PostgreSQL database, Prisma ORM, JWT authentication, and Role-Based Access Control (RBAC) system.

## 🚀 Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - ADMIN and USER roles
- ✅ **Prisma ORM** - Type-safe database access with migrations
- ✅ **PostgreSQL Database** - Robust relational database
- ✅ **Password Hashing** - Bcrypt encryption for security
- ✅ **Data Validation** - class-validator & class-transformer
- ✅ **Docker Support** - Easy PostgreSQL setup with Docker
- ✅ **Database Seeding** - Pre-configured test users

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Database Configuration](#-database-configuration)
- [Running Migrations](#-running-migrations)
- [Seeding the Database](#-seeding-the-database)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Troubleshooting](#-troubleshooting)

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **NestJS** | Backend framework |
| **Prisma ORM** | Database ORM with type safety |
| **PostgreSQL** | Relational database |
| **JWT (Passport)** | Authentication strategy |
| **bcrypt** | Password hashing |
| **class-validator** | Request validation |
| **class-transformer** | Object transformation |
| **Docker** | PostgreSQL containerization |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **npm** (v10 or higher) - Comes with Node.js
- **Docker** (for PostgreSQL) - [Download](https://www.docker.com/)
- **Git** (optional) - [Download](https://git-scm.com/)

Check your installations:

```bash
node --version
npm --version
docker --version
```

## 📁 Project Structure

```text
nestjs-prisma-rbac/
├── prisma/
│   ├── migrations/              # Database migration files
│   ├── schema.prisma           # Prisma schema definition
│   └── seed.ts                 # Database seed script
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── jwt.strategy.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── interfaces/
│   │       └── authenticated-request.interface.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
├── test/                       # E2E tests
├── .env                        # Environment variables
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Installation & Setup

### Step 1: Clone or Navigate to Project

```bash
cd nestjs-prisma-rbac
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- NestJS core packages
- Prisma client and CLI
- Authentication packages (JWT, Passport, bcrypt)
- Validation packages (class-validator, class-transformer)

## 🗄 Database Configuration

### Option 1: Using Docker (Recommended)

#### Start PostgreSQL Container

Run this command to start a PostgreSQL database in Docker:

```bash
docker run --name pg-nest-rbac -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:16
```

**Breakdown of the command:**
- `--name pg-nest-rbac` - Container name
- `-e POSTGRES_USER=postgres` - Database username
- `-e POSTGRES_PASSWORD=postgres` - Database password
- `-e POSTGRES_DB=mydb` - Database name
- `-p 5432:5432` - Port mapping (host:container)
- `-d postgres:16` - PostgreSQL version 16

#### Verify Container is Running

```bash
docker ps
```

You should see `pg-nest-rbac` in the list.

#### Stop/Start Container (when needed)

```bash
# Stop the container
docker stop pg-nest-rbac

# Start the container again
docker start pg-nest-rbac

# Remove the container
docker rm -f pg-nest-rbac
```

### Option 2: Using Existing PostgreSQL

If you already have PostgreSQL installed locally or remotely, just update the `.env` file with your credentials.

### Step 3: Configure Environment Variables

Create or update the `.env` file in the project root:

```env
# Database connection string
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"

# JWT Configuration
JWT_SECRET="your_super_secret_jwt_key_here_change_in_production"
JWT_EXPIRES_IN="1d"

# Application Port
PORT=3000
```

**Important:** 
- Replace `JWT_SECRET` with a strong random string in production
- Adjust `DATABASE_URL` if using different credentials
- Generate a secure secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## 🔄 Running Migrations

Migrations create and update your database schema based on the Prisma schema file.

### Understanding the Prisma Schema

The `prisma/schema.prisma` file defines:

**Role Enum:**
```prisma
enum Role {
  ADMIN
  USER
}
```

**User Model:**
```prisma
model User {
  id          String    @id @default(uuid()) @db.Uuid
  name        String
  email       String    @unique
  password    String
  role        Role      @default(USER)
  isActive    Boolean   @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Run Migration Commands

#### 1. Create and Apply Migration

This creates migration files and applies them to the database:

```bash
npx prisma migrate dev
```

**What happens:**
1. Prisma reads `schema.prisma`
2. Creates SQL migration files in `prisma/migrations/`
3. Applies migrations to the database
4. Generates Prisma Client

**You'll be prompted to name your migration.** Example: `init` or `create_user_table`

#### Alternative (if npx fails on Windows):

```bash
./node_modules/.bin/prisma.cmd migrate dev
```

Or using npm script:

```bash
npm run prisma:migrate
```

#### 2. Generate Prisma Client

If you need to regenerate the Prisma Client separately:

```bash
npx prisma generate
```

Or:

```bash
npm run prisma:generate
```

#### 3. View Migration Status

Check which migrations have been applied:

```bash
npx prisma migrate status
```

#### 4. Reset Database (⚠️ Caution: Deletes all data)

To reset the database and reapply all migrations:

```bash
npx prisma migrate reset
```

This will:
1. Drop the database
2. Create a new database
3. Apply all migrations
4. Run seed script (if configured)

### Common Migration Scenarios

**Scenario 1: First-time setup**
```bash
npx prisma migrate dev --name init
```

**Scenario 2: Schema changed, create new migration**
```bash
npx prisma migrate dev --name add_new_field
```

**Scenario 3: Production deployment**
```bash
npx prisma migrate deploy
```

## 🌱 Seeding the Database

Seeding populates your database with initial test data.

### What Gets Seeded

The `prisma/seed.ts` file creates **5 test users**:

| Name | Email | Password | Role | Active |
|------|-------|----------|------|--------|
| System Admin | admin@example.com | admin123 | ADMIN | ✅ |
| John User | john@example.com | user1234 | USER | ✅ |
| Jane User | jane@example.com | user1234 | USER | ✅ |
| Chris Viewer | chris@example.com | user1234 | USER | ❌ (inactive) |
| Sara Manager | sara@example.com | user1234 | ADMIN | ✅ |

### Run Seed Command

```bash
npx prisma db seed
```

Or using npm script:

```bash
npm run prisma:seed
```

### Seed Script Details

The seed script (`prisma/seed.ts`):
1. Hashes all passwords using bcrypt (10 rounds)
2. Uses `upsert` to avoid duplicates (can run multiple times safely)
3. Sets realistic `lastLoginAt` timestamps
4. Includes one inactive user for testing

### Re-seed After Reset

```bash
# Reset database and auto-run seed
npx prisma migrate reset

# Or manually
npx prisma migrate reset --skip-seed
npx prisma db seed
```

### Custom Seeding

To modify seed data, edit `prisma/seed.ts` and add your own users or data.

## 🚀 Running the Application

### Development Mode (with hot reload)

```bash
npm run start:dev
```

The server will start at `http://localhost:3000`

### Debug Mode

```bash
npm run start:debug
```

Runs with debugging enabled on port 9229.

### Production Mode

```bash
# Build the application
npm run build

# Run production build
npm run start:prod
```

### Verify Server is Running

Open your browser or use curl:

```bash
curl http://localhost:3000
```

You should see a response from the app.

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

### 📌 Authentication Endpoints

#### Register New User

**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "Kevin Smith",
  "email": "kevin@example.com",
  "password": "secret123"
}
```

**Response (201):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Kevin Smith",
  "email": "kevin@example.com",
  "role": "USER",
  "isActive": true,
  "createdAt": "2026-04-08T05:15:31.949Z",
  "updatedAt": "2026-04-08T05:15:31.949Z"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Kevin Smith","email":"kevin@example.com","password":"secret123"}'
```

#### Login

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "admin@example.com",
    "name": "System Admin",
    "role": "ADMIN"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### 📌 User Endpoints (Protected)

#### Get Current User Profile

**GET** `/users/profile`

**Headers:**
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

**Response (200):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "admin@example.com",
  "name": "System Admin",
  "role": "ADMIN",
  "isActive": true,
  "lastLoginAt": "2026-04-08T05:15:31.949Z",
  "createdAt": "2026-04-08T05:15:31.949Z",
  "updatedAt": "2026-04-08T05:15:31.949Z"
}
```

**cURL:**
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 📌 Admin Endpoints (ADMIN Role Required)

#### Get All Users

**GET** `/users`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

**Response (200):**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "admin@example.com",
    "name": "System Admin",
    "role": "ADMIN",
    "isActive": true
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "email": "john@example.com",
    "name": "John User",
    "role": "USER",
    "isActive": true
  }
]
```

**cURL:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE"
```

#### Delete User

**DELETE** `/users/:id`

**Headers:**
```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN_HERE"
```

## 🔐 Authentication Flow

### Registration Flow

1. Client sends POST request to `/auth/register` with user details
2. Server validates input using `class-validator`
3. Password is hashed with bcrypt (10 rounds)
4. User is created in database with default `USER` role
5. User object is returned (without password)

### Login Flow

1. Client sends POST request to `/auth/login` with email/password
2. Server validates credentials:
   - Checks if user exists
   - Compares password hash using bcrypt
   - Verifies user is active
3. JWT token is generated containing user ID and role
4. Token and user info are returned to client
5. `lastLoginAt` timestamp is updated in database

### Protected Route Flow

1. Client sends request with JWT in `Authorization: Bearer <token>` header
2. `JwtAuthGuard` validates the token:
   - Verifies token signature
   - Checks expiration
   - Extracts user payload
3. User object is attached to request
4. Request proceeds to controller

### Role-Based Access Flow

1. Protected route has `@Roles(Role.ADMIN)` decorator
2. `JwtAuthGuard` runs first (validates JWT)
3. `RolesGuard` runs second:
   - Reads required roles from metadata
   - Compares with user's role from JWT payload
   - Allows or denies access
4. If authorized, request proceeds

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Run Tests with Coverage

```bash
npm run test:cov
```

## 🛠 Troubleshooting

### Common Issues

#### Issue: Port 3000 already in use

**Solution:**
```bash
# Change PORT in .env file
PORT=3001
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

#### Issue: Database connection failed

**Solutions:**

1. Verify PostgreSQL is running:
```bash
docker ps
```

2. Check database credentials in `.env`

3. Test connection:
```bash
npx prisma db pull
```

4. Restart PostgreSQL container:
```bash
docker restart pg-nest-rbac
```

#### Issue: Prisma Client not generated

**Solution:**
```bash
npx prisma generate
```

#### Issue: Migration failed

**Solution:**
```bash
# Reset and start fresh
npx prisma migrate reset

# Or manually fix and retry
npx prisma migrate dev
```

#### Issue: PowerShell execution policy error

**Solution:**
```bash
# Use full path instead of npx
./node_modules/.bin/prisma.cmd migrate dev
./node_modules/.bin/prisma.cmd db seed
```

Or change execution policy (admin PowerShell):
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📝 Quick Start Commands Summary

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL (Docker)
docker run --name pg-nest-rbac -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:16

# 3. Configure .env file
# Edit .env with your DATABASE_URL and JWT_SECRET

# 4. Run migrations
npx prisma migrate dev --name init

# 5. Generate Prisma Client
npx prisma generate

# 6. Seed database
npx prisma db seed

# 7. Start application
npm run start:dev
```

## 📚 Additional Documentation

This project includes comprehensive documentation:

### 📖 Core Documentation
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation navigation guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture, design patterns, and data flow
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation with examples
- **[SECURITY.md](./SECURITY.md)** - Security best practices and guidelines
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Development workflow and best practices
- **[PROJECT_EXPLANATION.md](./PROJECT_EXPLANATION.md)** - Detailed concepts and learning guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Command cheat sheet and quick lookups

### 🎯 Quick Links by Need
- **Just getting started?** → You're reading it! (README.md)
- **Want to understand the system?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Using the API?** → [API_REFERENCE.md](./API_REFERENCE.md)
- **Need commands?** → [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Learning concepts?** → [PROJECT_EXPLANATION.md](./PROJECT_EXPLANATION.md)
- **Building features?** → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- **Security review?** → [SECURITY.md](./SECURITY.md)

### 🌐 External Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/) - JWT Debugger

## 📄 License

UNLICENSED - Private Project

## 👤 Author

Your Name / Team Name

---

**Happy Coding! 🚀**

*Check [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) for complete documentation navigation.*
