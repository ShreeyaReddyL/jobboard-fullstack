# Environment Variables Setup

Create a `.env` file in the `jobboard-backend` directory with the following variables:

## Required Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/jobboard
# For production, use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173

# Email Configuration (for notifications)
EMAIL_FROM=noreply@jobboard.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Admin Configuration
ADMIN_EMAIL=admin@jobboard.com
ADMIN_PASSWORD=admin123

# API Configuration
API_VERSION=v1
```

## How to Set Up

1. Create a `.env` file in the `jobboard-backend` directory
2. Copy the above content into the `.env` file
3. Replace the placeholder values with your actual values
4. For production, use strong, unique values for JWT_SECRET

## Important Notes

- **JWT_SECRET**: Use a strong, random string (at least 32 characters)
- **MONGO_URI**: For local development, use localhost. For production, use MongoDB Atlas
- **CLIENT_URL**: Should match your frontend URL
- **EMAIL_***: Configure for sending notifications (optional for basic setup)
