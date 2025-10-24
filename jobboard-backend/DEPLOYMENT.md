# Vercel Deployment Guide

## Quick Deploy to Vercel

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy from Backend Directory
```bash
cd jobboard-backend
vercel
```

### 3. Set Environment Variables in Vercel Dashboard
Go to your project settings in Vercel and add these environment variables:

```
JWT_SECRET=your-secret-key-here
MONGO_URI=your-mongodb-connection-string
CLIENT_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
```

### 4. API Endpoints Available

- **GET** `/api/hello` - Health check
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login
- **GET** `/api/jobs` - List all jobs

### 5. Test Your Deployment

After deployment, test your API:
```bash
curl https://your-app.vercel.app/api/hello
```

### 6. Frontend Configuration

Update your frontend API base URL to point to your Vercel deployment:
```javascript
// In your frontend .env file
VITE_API_BASE_URL=https://your-backend.vercel.app
```

## Troubleshooting

1. **Function Timeout**: Vercel has a 10-second timeout for hobby plans
2. **Environment Variables**: Make sure all required env vars are set
3. **CORS Issues**: Update CORS settings in your API functions
4. **Database Connection**: Ensure MongoDB URI is correct

## File Structure for Vercel

```
jobboard-backend/
├── api/
│   ├── hello.js
│   ├── auth/
│   │   ├── register.js
│   │   └── login.js
│   └── jobs/
│       └── index.js
├── vercel.json
└── package.json
```
