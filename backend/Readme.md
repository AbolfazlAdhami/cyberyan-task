# Cyberyan Wallet API

Backend service for DID issuance, Verifiable Credential generation, JWT authentication, and VC audit hashing.

Built with:

- Node.js
- Express
- TypeScript
- Zod (validation)
- JWT (HS256)
- SHA-256 (Node crypto)
- Faker (mock credential data)

---

# Overview

This API simulates a minimal decentralized identity flow:

1. User registers → system issues a DID and Verifiable Credential (VC)
2. User authenticates → system issues JWT
3. User audits a VC → system returns SHA-256 hash (protected endpoint)

Architecture separates:

- Issuance (`/register`)
- Authentication (`/auth`)
- Protected resource (`/audit/:id`)

---

# Project Structure

```
backend/
 ├── src/
 │   ├── controllers/
 │   ├── middlewares/
 │   ├── routes/
 │   ├── services/
 │   ├── types/
 │   ├── utils/
 │   ├── validators/
 │   ├── app.ts
 │   └── server.ts
 ├── package.json
 ├── tsconfig.json
 └── README.md
```

---

# Installation

## 1. Install dependencies

```bash
npm install
```

## 2. Run in development

```bash
npm run dev
```

Server runs on:

```
http://localhost:8000
```

---

# Base URL

All endpoints are prefixed with:

```
http://localhost:8000/api
```

---

# API Endpoints

---

## POST /api/register

### Description

Registers a new user and issues:

- DID
- Verifiable Credential (VC)
- JWT token

### Request

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "passportImage": "base64string",
  "selfieImage": "base64string"
}
```

### Response (201)

```json
{
  "did": " did:uuid",
  "vc": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "id": "uuid",
    "type": ["VerifiableCredential"],
    "issuer": " did:issuer",
    "issuanceDate": "ISO_DATE",
    "credentialSubject": {
      "id": " did:uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "passportNumber": "A8K3J29L"
    }
  },
  "token": "JWT_TOKEN"
}
```

---

## POST /api/auth

### Description

Authenticates a DID and returns a new JWT.

### Request

**Headers**

```
Content-Type: application/json
```

**Body**

```json
{
  "did": " did:uuid"
}
```

### Response

```json
{
  "token": "JWT_TOKEN",
  "expiresIn": "1h"
}
```

---

## GET /api/audit/:id

### Description

Returns SHA-256 hash of a VC ID.

This endpoint is protected and requires a valid JWT.

### Request

**Headers**

```
Authorization: Bearer <JWT>
```

### Example

```
GET /api/audit/3f91-uuid
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Response

```json
{
  "vcId": "3f91-uuid",
  "hash": "3ac674216f3e15c761ee1a5e255f067953623c8b388b4459c14c7c15",
  "timestamp": "2026-02-23T12:00:00Z"
}
```

---

# Authentication Flow

1. Call `/register`
2. Extract `did`
3. Call `/auth` with DID
4. Receive JWT
5. Use JWT in `Authorization: Bearer` header for `/audit`

---

# Testing with Postman

---

## Step 1: Register

**Method:** POST  
**URL:**

```
http://localhost:8000/api/register
```

**Body (JSON):**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "passportImage": "abc",
  "selfieImage": "abc"
}
```

Copy:

- `did`
- `vc.id`
- `token`

---

## Step 2: Authenticate

**Method:** POST  
**URL:**

```
http://localhost:8000/api/auth
```

**Body:**

```json
{
  "did": " did:your-did"
}
```

Copy returned token.

---

## Step 3: Audit

**Method:** GET  
**URL:**

```
http://localhost:8000/api/audit/<vcId>
```

**Headers:**

```
Authorization: Bearer <token>
```

You should receive SHA-256 hash.

---

# Testing with cURL

## Register

```bash
curl -X POST http://localhost:8000/api/register \
-H "Content-Type: application/json" \
-d '{"name":"John","email":"john@test.com","passportImage":"x","selfieImage":"x"}'
```

## Authenticate

```bash
curl -X POST http://localhost:8000/api/auth \
-H "Content-Type: application/json" \
-d '{"did":" did:YOUR_DID"}'
```

## Audit

```bash
curl http://localhost:8000/api/audit/YOUR_VC_ID \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

# Error Handling

### 401 Unauthorized

```json
{
  "message": "No token provided"
}
```

or

```json
{
  "message": "Invalid token"
}
```

### 400 Validation Error

Triggered by invalid request body (Zod validation).

---

# Scripts

```bash
npm run dev     # Development mode
npm run build   # Compile TypeScript
npm start       # Run production build
```

---

# Production Recommendations

- Persist users in database
- Use asymmetric JWT (RS256)
- Validate DID ownership
- Store credentials persistently
- Add rate limiting
- Add logging
- Add Docker + reverse proxy
- Use HTTPS
- Implement refresh tokens

---

# Author

Cyberyan Wallet API  
TypeScript · Express · JWT · SHA-256
