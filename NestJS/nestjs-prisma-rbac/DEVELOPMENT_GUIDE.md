# 💻 Development Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
- [Database Management](#database-management)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Purpose |
|----------|----------------|-------------|---------|
| **Node.js** | 20.x | 20.x LTS | JavaScript runtime |
| **npm** | 10.x | Latest | Package manager |
| **PostgreSQL** | 14.x | 16.x | Database |
| **Docker** | 20.x | Latest | PostgreSQL containerization |
| **Git** | 2.x | Latest | Version control |

### Installation Verification

```bash
# Check versions
node --version    # Should show v20.x.x
npm --version     # Should show v10.x.x
docker --version  # Should show Docker version 20.x.x
git --version     # Should show git version 2.x.x
```

### Recommended Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| **VS Code** | Code editor | [Download](https://code.visualstudio.com/) |
| **Postman** | API testing | [Download](https://www.postman.com/) |
| **DBeaver** | Database GUI | [Download](https://dbeaver.io/) |
| **Prisma Studio** | Prisma GUI (built-in) | `npx prisma studio` |

### VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "firsttris.vscode-jest-runner"
  ]
}
```

Install all:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension prisma.prisma
```

---

## Initial Setup

### Step 1: Project Setup

```bash
# Navigate to project directory
cd nestjs-prisma-rbac

# Install dependencies
npm install
```

**What gets installed:**
- NestJS core packages (@nestjs/*)
- Prisma ORM (@prisma/client, prisma)
- Authentication (passport, passport-jwt, @nestjs/jwt, bcrypt)
- Validation (class-validator, class-transformer)
- Development tools (TypeScript, ESLint, Prettier, Jest)

### Step 2: Database Setup

#### Option A: Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name pg-nest-rbac \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres:16

# Verify container is running
docker ps
```

**Container Management:**
```bash
# Stop container
docker stop pg-nest-rbac

# Start existing container
docker start pg-nest-rbac

# View logs
docker logs pg-nest-rbac

# Connect to PostgreSQL
docker exec -it pg-nest-rbac psql -U postgres -d mydb

# Remove container (data will be lost!)
docker rm -f pg-nest-rbac
```

#### Option B: Local PostgreSQL Installation

**Windows:**
1. Download from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
2. Run installer, set password
3. Use pgAdmin or command line

**macOS:**
```bash
# Using Homebrew
brew install postgresql@16
brew services start postgresql@16
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 3: Environment Configuration

Create `.env` file in project root:

```env
# Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"
JWT_EXPIRES_IN="1d"

# Application
PORT=3000
NODE_ENV="development"
```

**Generate Secure JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Database Migrations

```bash
# Run migrations (creates database schema)
npx prisma migrate dev --name init

# Alternative (Windows PowerShell issues)
./node_modules/.bin/prisma.cmd migrate dev --name init

# Or using npm script
npm run prisma:migrate
```

**What happens:**
1. Prisma reads `prisma/schema.prisma`
2. Generates SQL migration files in `prisma/migrations/`
3. Applies migrations to database
4. Generates Prisma Client

### Step 5: Seed Database

```bash
# Seed test users
npx prisma db seed

# Or using npm script
npm run prisma:seed
```

**Seeded Users:**
| Email | Password | Role | Status |
|-------|----------|------|--------|
| admin@example.com | admin123 | ADMIN | Active |
| john@example.com | user1234 | USER | Active |
| jane@example.com | user1234 | USER | Active |
| chris@example.com | user1234 | USER | Inactive |
| sara@example.com | user1234 | ADMIN | Active |

### Step 6: Verify Setup

```bash
# Start development server
npm run start:dev

# Should see:
# [Nest] 12345  - Application is running on: http://[::1]:3000
```

**Test API:**
```bash
# Health check
curl http://localhost:3000

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## Development Workflow

### Starting Development Server

```bash
# Development mode (hot reload)
npm run start:dev

# Debug mode (debugger on port 9229)
npm run start:debug

# Production build
npm run build
npm run start:prod
```

### File Structure for Development

```
src/
├── main.ts                          # Bootstrap application
├── app.module.ts                    # Root module
│
├── auth/                            # Authentication feature
│   ├── dto/                         # Data Transfer Objects
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── auth.controller.ts           # HTTP endpoints
│   ├── auth.service.ts              # Business logic
│   ├── auth.module.ts               # Module config
│   └── jwt.strategy.ts              # JWT validation
│
├── users/                           # User management feature
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
│
├── prisma/                          # Database access
│   ├── prisma.service.ts
│   └── prisma.module.ts
│
└── common/                          # Shared utilities
    ├── decorators/
    │   └── roles.decorator.ts
    ├── guards/
    │   ├── jwt-auth.guard.ts
    │   └── roles.guard.ts
    └── interfaces/
        └── authenticated-request.interface.ts
```

### Making Changes

#### 1. Adding a New Endpoint

**Example: Get User by ID (Admin only)**

```typescript
// src/users/users.controller.ts
@Get(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
async getUserById(@Param('id') id: string) {
  return this.usersService.findById(id);
}
```

```typescript
// src/users/users.service.ts
async findById(id: string) {
  const user = await this.prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user;
}
```

#### 2. Adding a New DTO

**Example: Update User DTO**

```typescript
// src/users/dto/update-user.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
```

#### 3. Database Schema Changes

**Example: Add `phoneNumber` field**

```prisma
// prisma/schema.prisma
model User {
  id          String    @id @default(uuid()) @db.Uuid
  name        String
  email       String    @unique
  password    String
  phoneNumber String?   // Add nullable phone number
  role        Role      @default(USER)
  isActive    Boolean   @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Create Migration:**
```bash
npx prisma migrate dev --name add_phone_number
```

**What happens:**
1. Prisma detects schema change
2. Generates migration SQL
3. Applies migration to database
4. Regenerates Prisma Client

---

## Database Management

### Prisma CLI Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name migration_name

# Apply pending migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

### Prisma Studio

```bash
# Launch Prisma Studio (GUI)
npx prisma studio

# Opens browser at http://localhost:5555
```

**Features:**
- Browse all tables
- Edit records visually
- Filter and search
- Create/delete records

### Common Database Tasks

#### View All Users

```bash
# Using psql
docker exec -it pg-nest-rbac psql -U postgres -d mydb

mydb=# SELECT id, name, email, role FROM "User";
mydb=# \q  # Exit
```

#### Reset and Reseed

```bash
# Complete reset
npx prisma migrate reset

# Manual steps
npx prisma migrate reset --skip-seed
npx prisma db seed
```

#### Backup Database

```bash
# Export to SQL file
docker exec -t pg-nest-rbac pg_dump -U postgres mydb > backup.sql

# Restore from SQL file
docker exec -i pg-nest-rbac psql -U postgres mydb < backup.sql
```

---

## Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run specific test file
npm run test -- auth.service.spec.ts
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e
```

### Writing Tests

**Example: Service Unit Test**

```typescript
// src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by id', async () => {
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'USER',
    };

    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findById('123');
    expect(result).toEqual(mockUser);
  });
});
```

---

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npx prettier --check "src/**/*.ts"
```

### Pre-commit Hooks (Recommended)

```bash
# Install husky
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install
```

**package.json:**
```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Debugging

### VS Code Debug Configuration

**.vscode/launch.json:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "skipFiles": ["<node_internals>/**"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Debugging Tips

**1. Add Breakpoints:**
- Click left of line number in VS Code
- Run debug configuration (F5)

**2. Console Logging:**
```typescript
console.log('Debug info:', variable);
this.logger.log('Service method called');
```

**3. Chrome DevTools:**
```bash
npm run start:debug
# Open chrome://inspect in Chrome
# Click "inspect" under Remote Target
```

---

## Common Tasks

### Add a New Module

```bash
# Generate module with CLI
npx nest generate module posts
npx nest generate controller posts
npx nest generate service posts

# Manually create files
mkdir src/posts
touch src/posts/posts.module.ts
touch src/posts/posts.controller.ts
touch src/posts/posts.service.ts
```

### Add a New Guard

```bash
npx nest generate guard common/guards/api-key
```

### Add a New Interceptor

```bash
npx nest generate interceptor common/interceptors/logging
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update @nestjs/core

# Update all dependencies (be careful!)
npm update

# Update to latest versions
npx npm-check-updates -u
npm install
```

---

## Troubleshooting

### Common Issues

#### Port 3000 Already in Use

**Solution:**
```bash
# Find process using port
netstat -ano | findstr :3000   # Windows
lsof -ti:3000                  # Mac/Linux

# Kill process
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # Mac/Linux

# Or change port in .env
PORT=3001
```

#### Database Connection Failed

**Solutions:**
1. Check PostgreSQL is running:
   ```bash
   docker ps
   ```
2. Verify DATABASE_URL in `.env`
3. Test connection:
   ```bash
   npx prisma db pull
   ```

#### Prisma Client Not Generated

**Solution:**
```bash
npx prisma generate
```

#### Migration Failed

**Solution:**
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
```

#### TypeScript Errors

**Solution:**
```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

---

## Best Practices

### Code Organization

✅ **DO:**
- Keep controllers thin (delegate to services)
- Use DTOs for all input validation
- Implement proper error handling
- Write tests for business logic
- Use environment variables for config

❌ **DON'T:**
- Put business logic in controllers
- Access database directly from controllers
- Commit `.env` file
- Store secrets in code
- Skip input validation

### Security

✅ **DO:**
- Hash passwords with bcrypt
- Validate all inputs with DTOs
- Use JWT for authentication
- Implement RBAC with guards
- Sanitize user inputs

❌ **DON'T:**
- Store plaintext passwords
- Trust user input
- Skip authorization checks
- Expose sensitive data in responses
- Use weak JWT secrets

### Performance

✅ **DO:**
- Use select to limit fields
- Implement pagination for large datasets
- Use database indexes
- Cache frequent queries (future)
- Monitor query performance

❌ **DON'T:**
- Fetch all fields when not needed
- Return large datasets without pagination
- Make unnecessary database calls
- Block event loop with CPU-intensive tasks

---

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

---

## Need Help?

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Check [API_REFERENCE.md](./API_REFERENCE.md) for API details
- Check [SECURITY.md](./SECURITY.md) for security practices
- Open an issue on GitHub
- Contact the development team

---

**Happy Coding! 🚀**
