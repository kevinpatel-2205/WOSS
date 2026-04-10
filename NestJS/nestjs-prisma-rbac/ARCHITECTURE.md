# 🏗️ Architecture Documentation

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Module Structure](#module-structure)
- [Layer Separation](#layer-separation)
- [Design Patterns](#design-patterns)
- [Data Flow](#data-flow)

---

## System Overview

This NestJS application implements a **modern three-tier architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│                    (HTTP Controllers)                    │
├─────────────────────────────────────────────────────────┤
│                     BUSINESS LAYER                       │
│                 (Services & Guards)                      │
├─────────────────────────────────────────────────────────┤
│                      DATA LAYER                          │
│              (Prisma ORM & PostgreSQL)                   │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | NestJS v11 | Application structure & DI |
| **Runtime** | Node.js v20+ | JavaScript runtime |
| **Language** | TypeScript v5.7 | Type safety |
| **ORM** | Prisma v5.22 | Database abstraction |
| **Database** | PostgreSQL 16 | Data persistence |
| **Authentication** | JWT (jsonwebtoken) | Stateless auth |
| **Authorization** | Custom RBAC Guards | Role-based access |
| **Validation** | class-validator | Input validation |
| **Password Security** | bcrypt | Password hashing |

---

## Architecture Diagram

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                            CLIENT                                 │
│                    (Web/Mobile/API Consumer)                      │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/HTTPS
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                        NESTJS APPLICATION                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │               MIDDLEWARE LAYER                              │  │
│  │  • ValidationPipe                                           │  │
│  │  • Global Error Handler                                     │  │
│  │  • Transform Interceptors                                   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                             │                                     │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                  CONTROLLERS                                │  │
│  │  ┌──────────────────┐     ┌──────────────────┐             │  │
│  │  │ AuthController   │     │ UsersController  │             │  │
│  │  │ - POST /register │     │ - GET /profile   │             │  │
│  │  │ - POST /login    │     │ - GET /users     │             │  │
│  │  └────────┬─────────┘     └────────┬─────────┘             │  │
│  └───────────┼──────────────────────────┼──────────────────────┘  │
│              │                          │                         │
│  ┌───────────┼──────────────────────────┼──────────────────────┐  │
│  │           │     GUARDS LAYER         │                      │  │
│  │           │  • JwtAuthGuard          │                      │  │
│  │           │  • RolesGuard            │                      │  │
│  │           │  • JWT Strategy          │                      │  │
│  └───────────┼──────────────────────────┼──────────────────────┘  │
│              ▼                          ▼                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    SERVICES                                 │  │
│  │  ┌──────────────────┐     ┌──────────────────┐             │  │
│  │  │  AuthService     │     │  UsersService    │             │  │
│  │  │  - register()    │     │  - findAll()     │             │  │
│  │  │  - login()       │     │  - findProfile() │             │  │
│  │  │  - validateUser()│     │  - deleteUser()  │             │  │
│  │  └────────┬─────────┘     └────────┬─────────┘             │  │
│  └───────────┼──────────────────────────┼──────────────────────┘  │
│              │                          │                         │
│              └──────────┬───────────────┘                         │
│                         ▼                                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              PRISMA SERVICE (Global)                        │  │
│  │                Database Access Layer                        │  │
│  └──────────────────────────┬─────────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │ SQL over TCP
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      POSTGRESQL DATABASE                          │
│                      (Docker Container)                           │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Tables:                                                    │  │
│  │  • User (id, name, email, password, role, ...)             │  │
│  │  • _prisma_migrations                                       │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Module Structure

### Dependency Graph

```
AppModule (Root)
│
├─ PrismaModule (@Global)
│  └─ PrismaService ──────────┐
│                              │
├─ AuthModule                  │
│  ├─ AuthController           │
│  ├─ AuthService ─────────────┤ (uses)
│  ├─ JwtModule                │
│  ├─ JwtStrategy              │
│  └─ PassportModule            │
│                              │
└─ UsersModule                 │
   ├─ UsersController          │
   └─ UsersService ─────────────┘ (uses)
```

### Module Details

#### **1. AppModule** (`src/app.module.ts`)
**Role:** Root application module  
**Responsibilities:**
- Imports all feature modules
- Configures global modules (Prisma)
- Sets up environment configuration
- Bootstrap providers

**Dependencies:**
```typescript
imports: [
  PrismaModule,    // Database access
  AuthModule,      // Authentication
  UsersModule,     // User management
]
```

---

#### **2. PrismaModule** (`src/prisma/prisma.module.ts`)
**Role:** Global database access layer  
**Responsibilities:**
- Provides PrismaService singleton
- Manages database connection lifecycle
- Handles graceful shutdown

**Annotations:**
```typescript
@Global()   // Makes PrismaService available everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
```

**PrismaService Features:**
- Extends `PrismaClient` for type-safe queries
- Implements `OnModuleInit` for connection
- Implements `OnModuleDestroy` for cleanup
- Connection pooling managed by Prisma

---

#### **3. AuthModule** (`src/auth/auth.module.ts`)
**Role:** Authentication & JWT management  
**Responsibilities:**
- User registration
- User login (credential validation)
- JWT token generation
- JWT strategy configuration

**Dependencies:**
```typescript
imports: [
  UsersModule,              // To access UsersService
  PassportModule,           // Passport integration
  JwtModule.registerAsync({ // JWT configuration
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
      },
    }),
  }),
]
```

**Exports:**
```typescript
exports: [AuthService, JwtStrategy]
```

**Components:**
- **AuthController:** HTTP endpoints for auth
- **AuthService:** Business logic (registration, login)
- **JwtStrategy:** Passport strategy for JWT validation
- **DTOs:** RegisterDto, LoginDto

---

#### **4. UsersModule** (`src/users/users.module.ts`)
**Role:** User data management  
**Responsibilities:**
- User profile retrieval
- User listing (admin-only)
- User deletion (admin-only)

**Dependencies:**
```typescript
imports: [] // Uses global PrismaModule
```

**Exports:**
```typescript
exports: [UsersService]
```

**Components:**
- **UsersController:** HTTP endpoints for users
- **UsersService:** Business logic for user operations

---

## Layer Separation

### 1. Presentation Layer (Controllers)

**Purpose:** Handle HTTP requests and responses  
**Responsibilities:**
- Route definition (`@Get`, `@Post`, etc.)
- Request validation (via DTOs)
- Response formatting
- Guard application (`@UseGuards`)

**Example:**
```typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.findProfile(req.user.id);
  }
}
```

**Rules:**
- ❌ No business logic in controllers
- ❌ No direct database access
- ✅ Delegate to services
- ✅ Apply guards at route level

---

### 2. Business Layer (Services)

**Purpose:** Implement business logic  
**Responsibilities:**
- Data validation and transformation
- Business rule enforcement
- Service orchestration
- Error handling

**Example:**
```typescript
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    // Business logic: check duplicates, hash password, create user
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({...});
  }
}
```

**Rules:**
- ❌ No HTTP-specific logic (req/res)
- ✅ Inject dependencies via constructor
- ✅ Throw domain-specific exceptions
- ✅ Return plain objects/models

---

### 3. Data Layer (Prisma)

**Purpose:** Database abstraction  
**Responsibilities:**
- Database connection management
- Query execution
- Schema migrations
- Type-safe queries

**Example:**
```typescript
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

**Rules:**
- ✅ Single source of truth for DB access
- ✅ Type-safe queries via Prisma Client
- ✅ Migrations managed via Prisma CLI
- ❌ No business logic in PrismaService

---

## Design Patterns

### 1. Dependency Injection (DI)

**Pattern:** Constructor-based injection  
**Benefit:** Loose coupling, testability, modularity

```typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,    // Injected
    private readonly jwtService: JwtService,    // Injected
  ) {}
}
```

**IoC Container:** NestJS manages lifecycle and resolution

---

### 2. Repository Pattern (via Prisma)

**Pattern:** Data access abstraction  
**Benefit:** Database-agnostic business logic

```typescript
// Instead of raw SQL:
// SELECT * FROM users WHERE id = ?;

// Use Prisma:
await this.prisma.user.findUnique({ where: { id } });
```

---

### 3. Guard Pattern (Authorization)

**Pattern:** Pre-execution validation  
**Benefit:** Reusable authorization logic

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Authorization logic here
    const requiredRoles = this.reflector.getAllAndOverride(...);
    return requiredRoles.includes(user.role);
  }
}
```

**Execution Order:**
1. Middleware
2. Guards (JwtAuthGuard → RolesGuard)
3. Interceptors (before)
4. Pipes (validation)
5. Controller method
6. Interceptors (after)

---

### 4. Strategy Pattern (JWT)

**Pattern:** Pluggable authentication strategy  
**Benefit:** Multiple auth methods support

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  async validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
```

**Passport supports:** JWT, OAuth, Local, SAML, etc.

---

### 5. DTO Pattern (Data Transfer Object)

**Pattern:** Validated input objects  
**Benefit:** Type safety, automatic validation

```typescript
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

**Validation:** Automatic via ValidationPipe

---

## Data Flow

### Request Lifecycle

```
1. CLIENT REQUEST
   └─ HTTP Request (JSON body, headers)
      │
      ▼
2. NESTJS CORE
   ├─ Parse HTTP request
   └─ Route to controller method
      │
      ▼
3. GUARDS (Authorization)
   ├─ JwtAuthGuard: Validate JWT token
   ├─ RolesGuard: Check user role
   └─ If failed → throw UnauthorizedException/ForbiddenException
      │
      ▼
4. PIPES (Validation & Transformation)
   ├─ ValidationPipe: Validate DTO
   ├─ class-validator decorators
   └─ If invalid → throw BadRequestException
      │
      ▼
5. CONTROLLER
   ├─ Extract request data (@Body, @Param, @Query)
   └─ Delegate to service
      │
      ▼
6. SERVICE (Business Logic)
   ├─ Validate business rules
   ├─ Transform data
   └─ Call Prisma for database operations
      │
      ▼
7. PRISMA SERVICE
   ├─ Execute type-safe query
   └─ Return database records
      │
      ▼
8. SERVICE (Response Preparation)
   ├─ Transform database records
   ├─ Strip sensitive data (passwords)
   └─ Return to controller
      │
      ▼
9. CONTROLLER (Response)
   ├─ Return service result
   └─ NestJS serializes to JSON
      │
      ▼
10. CLIENT RESPONSE
    └─ HTTP Response (JSON body, status code)
```

---

### Example Flow: Admin Deletes User

```
┌────────────────────────────────────────────────────────────────┐
│ 1. CLIENT REQUEST                                              │
│    DELETE /users/123e4567-e89b-12d3-a456-426614174000         │
│    Headers: { Authorization: "Bearer eyJhbGc..." }            │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│ 2. NESTJS ROUTING                                              │
│    UsersController.deleteUser(id: string)                     │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│ 3. GUARD EXECUTION                                             │
│    JwtAuthGuard:                                               │
│      - Extract token from header                               │
│      - Validate signature                                      │
│      - Check expiration                                        │
│      - Parse payload → { sub, email, role: "ADMIN" }          │
│      - Attach user to req.user                                 │
│                                                                 │
│    RolesGuard:                                                 │
│      - Read @Roles(Role.ADMIN) metadata                       │
│      - Compare req.user.role === "ADMIN"                      │
│      - If match → allow, else → 403 Forbidden                 │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│ 4. CONTROLLER METHOD                                           │
│    async deleteUser(@Param('id') id: string)                  │
│      └─ Call usersService.deleteUser(id)                      │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│ 5. SERVICE BUSINESS LOGIC                                      │
│    UsersService.deleteUser(id):                               │
│      - Validate: Check if user exists                         │
│      - Business rule: Can't delete self (future)              │
│      - Call prisma.user.delete({ where: { id } })            │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│ 6. DATABASE OPERATION                                          │
│    PrismaService → PostgreSQL                                  │
│      DELETE FROM "User" WHERE id = '123e4567...'              │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────────┐
│ 7. RESPONSE                                                    │
│    200 OK                                                      │
│    { message: "User deleted successfully" }                   │
└────────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

### Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    AUTHENTICATION                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  User Credentials (email + password)                    │
│           │                                              │
│           ▼                                              │
│  ┌─────────────────────┐                                │
│  │  AuthController     │                                │
│  │  POST /auth/login   │                                │
│  └──────────┬──────────┘                                │
│             │                                            │
│             ▼                                            │
│  ┌─────────────────────────────────────────┐            │
│  │         AuthService                     │            │
│  │  1. Find user by email                  │            │
│  │  2. Compare password hash (bcrypt)      │            │
│  │  3. Generate JWT (JwtService)           │            │
│  │     Payload: { sub, email, role }      │            │
│  │  4. Return access token                 │            │
│  └──────────┬──────────────────────────────┘            │
│             │                                            │
│             ▼                                            │
│  Client receives JWT token                              │
│  Store in memory/localStorage                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Authorization Flow

```
┌─────────────────────────────────────────────────────────┐
│                    AUTHORIZATION                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Protected Request + JWT Token                          │
│           │                                              │
│           ▼                                              │
│  ┌─────────────────────────────────┐                    │
│  │      JwtAuthGuard               │                    │
│  │  1. Extract token from header   │                    │
│  │  2. Validate signature          │                    │
│  │  3. Check expiration            │                    │
│  │  4. Parse payload               │                    │
│  │  5. Attach user to request      │                    │
│  └──────────┬──────────────────────┘                    │
│             │                                            │
│             ▼                                            │
│  ┌─────────────────────────────────┐                    │
│  │       RolesGuard                │                    │
│  │  1. Read @Roles() metadata      │                    │
│  │  2. Get user.role from request  │                    │
│  │  3. Compare with required roles │                    │
│  │  4. Allow/Deny access           │                    │
│  └──────────┬──────────────────────┘                    │
│             │                                            │
│             ▼                                            │
│  Controller method executes                             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Scalability Considerations

### Current Architecture Supports:

✅ **Horizontal Scaling:** Stateless JWT (no session storage)  
✅ **Module Isolation:** Independent feature modules  
✅ **Database Pooling:** Prisma manages connection pool  
✅ **Type Safety:** Full TypeScript + Prisma types  

### Future Enhancements:

🔄 **Caching Layer:** Redis for frequently accessed data  
🔄 **Rate Limiting:** Throttler module for API protection  
🔄 **Event-Driven:** CQRS pattern for complex operations  
🔄 **Microservices:** Split into auth-service, user-service  
🔄 **GraphQL:** Add GraphQL gateway for flexible queries  

---

## Testing Strategy

### Unit Tests
- **Services:** Mock PrismaService, test business logic
- **Guards:** Mock ExecutionContext, test authorization
- **DTOs:** Test validation rules

### Integration Tests
- **Controllers:** Test HTTP endpoints with TestingModule
- **Database:** Use test database with migrations

### E2E Tests
- **Full Flow:** Register → Login → Protected Route
- **Real Database:** Dockerized PostgreSQL for CI/CD

---

## Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────┐
│                    LOAD BALANCER                         │
│                   (Nginx/AWS ALB)                        │
└───────────────────┬─────────────────────────────────────┘
                    │
     ┌──────────────┼──────────────┐
     │              │               │
     ▼              ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│ NestJS  │   │ NestJS  │   │ NestJS  │
│ Instance│   │ Instance│   │ Instance│
│   #1    │   │   #2    │   │   #3    │
└────┬────┘   └────┬────┘   └────┬────┘
     │             │              │
     └─────────────┼──────────────┘
                   │
                   ▼
       ┌───────────────────────┐
       │   PostgreSQL Master   │
       │   (Connection Pool)   │
       └───────────────────────┘
```

---

## Conclusion

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Type safety across all layers
- ✅ Scalable and maintainable codebase
- ✅ Secure authentication and authorization
- ✅ Production-ready patterns

**Next Steps:**
- Review [API_REFERENCE.md](./API_REFERENCE.md) for endpoint details
- Review [SECURITY.md](./SECURITY.md) for security practices
- Review [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for local setup
