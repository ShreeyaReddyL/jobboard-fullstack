# JobBoard API Test Plan

## Prerequisites
- Backend server running on `http://localhost:5000`
- MongoDB connected (or using mock data)
- Postman or similar API testing tool

## Test Sequence

### 1. Health Check
```http
GET http://localhost:5000/
```
**Expected**: `{"message": "JobBoard API is running"}`

### 2. Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```
**Expected**: JWT token and user object

### 3. Login User
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
**Expected**: JWT token and user object

### 4. Get Jobs (Public)
```http
GET http://localhost:5000/api/jobs
```
**Expected**: Array of job objects

### 5. Get User Profile (Protected)
```http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer <token-from-step-2-or-3>
```
**Expected**: User profile object

### 6. Create Job (Recruiter)
```http
POST http://localhost:5000/api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Frontend Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "description": "We are looking for a skilled frontend developer to join our team."
}
```
**Expected**: Created job object

### 7. Apply to Job (User)
```http
POST http://localhost:5000/api/applications/apply
Authorization: Bearer <token>
Content-Type: multipart/form-data

jobId: <job-id-from-step-6>
coverLetter: "I am very interested in this position..."
resume: <upload-file>
```
**Expected**: Application object

### 8. Get User Applications
```http
GET http://localhost:5000/api/applications/me
Authorization: Bearer <token>
```
**Expected**: Array of user's applications

## Test Data

### Sample Users
- **User**: john@example.com / password123
- **Recruiter**: recruiter@example.com / password123
- **Admin**: admin@example.com / password123

### Sample Jobs
- Frontend Developer at Tech Corp
- Backend Developer at Startup Inc
- Full Stack Developer at Big Corp

## Error Testing

### 1. Invalid Credentials
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```
**Expected**: 400/401 error

### 2. Missing Authorization
```http
GET http://localhost:5000/api/auth/profile
```
**Expected**: 401 Unauthorized

### 3. Invalid Role Access
```http
POST http://localhost:5000/api/jobs
Authorization: Bearer <user-token>
```
**Expected**: 403 Forbidden

## Performance Tests

### 1. Load Test
- Send 100 concurrent requests to `/api/jobs`
- Monitor response times and error rates

### 2. File Upload Test
- Upload files of different sizes (1MB, 5MB, 10MB)
- Test file type validation (PDF, DOC, DOCX)

## Security Tests

### 1. SQL Injection
- Try SQL injection in email/password fields
- Test with special characters

### 2. XSS Protection
- Test with script tags in text fields
- Verify proper escaping

### 3. File Upload Security
- Try uploading executable files
- Test file size limits

## Deployment Tests

### 1. Environment Variables
- Test with missing JWT_SECRET
- Test with invalid MONGO_URI

### 2. CORS
- Test from different origins
- Verify CORS headers

### 3. Production Build
- Test `npm start` command
- Verify all routes work in production mode
