# 🔒 Security Documentation

## Table of Contents
- [Security Overview](#security-overview)
- [Authentication Security](#authentication-security)
- [Authorization Security](#authorization-security)
- [Password Security](#password-security)
- [JWT Token Security](#jwt-token-security)
- [Input Validation](#input-validation)
- [Database Security](#database-security)
- [Environment Variables](#environment-variables)
- [API Security Best Practices](#api-security-best-practices)
- [Common Vulnerabilities](#common-vulnerabilities)
- [Security Checklist](#security-checklist)

---

## Security Overview

This application implements **defense-in-depth** security with multiple layers:

```
┌─────────────────────────────────────────────────────────┐
│         Layer 1: Input Validation (DTOs)                │
├─────────────────────────────────────────────────────────┤
│         Layer 2: Authentication (JWT)                   │
├─────────────────────────────────────────────────────────┤
│         Layer 3: Authorization (RBAC Guards)            │
├─────────────────────────────────────────────────────────┤
│         Layer 4: Business Logic Validation              │
├─────────────────────────────────────────────────────────┤
│         Layer 5: Database Constraints                   │
└─────────────────────────────────────────────────────────┘
```

### Security Principles Applied

✅ **Principle of Least Privilege:** Users have minimum permissions needed  
✅ **Defense in Depth:** Multiple security layers  
✅ **Fail Securely:** Errors don't expose sensitive info  
✅ **Secure by Default:** USER role assigned by default  
✅ **Separation of Duties:** Authentication ≠ Authorization  

---

## Authentication Security

### JWT (JSON Web Token) Implementation

**Algorithm:** HS256 (HMAC with SHA-256)  
**Token Location:** `Authorization: Bearer <token>` header  
**Token Lifetime:** 1 day (configurable)

#### Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "role": "USER",
    "iat": 1712559331,
    "exp": 1712645731
  },
  "signature": "..."
}
```

#### Security Features

| Feature | Implementation | Protection Against |
|---------|----------------|---------------------|
| **Signature Verification** | HMAC-SHA256 with secret | Token tampering |
| **Expiration** | `exp` claim (1 day) | Token replay attacks |
| **Issued At** | `iat` claim | Future-dated tokens |
| **Subject** | `sub` claim (user ID) | User impersonation |
| **Role Inclusion** | `role` claim | Authorization bypass |

#### Token Validation Flow

```typescript
// src/auth/jwt.strategy.ts
async validate(payload: JwtPayload) {
  // 1. Signature verified by Passport automatically
  // 2. Expiration checked by Passport automatically
  // 3. Payload structure validated
  if (!payload.sub || !payload.email || !payload.role) {
    throw new UnauthorizedException('Invalid token payload');
  }
  
  // 4. Return user object (attached to req.user)
  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  };
}
```

#### Security Considerations

**✅ DO:**
- Store tokens in memory or secure storage (HttpOnly cookies)
- Use HTTPS in production
- Implement token refresh mechanism for long sessions
- Revoke tokens on logout (requires token blacklist)

**❌ DON'T:**
- Store tokens in localStorage (XSS vulnerability)
- Share tokens between users
- Use tokens without HTTPS
- Store sensitive data in JWT payload

---

### Login Security

#### Credential Validation

```typescript
// src/auth/auth.service.ts
async login(dto: LoginDto) {
  // 1. Find user by email
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email.toLowerCase().trim() },
  });
  
  // 2. Generic error message (no user enumeration)
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }
  
  // 3. Constant-time password comparison
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  
  // 4. Same generic error (no timing attacks)
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid email or password');
  }
  
  // 5. Check account status (future enhancement)
  if (!user.isActive) {
    throw new UnauthorizedException('Account is disabled');
  }
  
  // 6. Generate token
  const token = await this.jwtService.signAsync({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
  
  return { access_token: token, user: this.stripPassword(user) };
}
```

#### Protection Against Attacks

| Attack Type | Protection Mechanism |
|-------------|----------------------|
| **Brute Force** | Consider rate limiting (future) |
| **User Enumeration** | Generic error messages |
| **Timing Attacks** | Constant-time password comparison |
| **Credential Stuffing** | Email normalization (lowercase) |
| **SQL Injection** | Prisma parameterized queries |

---

## Authorization Security

### Role-Based Access Control (RBAC)

#### Role Hierarchy

```
ADMIN
  ├─ All USER permissions
  ├─ View all users
  ├─ Delete users
  └─ (Future: Manage roles, audit logs)

USER
  ├─ View own profile
  └─ Update own profile (future)
```

#### Guard Execution Order

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get()
async getAllUsers() { ... }
```

**Execution Flow:**
1. **JwtAuthGuard**: Validates JWT token exists and is valid
2. **RolesGuard**: Checks if user's role matches required roles
3. If both pass → Execute controller method
4. If either fails → Throw exception (401 or 403)

#### RolesGuard Implementation

```typescript
// src/common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get required roles from @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    // 2. If no roles specified → allow access
    if (!requiredRoles) {
      return true;
    }
    
    // 3. Get user from request (set by JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();
    
    // 4. Check if user's role is in required roles
    const hasRole = requiredRoles.includes(user.role);
    
    // 5. Throw Forbidden if no match
    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }
    
    return true;
  }
}
```

#### Security Features

✅ **Metadata-Driven:** Roles defined at route level  
✅ **Type-Safe:** Role enum prevents typos  
✅ **Fail-Secure:** Missing token → 401, wrong role → 403  
✅ **Explicit Permissions:** Each protected route declares required roles  

---

## Password Security

### Password Hashing with bcrypt

**Algorithm:** bcrypt  
**Salt Rounds:** 10 (2^10 = 1,024 iterations)  
**Hash Length:** 60 characters  

#### Registration Flow

```typescript
// src/auth/auth.service.ts
async register(dto: RegisterDto) {
  // 1. Validate password meets requirements (≥6 chars)
  // Handled by class-validator in DTO
  
  // 2. Generate salt and hash password
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  // ~100ms computation time (CPU-intensive by design)
  
  // 3. Store hashed password in database
  const user = await this.prisma.user.create({
    data: {
      name: dto.name,
      email: dto.email.toLowerCase().trim(),
      password: hashedPassword,  // Never store plaintext!
      role: Role.USER,           // Default to USER
    },
  });
  
  return this.stripPassword(user);
}
```

#### Password Validation

```typescript
// Login: Compare plaintext with hash
const isValid = await bcrypt.compare(plaintextPassword, hashedPassword);

// ✅ Constant-time comparison (prevents timing attacks)
// ✅ Automatic salt extraction from hash
// ✅ CPU-intensive (slows down brute force)
```

#### Security Properties

| Property | Value | Benefit |
|----------|-------|---------|
| **Salt Rounds** | 10 | ~100ms per hash (slows brute force) |
| **Unique Salt** | Per password | Prevents rainbow table attacks |
| **One-Way Function** | Cannot reverse | Database breach doesn't expose passwords |
| **Adaptive** | Can increase rounds | Future-proof against faster hardware |

#### Password Policy

**Current Requirements:**
- Minimum 6 characters
- No maximum length (bcrypt truncates at 72 bytes)

**Recommended Enhancements:**
```typescript
// Future: Add stronger validation
@IsString()
@MinLength(8)
@MaxLength(128)
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
  message: 'Password must contain uppercase, lowercase, number, and special char',
})
password: string;
```

#### Password Masking

```typescript
// src/auth/auth.service.ts
private stripPassword(user: User): Partial<User> {
  const { password, ...result } = user;
  return result;
}

// ✅ Password NEVER sent in API responses
// ✅ Even in error scenarios
```

---

## JWT Token Security

### Token Generation

```typescript
// src/auth/auth.service.ts
const payload: JwtPayload = {
  sub: user.id,          // Subject: User ID
  email: user.email,     // Email (for convenience)
  role: user.role,       // Role (for authorization)
};

const token = await this.jwtService.signAsync(payload, {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
});
```

### Secret Key Management

**Environment Variable:** `JWT_SECRET`  
**Minimum Length:** 32 characters  
**Recommended:** 256-bit random string

**Generate Secure Secret:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Output example:
# 3f7a8b2c1d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0
```

**⚠️ CRITICAL:** Never commit `JWT_SECRET` to version control!

### Token Expiration

**Default:** 1 day (`1d`)  
**Configurable:** Via `JWT_EXPIRES_IN` env variable

**Valid Formats:**
- `60s` - 60 seconds
- `5m` - 5 minutes
- `1h` - 1 hour
- `1d` - 1 day
- `7d` - 7 days

**Recommendation:**
- **Short-lived tokens:** 15 minutes (more secure)
- **Refresh tokens:** 30 days (implement separately)

### Token Refresh (Future Enhancement)

```typescript
// Future implementation
POST /auth/refresh
{
  "refresh_token": "long-lived-refresh-token"
}

// Response:
{
  "access_token": "new-short-lived-token"
}
```

### Token Revocation (Future Enhancement)

**Option 1: Token Blacklist (Redis)**
```typescript
// Store revoked tokens in Redis with TTL
await redis.setex(`blacklist:${tokenId}`, tokenTTL, 'revoked');

// Check on validation
const isRevoked = await redis.exists(`blacklist:${tokenId}`);
```

**Option 2: Database Tracking**
```prisma
model Token {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  revoked   Boolean  @default(false)
}
```

---

## Input Validation

### DTO Validation with class-validator

#### Registration DTO

```typescript
// src/auth/dto/register.dto.ts
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(128)
  password: string;
}
```

#### Validation Pipe Configuration

```typescript
// src/main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,              // Strip unknown properties
    forbidNonWhitelisted: true,   // Throw error on unknown properties
    transform: true,              // Transform to DTO instances
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

#### Security Benefits

| Feature | Protection Against |
|---------|-------------------|
| **whitelist** | Mass assignment attacks |
| **forbidNonWhitelisted** | Property injection |
| **@IsEmail()** | Email format attacks |
| **@MinLength()** | Weak passwords |
| **@Transform()** | Case-sensitivity issues |
| **Type validation** | Type confusion attacks |

### Sanitization

**Email Normalization:**
```typescript
@Transform(({ value }) => value.toLowerCase().trim())
email: string;

// Prevents:
// - "USER@EXAMPLE.COM" vs "user@example.com" duplicates
// - Leading/trailing whitespace issues
```

**XSS Prevention:**
```typescript
// Future: Add sanitization for user-generated content
import { sanitize } from 'class-sanitizer';

@Sanitize()
@IsString()
name: string;
```

---

## Database Security

### Prisma ORM Security Features

#### SQL Injection Prevention

**❌ Vulnerable (Raw SQL):**
```sql
SELECT * FROM users WHERE email = '${userInput}';
-- If userInput = "'; DROP TABLE users; --"
-- SQL Injection!
```

**✅ Secure (Prisma Parameterized Queries):**
```typescript
await prisma.user.findUnique({
  where: { email: userInput }
});
// Prisma automatically escapes and parameterizes
```

#### Database Constraints

```prisma
model User {
  id          String    @id @default(uuid()) @db.Uuid
  email       String    @unique            // Prevents duplicates
  password    String                       // Never expose in queries
  role        Role      @default(USER)     // Default to least privilege
  isActive    Boolean   @default(true)     // Account management
  createdAt   DateTime  @default(now())    // Audit trail
  updatedAt   DateTime  @updatedAt         // Change tracking
}
```

#### Selective Field Retrieval

```typescript
// ✅ GOOD: Only select needed fields (exclude password)
await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    // password NOT selected
  },
});

// ❌ BAD: Select all fields (includes password hash)
await prisma.user.findMany();
```

### Connection Security

**Connection String:** `postgresql://user:password@host:port/database`

**Security Features:**
- Connection pooling (prevents connection exhaustion)
- Encrypted connections (TLS/SSL in production)
- Credential management via environment variables

**Production Configuration:**
```env
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"
#                                                       ^^^^^^^^^^^^^^^^
#                                                       Force SSL/TLS
```

---

## Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb"

# JWT
JWT_SECRET="your-super-secret-key-min-32-chars-change-in-production"
JWT_EXPIRES_IN="1d"

# Application
PORT=3000
NODE_ENV="production"
```

### Security Best Practices

#### 1. Never Commit Secrets

**.gitignore:**
```
.env
.env.local
.env.*.local
```

#### 2. Use Strong Secrets

```bash
# Generate secure JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. Environment-Specific Configs

```
.env.development    # Local development
.env.test           # Test environment
.env.production     # Production (never committed)
```

#### 4. Validate at Startup

```typescript
// src/main.ts
async function bootstrap() {
  // Validate required env vars
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing env vars: ${missingVars.join(', ')}`);
  }
  
  // Validate JWT_SECRET length
  if (process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters');
  }
  
  // ... rest of bootstrap
}
```

---

## API Security Best Practices

### CORS Configuration

```typescript
// src/main.ts
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Helmet (Security Headers)

```bash
npm install helmet
```

```typescript
// src/main.ts
import helmet from 'helmet';

app.use(helmet());
// Adds:
// - X-Content-Type-Options: nosniff
// - X-Frame-Options: DENY
// - X-XSS-Protection: 1; mode=block
// - Strict-Transport-Security: max-age=31536000
```

### Rate Limiting (Recommended)

```bash
npm install @nestjs/throttler
```

```typescript
// app.module.ts
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,      // 60 seconds
      limit: 10,    // 10 requests per TTL
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
```

**Per-Route Rate Limits:**
```typescript
@Throttle(3, 60)  // 3 requests per 60 seconds
@Post('login')
async login() { ... }
```

### HTTPS Enforcement

**Development:**
```typescript
// Use HTTP for local development
```

**Production:**
```typescript
// src/main.ts
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}
```

---

## Common Vulnerabilities

### OWASP Top 10 Coverage

| Vulnerability | Status | Mitigation |
|---------------|--------|------------|
| **A01: Broken Access Control** | ✅ Protected | RBAC with guards |
| **A02: Cryptographic Failures** | ✅ Protected | bcrypt hashing, JWT signing |
| **A03: Injection** | ✅ Protected | Prisma parameterized queries |
| **A04: Insecure Design** | ✅ Protected | Defense-in-depth architecture |
| **A05: Security Misconfiguration** | ⚠️ Partial | Add Helmet, CORS, rate limiting |
| **A06: Vulnerable Components** | ⚠️ Ongoing | `npm audit`, dependency updates |
| **A07: Auth Failures** | ✅ Protected | JWT + strong password hashing |
| **A08: Data Integrity Failures** | ✅ Protected | JWT signature verification |
| **A09: Logging Failures** | ❌ Not Implemented | Add audit logging |
| **A10: SSRF** | ✅ Protected | No external requests |

### Specific Attack Mitigations

#### SQL Injection
**Status:** ✅ Protected  
**Mitigation:** Prisma ORM with parameterized queries

#### XSS (Cross-Site Scripting)
**Status:** ⚠️ Partial  
**Mitigation:** 
- Input validation with class-validator
- Future: Add output sanitization for HTML content

#### CSRF (Cross-Site Request Forgery)
**Status:** ✅ Protected  
**Mitigation:** JWT in Authorization header (not cookies)

#### Brute Force
**Status:** ❌ Not Implemented  
**Recommendation:** Add rate limiting on login endpoint

#### Session Fixation
**Status:** ✅ Protected  
**Mitigation:** Stateless JWT (no server sessions)

#### User Enumeration
**Status:** ✅ Protected  
**Mitigation:** Generic error messages ("Invalid email or password")

#### Timing Attacks
**Status:** ✅ Protected  
**Mitigation:** bcrypt constant-time comparison

---

## Security Checklist

### Development
- [x] Password hashing (bcrypt, 10 rounds)
- [x] JWT authentication
- [x] RBAC authorization
- [x] Input validation (class-validator)
- [x] SQL injection prevention (Prisma)
- [x] Password never in responses
- [x] Generic error messages
- [x] Environment variables for secrets
- [x] .env in .gitignore
- [ ] Rate limiting (recommended)
- [ ] Helmet security headers (recommended)
- [ ] CORS configuration (recommended)
- [ ] Audit logging (recommended)

### Pre-Production
- [ ] Generate strong JWT_SECRET (≥32 chars)
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting
- [ ] Add Helmet middleware
- [ ] Set up monitoring/alerting
- [ ] Conduct security audit
- [ ] Implement token refresh mechanism
- [ ] Add brute force protection
- [ ] Configure database SSL
- [ ] Review and harden environment variables
- [ ] Set up automated dependency scanning

### Production
- [ ] JWT_SECRET rotated regularly
- [ ] Database backups enabled
- [ ] SSL/TLS certificates valid
- [ ] Monitoring and alerting active
- [ ] Incident response plan documented
- [ ] Regular security audits scheduled
- [ ] Dependency updates automated
- [ ] Logging and audit trails active

---

## Security Contacts

**For security vulnerabilities:**
- Email: security@yourcompany.com
- Bug Bounty: (if applicable)

**Responsible Disclosure:**
1. Email security issues privately
2. Allow 90 days for fix before public disclosure
3. Do not exploit vulnerabilities

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security](https://docs.nestjs.com/security/authentication)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [Prisma Security](https://www.prisma.io/docs/guides/deployment/prisma-security-guide)

---

## Conclusion

This application implements **industry-standard security practices** for authentication and authorization. Key strengths:

✅ **Strong Password Security:** bcrypt with 10 salt rounds  
✅ **Secure Authentication:** JWT with HMAC-SHA256  
✅ **Role-Based Access Control:** Metadata-driven RBAC  
✅ **Input Validation:** Comprehensive DTO validation  
✅ **SQL Injection Prevention:** Prisma parameterized queries  

**Recommended Enhancements:**
- Rate limiting for brute force protection
- Helmet middleware for security headers
- Token refresh mechanism for extended sessions
- Audit logging for compliance
- Monitoring and alerting for security events
