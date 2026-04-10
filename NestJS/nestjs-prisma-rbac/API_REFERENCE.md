# 📡 API Reference Documentation

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [User Endpoints](#user-endpoints)
- [Testing with cURL](#testing-with-curl)
- [Testing with Postman](#testing-with-postman)

---

## Base URL

```
Development: http://localhost:3000
Production:  https://your-domain.com
```

---

## Authentication

This API uses **JWT Bearer Token** authentication.

### How to Authenticate

1. Register or login to receive a JWT token
2. Include token in `Authorization` header for protected routes

**Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

**Example:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

## Response Format

### Success Response

**Status Code:** `200 OK` or `201 Created`

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "createdAt": "2026-04-08T05:15:31.949Z"
}
```

### Array Response

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "ADMIN"
  }
]
```

---

## Error Handling

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### HTTP Status Codes

| Code | Meaning | When It Happens |
|------|---------|-----------------|
| `200` | OK | Successful GET/DELETE request |
| `201` | Created | Successful POST request (registration) |
| `400` | Bad Request | Invalid input data |
| `401` | Unauthorized | Missing or invalid JWT token |
| `403` | Forbidden | Insufficient permissions (role mismatch) |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource (e.g., email exists) |
| `500` | Internal Server Error | Server error |

### Common Error Messages

#### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

#### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

#### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

#### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

---

## Endpoints

### Authentication Endpoints

---

#### Register New User

Create a new user account.

**Endpoint:** `POST /auth/register`  
**Authentication:** Not required  
**Role:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | string | Yes | Not empty |
| `email` | string | Yes | Valid email format, unique |
| `password` | string | Yes | Min 6 characters |

**Success Response:** `201 Created`
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "isActive": true,
  "createdAt": "2026-04-08T05:15:31.949Z",
  "updatedAt": "2026-04-08T05:15:31.949Z"
}
```

**Error Responses:**

*400 Bad Request - Invalid Email*
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

*400 Bad Request - Password Too Short*
```json
{
  "statusCode": 400,
  "message": ["password must be longer than or equal to 6 characters"],
  "error": "Bad Request"
}
```

*409 Conflict - Email Already Exists*
```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

#### Login

Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`  
**Authentication:** Not required  
**Role:** Public

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Validation Rules:**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email format |
| `password` | string | Yes | Not empty |

**Success Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzEyNTU5MzMxLCJleHAiOjE3MTI2NDU3MzF9.abc123xyz",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "admin@example.com",
    "name": "System Admin",
    "role": "ADMIN"
  }
}
```

**JWT Payload Structure:**
```json
{
  "sub": "123e4567-e89b-12d3-a456-426614174000",
  "email": "admin@example.com",
  "role": "ADMIN",
  "iat": 1712559331,
  "exp": 1712645731
}
```

**Token Expiration:** 1 day (configurable via `JWT_EXPIRES_IN` env variable)

**Error Responses:**

*401 Unauthorized - Invalid Credentials*
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Save Token for Subsequent Requests:**
```bash
# Linux/Mac
export TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  | jq -r '.access_token')

# Windows PowerShell
$TOKEN = (curl.exe -s -X POST http://localhost:3000/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@example.com","password":"admin123"}' `
  | ConvertFrom-Json).access_token
```

---

### User Endpoints

---

#### Get Current User Profile

Retrieve the authenticated user's profile information.

**Endpoint:** `GET /users/profile`  
**Authentication:** Required (JWT)  
**Role:** Any authenticated user

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response:** `200 OK`
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "USER",
  "isActive": true,
  "lastLoginAt": "2026-04-08T05:15:31.949Z",
  "createdAt": "2026-04-07T10:30:00.000Z",
  "updatedAt": "2026-04-08T05:15:31.949Z"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique user identifier |
| `email` | string | User's email address |
| `name` | string | User's full name |
| `role` | enum | USER or ADMIN |
| `isActive` | boolean | Account status |
| `lastLoginAt` | DateTime | Last login timestamp (nullable) |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

**Error Responses:**

*401 Unauthorized - No Token*
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

*401 Unauthorized - Invalid Token*
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

*404 Not Found - User Deleted*
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

---

#### Get All Users (Admin Only)

Retrieve a list of all users in the system.

**Endpoint:** `GET /users`  
**Authentication:** Required (JWT)  
**Role:** ADMIN only

**Request Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response:** `200 OK`
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "admin@example.com",
    "name": "System Admin",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-04-01T00:00:00.000Z",
    "updatedAt": "2026-04-08T05:15:31.949Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "email": "john@example.com",
    "name": "John User",
    "role": "USER",
    "isActive": true,
    "createdAt": "2026-04-05T12:30:00.000Z",
    "updatedAt": "2026-04-07T08:20:15.123Z"
  },
  {
    "id": "323e4567-e89b-12d3-a456-426614174002",
    "email": "jane@example.com",
    "name": "Jane User",
    "role": "USER",
    "isActive": false,
    "createdAt": "2026-03-20T09:15:00.000Z",
    "updatedAt": "2026-04-01T14:30:00.000Z"
  }
]
```

