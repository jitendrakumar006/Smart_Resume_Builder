# RAILWAY ENVIRONMENT VARIABLES - Add these in Railway Dashboard

## Required Variables:

# Node environment (MUST be production)
NODE_ENV=production

# MongoDB Connection String
MONGODB_URI=mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-random-string-change-this
JWT_EXPIRE=7d

# Server Port (Railway assigns this, but keep as fallback)
PORT=5000

# Tell backend to serve React frontend
SERVE_FRONTEND=true

## Instructions for Railway Dashboard:

1. Go to railway.app → Your Project → Variables
2. Click "Add Variable" for each item above
3. Fill in the values exactly as shown
4. For JWT_SECRET, generate a random string:
   - Option A: Use: $(openssl rand -base64 32)
   - Option B: Use: $(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   - Option C: Type any long random string like: "abc123def456xyz789abc123def456xyz789"
5. Leave PORT as 5000
6. Click "Deploy" to trigger new build

## After Variables are Added:

- Railway will automatically redeploy
- Check "Deployments" tab for SUCCESS ✅
- Once successful, your Railway URL will work for both:
  - Frontend: https://your-railway-url.up.railway.app
  - API: https://your-railway-url.up.railway.app/api/auth/register

## Testing:

```bash
# Test API health
curl https://your-railway-url.up.railway.app/api/health

# Test frontend loads
curl https://your-railway-url.up.railway.app

# Browser test
Open https://your-railway-url.up.railway.app in browser
- Register page should load
- Can click through routes without 404
- API calls should work
```
