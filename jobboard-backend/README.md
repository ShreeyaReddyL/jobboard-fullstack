# JobBoard Backend API

A MERN stack job board application backend with authentication, job management, and application tracking.

## Features

- User authentication (register/login) with JWT
- Role-based access control (user, recruiter, admin)
- Job CRUD operations
- Job application system with file uploads
- Admin dashboard for job approval and user management
- Email notifications (configurable)

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Nodemailer for emails
- CORS enabled

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Database
MONGO_URI=mongodb://localhost:27017/jobboard
# For production: mongodb+srv://username:password@cluster.mongodb.net/jobboard

# Email (optional)
FROM_EMAIL=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get specific job
- `POST /api/jobs` - Create job (recruiter only)
- `GET /api/jobs/recruiter/my-jobs` - Get recruiter's jobs
- `POST /api/jobs/:id/approve` - Approve job (admin only)
- `DELETE /api/jobs/:id` - Reject job (admin only)

### Applications
- `POST /api/applications/apply` - Apply to job (user only)
- `GET /api/applications/me` - Get user's applications
- `GET /api/applications/job/:id` - Get applications for job (recruiter only)
- `PATCH /api/applications/:id/status` - Update application status (admin only)

### Admin
- `GET /api/admin/pending-jobs` - Get pending jobs for approval
- `GET /api/admin/users` - List all users
- `POST /api/admin/users/:id/block` - Block/unblock user

## Testing with Postman

### Register User
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

### Login User
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Jobs (Public)
```http
GET http://localhost:5000/api/jobs
```

### Create Job (Recruiter)
```http
POST http://localhost:5000/api/jobs
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Frontend Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "description": "We are looking for a skilled frontend developer..."
}
```

## Deployment

### Environment Variables for Production
Set these in your deployment platform:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
JWT_SECRET=your-production-secret-key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
```

### Deployment Platforms
- **Heroku**: Set environment variables in dashboard
- **Railway**: Set in project settings
- **Vercel**: Set in project environment variables
- **DigitalOcean**: Set in app platform environment

## File Uploads

Resume files are stored in the `uploads/` directory and served at `/uploads/filename`. In production, consider using cloud storage (AWS S3, Cloudinary) for better scalability.

## Database Models

### User
- name, email, password, role, blocked, timestamps

### Job
- title, company, location, description, recruiter, approved, status, timestamps

### Application
- job, applicant, coverLetter, resumeUrl, status, timestamps

## Error Handling

All errors are handled by the global error handler middleware and return consistent JSON responses.

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- File upload validation
- CORS configuration