**Response Characteristics:**
- Returns all users (no pagination currently)
- Ordered by `createdAt` descending (newest first)
- Does NOT include password field
- Empty array `[]` if no users exist

**Error Responses:**

*401 Unauthorized - No Token*
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

*403 Forbidden - Not Admin*
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

#### Delete User (Admin Only)

Delete a user from the system by ID.

**Endpoint:** `DELETE /users/:id`  
**Authentication:** Required (JWT)  
**Role:** ADMIN only

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | UUID | User ID to delete |

**Request Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response:** `200 OK`
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**

*401 Unauthorized - No Token*
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

*403 Forbidden - Not Admin*
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

*404 Not Found - User Doesn't Exist*
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/users/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Testing with cURL

### Complete Workflow Example

#### 1. Register a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test1234"
  }'
```

#### 2. Login and Save Token
```bash
# Linux/Mac
export TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234"}' \
  | jq -r '.access_token')

echo $TOKEN
```

```powershell
# Windows PowerShell
$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com","password":"test1234"}'

$TOKEN = $response.access_token
Write-Host $TOKEN
```

#### 3. Get Profile
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

#### 4. Login as Admin
```bash
# Linux/Mac
export ADMIN_TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  | jq -r '.access_token')
```

```powershell
# Windows PowerShell
$adminResponse = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@example.com","password":"admin123"}'

$ADMIN_TOKEN = $adminResponse.access_token
```

#### 5. Get All Users (Admin)
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 6. Delete User (Admin)
```bash
curl -X DELETE http://localhost:3000/users/<USER_ID> \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Testing with Postman

### Setup Postman Collection

#### 1. Create Environment

**Variables:**
| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `baseUrl` | `http://localhost:3000` | `http://localhost:3000` |
| `token` | _(empty)_ | _(will be auto-set)_ |
| `adminToken` | _(empty)_ | _(will be auto-set)_ |

#### 2. Create Requests

**Collection Structure:**
```
NestJS RBAC API
├── Auth
│   ├── Register
│   └── Login
└── Users
    ├── Get Profile
    ├── Get All Users (Admin)
    └── Delete User (Admin)
```

#### 3. Auto-Save Token Script

**For Login request, add to "Tests" tab:**
```javascript
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set("token", response.access_token);
  pm.environment.set("userId", response.user.id);
  console.log("Token saved:", response.access_token);
}
```

**For Admin Login:**
```javascript
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set("adminToken", response.access_token);
  console.log("Admin token saved:", response.access_token);
}
```

#### 4. Request Examples

**Register:**
```
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "name": "Postman User",
  "email": "postman@example.com",
  "password": "postman123"
}
```

**Login:**
```
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "postman@example.com",
  "password": "postman123"
}
```

**Get Profile:**
```
GET {{baseUrl}}/users/profile
Authorization: Bearer {{token}}
```

**Get All Users (Admin):**
```
GET {{baseUrl}}/users
Authorization: Bearer {{adminToken}}
```

**Delete User (Admin):**
```
DELETE {{baseUrl}}/users/{{userId}}
Authorization: Bearer {{adminToken}}
```

---

## Testing with HTTPie

### Installation
```bash
pip install httpie
```

### Examples

**Register:**
```bash
http POST localhost:3000/auth/register \
  name="HTTPie User" \
  email="httpie@example.com" \
  password="httpie123"
```

**Login:**
```bash
http POST localhost:3000/auth/login \
  email="httpie@example.com" \
  password="httpie123"
```

**Get Profile:**
```bash
http GET localhost:3000/users/profile \
  "Authorization:Bearer YOUR_TOKEN_HERE"
```

---

## Rate Limiting (Future)

Currently, there is **no rate limiting** implemented. For production, consider adding:

```typescript
// app.module.ts
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,      // Time window in seconds
      limit: 10,    // Max requests per ttl
    }),
  ],
})
```

**Recommended Limits:**
- Login: 5 requests per 15 minutes
- Registration: 3 requests per hour
- Protected routes: 100 requests per minute

---

## Pagination (Future Enhancement)

Currently, `GET /users` returns all users. For production:

**Recommended Query Parameters:**
```
GET /users?page=1&limit=20&sortBy=createdAt&order=desc
```

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

## API Versioning (Future)

Consider versioning for breaking changes:

```
/api/v1/auth/login
/api/v2/auth/login
```

Or header-based:
```
Accept: application/vnd.api+json; version=1
```

---

## WebSocket Support (Future)

For real-time features, NestJS supports WebSockets:

```typescript
@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    // Broadcast to clients
  }
}
```

---

## Swagger/OpenAPI Documentation (Recommended)

### Installation
```bash
npm install @nestjs/swagger
```

### Setup
```typescript
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('NestJS RBAC API')
  .setDescription('API documentation for NestJS RBAC system')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```

**Access:** `http://localhost:3000/api-docs`

---

## Summary

This API provides:
- ✅ JWT-based authentication
- ✅ Role-based access control (USER, ADMIN)
- ✅ Input validation
- ✅ Comprehensive error handling
- ✅ RESTful design

**For more details:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [SECURITY.md](./SECURITY.md) - Security practices
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Setup guide
