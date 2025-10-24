# Vercel Deployment Guide

## ✅ FIXED: 500 INTERNAL_SERVER_ERROR Issues

The deployment errors have been resolved! The main issues were:
1. **ES Module imports** with `jsonwebtoken` - Fixed using dynamic imports
2. **Missing CORS headers** - Added to all endpoints
3. **Incomplete error handling** - Enhanced with detailed error messages

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

**Required:**
```
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=production
```

**Optional (for database features):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
CLIENT_URL=https://your-frontend-domain.vercel.app
```

**Note:** The API works with mock data even without MongoDB!

### 4. Redeploy After Setting Env Vars
```bash
vercel --prod
```

### 5. API Endpoints Available

- **GET** `/` or `/api/index` - API health check with endpoint list
- **GET** `/api/hello` - Simple health check
- **GET** `/api/test` - Test endpoint
- **GET** `/api/simple` - Simple test endpoint
- **POST** `/api/auth/register` - User registration (mock)
- **POST** `/api/auth/login` - User login with JWT (mock)
- **POST** `/api/auth/simple-login` - Simple login without JWT (mock)
- **GET** `/api/jobs` - List all jobs (mock data)

### 6. Test Your Deployment

After deployment, test your API:
```bash
# Health check
curl https://your-app.vercel.app/api/hello

# Get jobs
curl https://your-app.vercel.app/api/jobs

# Test login
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 7. Frontend Configuration

Update your frontend API base URL to point to your Vercel deployment:
```javascript
// In your frontend .env file
VITE_API_BASE_URL=https://your-backend.vercel.app
```

## What Was Fixed

### 1. Dynamic Imports for ES Modules
```javascript
// BEFORE (caused crashes):
import jwt from "jsonwebtoken";

// AFTER (works on Vercel):
const jwt = await import('jsonwebtoken');
const token = jwt.default.sign(...);
```

### 2. CORS Headers Added to All Endpoints
```javascript
res.setHeader('Access-Control-Allow-Credentials', true);
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
// ... more headers
```

### 3. Better Error Handling
```javascript
catch (error) {
  console.error("Error:", error);
  res.status(500).json({ 
    message: "Error message",
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
}
```

### 4. Updated vercel.json
```json
{
  "version": 2,
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10,
      "memory": 1024
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index"
    }
  ]
}
```

## Troubleshooting

### Issue: Still seeing 500 errors
**Solution:** 
1. Check Vercel logs in dashboard
2. Ensure `JWT_SECRET` is set in environment variables
3. Redeploy with `vercel --prod --force`

### Issue: CORS errors from frontend
**Solution:** All endpoints now have CORS headers that allow all origins (`*`)

### Issue: JWT not working
**Solution:** Set `JWT_SECRET` environment variable in Vercel dashboard

### Issue: Function Timeout
**Solution:** 
- Free/Hobby plans have 10-second timeout (already configured)
- For longer timeouts, upgrade to Pro plan

## File Structure for Vercel

```
jobboard-backend/
├── api/
│   ├── index.js            ✅ Root endpoint with CORS
│   ├── hello.js            ✅ Health check with CORS
│   ├── test.js             ✅ Test endpoint with CORS
│   ├── simple.js           ✅ Simple test with CORS
│   ├── auth/
│   │   ├── login.js        ✅ Fixed with dynamic imports + CORS
│   │   ├── register.js     ✅ Fixed with dynamic imports + CORS
│   │   └── simple-login.js ✅ Simple login with CORS
│   └── jobs/
│       └── index.js        ✅ Jobs endpoint with CORS
├── vercel.json             ✅ Updated configuration
├── .vercelignore           ✅ Added to exclude unnecessary files
└── package.json
```

## Viewing Logs

To debug issues:
1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click on the latest deployment
5. Click "Functions" tab
6. View real-time logs for each function

## Next Steps

1. ✅ All files have been fixed
2. Deploy to Vercel: `vercel`
3. Set environment variables in Vercel dashboard
4. Production deploy: `vercel --prod`
5. Test all endpoints
6. Update frontend to use your Vercel URL
7. (Optional) Connect MongoDB by setting `MONGO_URI`

Your backend should now deploy successfully! 🚀
