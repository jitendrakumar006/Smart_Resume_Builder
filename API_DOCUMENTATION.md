# 📚 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**Endpoint:**
```
POST /auth/register
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "62c7f5e8d1b9f3a0c8d1f1a0",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Email is already in use"
}
```

---

### 2. Login User
**Endpoint:**
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "62c7f5e8d1b9f3a0c8d1f1a0",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User (Protected)
**Endpoint:**
```
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "62c7f5e8d1b9f3a0c8d1f1a0",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 📄 Resume Endpoints (All Protected)

### 1. Create or Update Resume
**Endpoint:**
```
POST /resume
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "resumeName": "My First Resume",
  "template": "professional",
  "personalDetails": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1-234-567-8900",
    "address": "New York, USA",
    "profileSummary": "Experienced software developer with 5 years of expertise..."
  },
  "education": [
    {
      "degree": "B.Tech",
      "institution": "MIT",
      "field": "Computer Science",
      "startDate": "2015-09",
      "endDate": "2019-06",
      "description": "GPA: 3.8/4.0"
    }
  ],
  "skills": [
    {
      "category": "Programming Languages",
      "items": ["JavaScript", "Python", "Java", "C++"]
    },
    {
      "category": "Web Development",
      "items": ["React", "Node.js", "MongoDB", "Express.js"]
    }
  ],
  "experience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Company Inc.",
      "startDate": "2021-01",
      "endDate": "2024-01",
      "currentlyWorking": false,
      "description": "Led development of microservices architecture..."
    }
  ],
  "projects": [
    {
      "projectName": "E-Commerce Platform",
      "description": "Built a full-stack e-commerce platform...",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "https://github.com/project",
      "startDate": "2023-01",
      "endDate": "2023-06"
    }
  ],
  "certifications": [
    {
      "certificationName": "AWS Solutions Architect",
      "issuer": "Amazon Web Services",
      "issueDate": "2023-05",
      "expiryDate": "2025-05",
      "credentialId": "ABC123DEF456"
    }
  ]
}
```

**Response (201 Created / 200 Updated):**
```json
{
  "success": true,
  "message": "Resume created successfully",
  "resume": {
    "_id": "62c7f5e8d1b9f3a0c8d1f1a1",
    "userId": "62c7f5e8d1b9f3a0c8d1f1a0",
    "resumeName": "My First Resume",
    "template": "professional",
    "personalDetails": {...},
    "education": [...],
    "skills": [...],
    "experience": [...],
    "projects": [...],
    "certifications": [...],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get All User Resumes
**Endpoint:**
```
GET /resume
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "resumes": [
    {
      "_id": "62c7f5e8d1b9f3a0c8d1f1a1",
      "resumeName": "My First Resume",
      "template": "professional",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "62c7f5e8d1b9f3a0c8d1f1a2",
      "resumeName": "Modern Resume",
      "template": "modern",
      "createdAt": "2024-01-16T09:15:00.000Z",
      "updatedAt": "2024-01-16T09:15:00.000Z"
    }
  ]
}
```

---

### 3. Get Specific Resume
**Endpoint:**
```
GET /resume/:resumeId
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "resume": {
    "_id": "62c7f5e8d1b9f3a0c8d1f1a1",
    "userId": "62c7f5e8d1b9f3a0c8d1f1a0",
    "resumeName": "My First Resume",
    "template": "professional",
    "personalDetails": {...},
    "education": [...],
    "skills": [...],
    "experience": [...],
    "projects": [...],
    "certifications": [...],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Resume not found"
}
```

---

### 4. Delete Resume
**Endpoint:**
```
DELETE /resume/:resumeId
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Resume not found"
}
```

---

### 5. Download Resume as PDF
**Endpoint:**
```
GET /resume/:resumeId/pdf
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
- Returns PDF file as binary data
- Content-Type: `application/pdf`
- Disposition: `attachment; filename="Name_Resume.pdf"`

**Error Response (404 Not Found):**
```json
{
  "message": "Resume not found"
}
```

---

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Resume:**
```bash
curl -X POST http://localhost:5000/api/resume \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "resumeName": "My Resume",
    "template": "professional",
    "personalDetails": {...}
  }'
```

### Using Postman

1. Import the provided Postman collection (if available)
2. Set up environment variables for `base_url` and `token`
3. Test each endpoint

### Using Axios (Frontend)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Register
api.post('/auth/register', {
  fullName: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  passwordConfirm: 'password123'
});

// Login
const loginResponse = await api.post('/auth/login', {
  email: 'john@example.com',
  password: 'password123'
});

// Save token
localStorage.setItem('token', loginResponse.data.token);

// Add token to future requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create Resume
api.post('/resume', {
  resumeName: 'My Resume',
  template: 'professional',
  personalDetails: {...}
});
```

---

## ❌ Error Codes

| Status | Meaning | Description |
|--------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## 🔄 Request/Response Flow

```
1. User Registration/Login
   ↓
   Returns JWT Token
   ↓
2. Store token in localStorage
   ↓
3. Add token to request headers
   ↓
4. Make authenticated API calls
   ↓
5. Receive data and render in UI
```

---

## 💡 Tips

- Always include the `Authorization` header for protected routes
- Handle token expiration (7 days by default)
- Store token securely (localStorage or sessionStorage)
- Implement error handling for failed requests
- Use CORS headers if frontend is on different domain
- Check network tab in DevTools for debugging

---

## 📞 Support

For API issues or questions, check:
- Backend logs in terminal
- Browser console for frontend errors
- Database connection status
- Environment variables (.env files)
