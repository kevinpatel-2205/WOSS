# ⚡ Quick Reference Guide

## Table of Contents
- [Common Commands](#common-commands)
- [API Endpoints Cheat Sheet](#api-endpoints-cheat-sheet)
- [Environment Variables](#environment-variables)
- [Database Commands](#database-commands)
- [Testing Commands](#testing-commands)
- [Troubleshooting Quick Fixes](#troubleshooting-quick-fixes)
- [Code Snippets](#code-snippets)

---

## Common Commands

### Project Setup

```bash
# Install dependencies
npm install

# Start PostgreSQL (Docker)
docker run --name pg-nest-rbac -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:16

# Run migrations
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Start development server
npm run start:dev
```

### Development Workflow

```bash
# Development mode (hot reload)
npm run start:dev

# Debug mode
npm run start:debug

# Production build
npm run build
npm run start:prod

# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm run test
npm run test:e2e
npm run test:cov
```

---

## API Endpoints Cheat Sheet

### Authentication

```bash
# Register
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}

# Login
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

# Response: { "access_token": "eyJhbGc...", "user": {...} }
```

### User Endpoints

```bash
# Get current user profile (requires JWT)
GET http://localhost:3000/users/profile
Authorization: Bearer <TOKEN>

# Get all users (ADMIN only)
GET http://localhost:3000/users
Authorization: Bearer <ADMIN_TOKEN>

# Delete user (ADMIN only)
DELETE http://localhost:3000/users/<USER_ID>
Authorization: Bearer <ADMIN_TOKEN>
```

### cURL Examples

```bash
# Save token to variable (Linux/Mac)
export TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  | jq -r '.access_token')

# Get profile
curl http://localhost:3000/users/profile \
  -H "Authorization: Bearer $TOKEN"

# Get all users
curl http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"
```

### PowerShell Examples

```powershell
# Login and save token
$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@example.com","password":"admin123"}'

$TOKEN = $response.access_token

# Get profile
Invoke-RestMethod -Uri "http://localhost:3000/users/profile" `
  -Headers @{ "Authorization" = "Bearer $TOKEN" }
```

---

## Environment Variables

### .env File

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"
JWT_EXPIRES_IN="1d"

# Application
PORT=3000
NODE_ENV="development"
```

### Generate Secure JWT Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Output example:
# 3f7a8b2c1d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
```

---

## Database Commands

### Prisma CLI

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio (GUI)
npx prisma studio

# Check migration status
npx prisma migrate status

# View database schema
npx prisma db pull
```

### Docker PostgreSQL

```bash
# Start container
docker start pg-nest-rbac

# Stop container
docker stop pg-nest-rbac

# View logs
docker logs pg-nest-rbac

# Execute psql
docker exec -it pg-nest-rbac psql -U postgres -d mydb

# Backup database
docker exec -t pg-nest-rbac pg_dump -U postgres mydb > backup.sql

# Restore database
docker exec -i pg-nest-rbac psql -U postgres mydb < backup.sql

# Remove container
docker rm -f pg-nest-rbac
```

### SQL Queries

```sql
-- View all users
SELECT id, name, email, role, "isActive" FROM "User";

-- Count users by role
SELECT role, COUNT(*) FROM "User" GROUP BY role;

-- Find user by email
SELECT * FROM "User" WHERE email = 'admin@example.com';

-- Update user role
UPDATE "User" SET role = 'ADMIN' WHERE email = 'user@example.com';

-- Delete user
DELETE FROM "User" WHERE email = 'user@example.com';
```

---

## Testing Commands

### Run Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e

# Specific test file
npm run test -- auth.service.spec.ts

# Debug tests
npm run test:debug
```

### Test Credentials

| Email | Password | Role | Status |
|-------|----------|------|--------|
| admin@example.com | admin123 | ADMIN | Active |
| john@example.com | user1234 | USER | Active |
| jane@example.com | user1234 | USER | Active |
| chris@example.com | user1234 | USER | Inactive |
| sara@example.com | user1234 | ADMIN | Active |

---

## Troubleshooting Quick Fixes

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or change port
echo "PORT=3001" >> .env
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker ps

# Restart container
docker restart pg-nest-rbac

# Test connection
npx prisma db pull

# Check DATABASE_URL in .env
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npx prisma generate

# Clean and reinstall
rm -rf node_modules
npm install
npx prisma generate
```

### TypeScript Errors

```bash
# Clean build
rm -rf dist
npm run build

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Migration Issues

```bash
# Reset and start fresh
npx prisma migrate reset

# Apply migrations manually
npx prisma migrate dev
```

---

## Code Snippets

### Add New Endpoint

```typescript
// src/users/users.controller.ts
@Get(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
async getUserById(@Param('id') id: string) {
  return this.usersService.findById(id);
}
```

### Create DTO

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

### Service Method

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

### Add Database Field

```prisma
// prisma/schema.prisma
model User {
  id          String    @id @default(uuid()) @db.Uuid
  name        String
  email       String    @unique
  password    String
  phoneNumber String?   // Add new field
  role        Role      @default(USER)
  isActive    Boolean   @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

```bash
# Create migration
npx prisma migrate dev --name add_phone_number
```

### Custom Guard

```typescript
// src/common/guards/owner.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceUserId = request.params.userId;

    if (user.id !== resourceUserId && user.role !== 'ADMIN') {
      throw new ForbiddenException('You can only access your own resources');
    }

    return true;
  }
}
```

### Custom Decorator

```typescript
// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage:
@Get('profile')
async getProfile(@CurrentUser() user: User) {
  return user;
}
```

### Error Handling

```typescript
// Custom exception filter
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      ...(typeof exceptionResponse === 'object' ? exceptionResponse : { message: exceptionResponse }),
    });
  }
}
```

---

## VS Code Settings

### Recommended Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  }
}
```

### Debug Configuration

```json
// .vscode/launch.json
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

---

## Git Workflow

### Common Git Commands

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "feat: add user profile update endpoint"

# Push
git push origin main

# Pull latest
git pull origin main

# Create branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature
```

### Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code formatting
refactor: Code refactoring
test: Add tests
chore: Update dependencies
```

---

## Helpful NPM Scripts

### Custom Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "db:reset": "npx prisma migrate reset",
    "db:seed": "npx prisma db seed",
    "db:studio": "npx prisma studio",
    "dev": "npm run start:dev",
    "clean": "rm -rf dist node_modules",
    "fresh": "npm run clean && npm install && npx prisma generate"
  }
}
```

---

## HTTP Status Codes Reference

| Code | Status | When to Use |
|------|--------|-------------|
| 200 | OK | Successful GET, PUT, PATCH, DELETE |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE (no response body) |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Valid auth but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation failed |
| 500 | Internal Server Error | Server error |

---

## Security Checklist

### Development
- [x] Passwords hashed with bcrypt
- [x] JWT authentication implemented
- [x] RBAC guards in place
- [x] Input validation with DTOs
- [x] Environment variables for secrets
- [ ] Rate limiting (recommended)
- [ ] CORS configuration (recommended)

### Production
- [ ] Strong JWT_SECRET (≥32 chars)
- [ ] HTTPS enabled
- [ ] Database SSL enabled
- [ ] Rate limiting active
- [ ] Helmet middleware added
- [ ] Monitoring enabled
- [ ] Error logging configured

---

## Quick Links

- **Documentation**: [README.md](./README.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Reference**: [API_REFERENCE.md](./API_REFERENCE.md)
- **Security**: [SECURITY.md](./SECURITY.md)
- **Development Guide**: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- **Project Explanation**: [PROJECT_EXPLANATION.md](./PROJECT_EXPLANATION.md)

---

## External Resources

- [NestJS Docs](https://docs.nestjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JWT.io](https://jwt.io/) - JWT Debugger

---

**Need help? Check the documentation or open an issue!**
