# Quick Deployment Steps

## Before You Deploy

Make sure you have:
- ✅ A Vercel account (free tier works fine)
- ✅ Vercel CLI installed globally: `npm i -g vercel`
- ✅ Your MongoDB connection string ready (optional for initial testing)

## Deploy in 3 Steps

### 1. Navigate to Backend Directory
```bash
cd jobboard-backend
```

### 2. Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (if first time)
- What's your project's name? **jobboard-backend** (or your choice)
- In which directory is your code located? **./** (press Enter)

### 3. Set Environment Variables

After first deployment, go to:
- Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:
```
JWT_SECRET=mySecretKey123!@#ChangeMePlease
NODE_ENV=production
```

Optional (for database features):
```
MONGO_URI=your-mongodb-connection-string
CLIENT_URL=https://your-frontend-url.vercel.app
```

Then redeploy:
```bash
vercel --prod
```

## Test Your Deployment

Visit these URLs (replace with your actual Vercel URL):
- https://your-app.vercel.app/api/hello
- https://your-app.vercel.app/api/jobs
- https://your-app.vercel.app/api/simple

You should see JSON responses!

## Troubleshooting

If you see errors:
1. Check the Vercel dashboard logs
2. Ensure environment variables are set
3. Try redeploying: `vercel --prod --force`

## What Was Fixed

The main issues that were causing the 500 error:
1. ✅ ES module imports with `jsonwebtoken` - now using dynamic imports
2. ✅ Missing CORS headers - added to all endpoints
3. ✅ Incomplete vercel.json configuration - now properly configured
4. ✅ Better error handling - detailed error messages for debugging

Your API should now work perfectly on Vercel! 🚀

