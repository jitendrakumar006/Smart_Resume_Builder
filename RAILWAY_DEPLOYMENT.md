# Railway Deployment Guide

## Prerequisites
- Railway.app account
- Git repository with all files pushed to GitHub

## Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

## Step 2: Create New Railway Project
1. Login to railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo" 
4. Choose your Smart Resume Builder repository
5. Click Deploy

## Step 3: Configure Environment Variables
In Railway Dashboard → Variables tab, add these:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
```

**Important:**
- Replace `your_secure_jwt_secret_key_here` with a strong random string
- Keep `%40` for @ symbol in password
- Do NOT use `http://localhost` - Railway provides automatic URL

## Step 4: Configure Frontend Variables
Create a `railway-env.sh` file in frontend for production:

```
REACT_APP_API_URL=https://your-railway-backend-url/api
```

This URL will be provided by Railway after backend deployment.

## Step 5: Monitor Deployment
- Check "Deployments" tab for build logs
- Look for "SUCCESS" message
- Get your live Railway URL from "View Logs"

## Troubleshooting

### Build fails with "node_modules error"
- Delete `node_modules` folder locally
- Run `git add -A && git commit -m "Remove node_modules"`
- Retrigger deploy

### MongoDB connection timeout
- Verify credentials in .env match exactly
- Check MongoDB Atlas whitelist includes Railway IP (0.0.0.0/0)
- Test connection string locally first

### Port issues
- Railway automatically assigns PORT
- Keep `PORT=5000` in .env as fallback
- Express server reads from environment: `process.env.PORT || 5000`

## Files Used for Deployment
- ✅ `railway.json` - Railway configuration
- ✅ `Procfile` - Process definition
- ✅ `start.sh` - Build script
- ✅ `package.json` (root) - Main entry point
- ✅ `backend/.env` - Environment variables
- ✅ `backend/runtime.txt` - Node.js version

## Next Steps After Backend Deployment
1. Get deployed backend URL from Railway
2. Update frontend `.env` with API URL
3. Deploy frontend to Netlify:
   ```bash
   npm run build
   # Deploy the "frontend/build" folder to Netlify
   ```

## Support
For more info: https://docs.railway.app/
