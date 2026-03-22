# GenAI Hub - API Documentation

Complete API reference for GenAI Hub backend services.

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

---

## 🔐 Authentication Endpoints

### 1. Sign Up
Register a new user account.

**Endpoint:** `POST /auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "credits": 100
    }
  }
}
```

**Error Responses:**
- 400: Missing fields, passwords don't match, user exists
- 500: Server error

---

### 2. Login
Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "credits": 100
    }
  }
}
```

**Error Responses:**
- 400: Missing email or password
- 401: Invalid credentials
- 500: Server error

---

### 3. Get Current User
Fetch current authenticated user information.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 75
  }
}
```

**Error Responses:**
- 401: Unauthorized (missing/invalid token)
- 404: User not found
- 500: Server error

---

## 📝 Text Generation Endpoint

### Generate Text
Create AI-generated text content.

**Endpoint:** `POST /generate/text`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "Write a catchy Instagram caption for a coffee shop",
  "type": "text"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Text generated successfully",
  "data": {
    "output": "Your generated text content here...",
    "creditsRemaining": 65
  }
}
```

**Error Responses:**
- 400: Missing prompt
- 401: Unauthorized
- 402: Insufficient credits (need 10 credits)
- 404: User not found
- 500: Server error

**Credits Required:** 10

---

## 🎨 Poster Generation Endpoint

### Generate Poster
Create AI-designed poster.

**Endpoint:** `POST /generate/poster`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Summer Sale 2024",
  "description": "50% off on all items"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Poster generated successfully",
  "data": {
    "output": "JSON string with poster design and HTML...",
    "creditsRemaining": 55
  }
}
```

**Error Responses:**
- 400: Missing title
- 401: Unauthorized
- 402: Insufficient credits (need 20 credits)
- 404: User not found
- 500: Server error

**Credits Required:** 20

---

## 📄 Resume Generation Endpoint

### Generate Resume
Build a professional resume.

**Endpoint:** `POST /generate/resume`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "title": "Senior Software Engineer",
  "experience": "10+ years in full-stack development..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Resume generated successfully",
  "data": {
    "output": "Formatted resume text...",
    "creditsRemaining": 40
  }
}
```

**Error Responses:**
- 400: Missing name or title
- 401: Unauthorized
- 402: Insufficient credits (need 15 credits)
- 404: User not found
- 500: Server error

**Credits Required:** 15

---

## 💻 Website Generation Endpoint

### Generate Website
Create HTML website.

**Endpoint:** `POST /generate/website`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Tech Startup Solutions",
  "description": "Innovative solutions for modern businesses"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Website generated successfully",
  "data": {
    "output": "<!DOCTYPE html>... complete HTML website...",
    "creditsRemaining": 15
  }
}
```

**Error Responses:**
- 400: Missing title
- 401: Unauthorized
- 402: Insufficient credits (need 25 credits)
- 404: User not found
- 500: Server error

**Credits Required:** 25

---

## 📜 History Endpoints

### Get Generation History
Retrieve user's generation history.

**Endpoint:** `GET /history?limit=20&page=1`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of items per page (default: 20)
- `page` (optional): Page number (default: 1)

**Success Response (200):**
```json
{
  "success": true,
  "message": "History fetched successfully",
  "data": {
    "history": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "toolType": "text",
        "input": "Write a caption...",
        "output": "Generated caption...",
        "creditsUsed": 10,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "pages": 2
  }
}
```

**Error Responses:**
- 401: Unauthorized
- 500: Server error

---

### Delete History Item
Delete a specific generation from history.

**Endpoint:** `DELETE /history?id=<history_id>`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `id` (required): History item ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "History deleted successfully"
}
```

**Error Responses:**
- 400: Missing history ID
- 401: Unauthorized
- 404: History item not found or unauthorized
- 500: Server error

---

## 💰 Credits Information

### Credit Costs per Tool
| Tool | Credits | Remarks |
|------|---------|---------|
| Text Generator | 10 | Fast generation |
| Poster Generator | 20 | Image design |
| Resume Builder | 15 | Professional format |
| Website Generator | 25 | Full HTML page |

### User Credits
- **Starting Credits:** 100
- **Maximum:** Unlimited (depends on plan)
- **If Credits = 0:** Cannot use any tool

---

## 🔄 Request/Response Examples

### Example 1: Complete Text Generation Flow

**Step 1: Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

Response includes token: `abc123token...`

**Step 2: Generate Text**
```bash
curl -X POST http://localhost:3000/api/generate/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer abc123token..." \
  -d '{
    "prompt": "Create a motivational quote about success"
  }'
```

**Step 3: Check History**
```bash
curl -X GET http://localhost:3000/api/history \
  -H "Authorization: Bearer abc123token..."
```

---

## 🛡️ Security Notes

1. **Always use HTTPS in production**
2. **Never expose JWT tokens in logs**
3. **Rotate JWT_SECRET regularly**
4. **Implement rate limiting**
5. **Validate all user inputs**
6. **Handle errors securely**

---

## ⏱️ Rate Limiting (Recommended Implementation)

While not implemented by default, add rate limiting in production:

```typescript
// Example: Max 100 requests per 15 minutes per IP
- Text Generation: 100 requests/hour per user
- Auth Endpoints: 10 requests/minute per IP
```

---

## 🔍 Error Codes Reference

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Missing or invalid data |
| 401 | Unauthorized - Invalid/missing token |
| 402 | Payment Required - Insufficient credits |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server issue |

---

## 📞 Testing the API

### Using cURL
```bash
# Test endpoint
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer your_token_here"
```

### Using Postman
1. Create new collection
2. Set Authorization type to "Bearer Token"
3. Add your JWT token
4. Create requests for each endpoint

### Using JavaScript/Fetch
```javascript
const response = await fetch('/api/auth/me', {
  headers: {
    'Authorization': 'Bearer ' + token,
  }
});
const data = await response.json();
console.log(data);
```

---

## 🔗 Integration Guide

To integrate with your frontend:

```typescript
const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function callAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  return response.json();
}

// Usage
const data = await callAPI('/generate/text', {
  method: 'POST',
  body: JSON.stringify({ prompt: 'Your prompt' })
});
```

---

**Last Updated:** January 2024
**API Version:** 1.0
