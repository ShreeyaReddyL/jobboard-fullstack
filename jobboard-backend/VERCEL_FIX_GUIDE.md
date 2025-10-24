# Vercel Deployment Fix Guide

## Issues Fixed

### 1. **ES Module Import Issues**
- **Problem**: Vercel serverless functions were crashing when importing `jsonwebtoken` using static imports with ES modules
- **Solution**: Changed to dynamic imports using `await import()` in auth functions
- **Files Updated**: 
  - `api/auth/login.js`
  - `api/auth/register.js`

### 2. **Missing CORS Headers**
- **Problem**: Cross-Origin Resource Sharing (CORS) errors when frontend tries to access the API
- **Solution**: Added CORS headers to all API endpoints
- **Files Updated**: All files in `api/` directory

### 3. **Better Error Handling**
- **Problem**: Errors weren't being logged properly, making debugging difficult
- **Solution**: Enhanced error responses with detailed error messages
- **Note**: Error stack traces are only shown in development mode

### 4. **Vercel Configuration**
- **Problem**: Basic `vercel.json` wasn't properly configured
- **Solution**: 
  - Added proper memory allocation (1024MB)
  - Added rewrites to handle root path routing
  - Kept maxDuration at 10 seconds (Vercel hobby plan limit)

## Files Modified

1. ✅ `vercel.json` - Updated configuration
2. ✅ `.vercelignore` - Created to exclude unnecessary files
3. ✅ `api/index.js` - Already had proper CORS
4. ✅ `api/hello.js` - Added CORS headers
5. ✅ `api/test.js` - Added CORS headers
6. ✅ `api/simple.js` - Added CORS headers
7. ✅ `api/auth/login.js` - Fixed imports + added CORS
8. ✅ `api/auth/register.js` - Fixed imports + added CORS
9. ✅ `api/auth/simple-login.js` - Added CORS headers
10. ✅ `api/jobs/index.js` - Added CORS headers

## How to Deploy

### Step 1: Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and add:

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard?retryWrites=true&w=majority
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

**Important**: 
- Replace `your-super-secret-jwt-key-change-this-in-production` with a strong random string
- Replace the MongoDB URI with your actual connection string
- Replace `your-frontend.vercel.app` with your actual frontend URL

### Step 2: Deploy to Vercel

From the `jobboard-backend` directory:

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

Or push to your GitHub repository and let Vercel auto-deploy.

### Step 3: Test Your Deployment

After deployment, test each endpoint:

```bash
# Replace YOUR-DEPLOYMENT-URL with your actual Vercel URL

# Test health check
curl https://YOUR-DEPLOYMENT-URL/api/hello

# Test simple endpoint
curl https://YOUR-DEPLOYMENT-URL/api/simple

# Test jobs endpoint
curl https://YOUR-DEPLOYMENT-URL/api/jobs

# Test login (POST request)
curl -X POST https://YOUR-DEPLOYMENT-URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test registration (POST request)
curl -X POST https://YOUR-DEPLOYMENT-URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'
```

## API Endpoints Available

After deployment, your API will have these endpoints:

- **GET** `/` or `/api/index` - API root/health check
- **GET** `/api/hello` - Simple health check
- **GET** `/api/test` - Test endpoint
- **GET** `/api/simple` - Simple test endpoint
- **POST** `/api/auth/login` - User login (requires: email, password)
- **POST** `/api/auth/register` - User registration (requires: name, email, password, role)
- **POST** `/api/auth/simple-login` - Simple login without JWT
- **GET** `/api/jobs` - Get all jobs (mock data)

## Common Issues & Solutions

### Issue: "FUNCTION_INVOCATION_FAILED"
**Solution**: This was caused by ES module import issues. Fixed by using dynamic imports.

### Issue: CORS Errors
**Solution**: All endpoints now have proper CORS headers that allow requests from any origin.

### Issue: JWT Token Not Working
**Solution**: 
1. Make sure `JWT_SECRET` is set in Vercel environment variables
2. The auth endpoints now use dynamic imports to properly load jsonwebtoken

### Issue: Function Timeout
**Solution**: 
- Free/Hobby Vercel plans have a 10-second timeout
- If you need longer, upgrade to Pro plan
- Current config sets maxDuration to 10 seconds

## Checking Logs

To view deployment logs and debug issues:

1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Deployments"
4. Click on the latest deployment
5. Click "Functions" tab to see function logs
6. Look for any error messages

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set environment variables
3. ✅ Test all endpoints
4. Update your frontend to use the Vercel URL:
   ```javascript
   // In your frontend .env file
   VITE_API_BASE_URL=https://your-backend.vercel.app
   ```
5. Deploy your frontend to Vercel
6. Update `CLIENT_URL` environment variable with your frontend URL

## Notes

- The current setup uses mock data (no real database)
- To connect to MongoDB, ensure `MONGO_URI` is set in Vercel
- The serverless functions are optimized for Vercel's execution environment
- All functions include proper error handling and logging

