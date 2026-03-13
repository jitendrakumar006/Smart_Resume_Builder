# 🚀 Smart Resume Builder - Deployment Checklist

## ✅ Pre-Deployment (DO BEFORE PUSHING TO GITHUB)

- [ ] Backend `.env` file configured:
  - [ ] MONGODB_URI set with correct credentials
  - [ ] JWT_SECRET set to a strong random value
  - [ ] NODE_ENV=production

- [ ] Frontend `.env` file created:
  - [ ] REACT_APP_API_URL points to correct backend

- [ ] All files committed to Git:
  - [ ] `package.json` (root)
  - [ ] `Procfile`
  - [ ] `railway.json`
  - [ ] `start.sh`
  - [ ] `backend/runtime.txt`
  - [ ] Backend code (server.js, controllers, models, middleware)
  - [ ] Frontend code (App.js, components, pages)

- [ ] `.env` files are in `.gitignore` (NOT pushed to GitHub)

- [ ] Repository pushed to GitHub:
  ```bash
  git add .
  git commit -m "Ready for Railway deployment"
  git push origin main
  ```

## 🔧 Railway Setup

- [ ] Login to railway.app
- [ ] Create new project from GitHub repo
- [ ] Wait for initial detection (should recognize Node.js)
- [ ] Check "Deployments" tab for build progress

## 🌍 Configure Railway Environment Variables

In Railway Dashboard → Click your project → Variables tab:

```
Add these environment variables:

NODE_ENV
production

MONGODB_URI
mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority

JWT_SECRET
[Generate a random string like: $(openssl rand -base64 32)]

JWT_EXPIRE
7d

PORT
5000
```

- [ ] Save variables
- [ ] Wait for redeploy (auto-triggered)

## 📊 Verify Backend Deployment

- [ ] Check "Deployments" tab - should show "SUCCESS"
- [ ] Click deployment to view logs
- [ ] Look for: `Server running on PORT 5000`
- [ ] Copy the Railway URL (will look like: `https://smartresumebuilder-prod.up.railway.app`)

## 🎨 Deploy Frontend

Once backend is live:

- [ ] Update frontend `.env`:
  ```
  REACT_APP_API_URL=https://[YOUR_RAILWAY_URL]/api
  ```

- [ ] Build frontend:
  ```bash
  cd frontend
  npm install --legacy-peer-deps
  npm run build
  ```

- [ ] Deploy to Netlify:
  - [ ] Login to netlify.com
  - [ ] Drag & drop `frontend/build` folder
  - [ ] OR connect GitHub for auto-deploy

## ✨ Final Testing

- [ ] Open frontend URL in browser
- [ ] Test Register page
- [ ] Test Login (should create JWT token)
- [ ] Test Resume Builder
- [ ] Test PDF Download
- [ ] Check browser console for any errors

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Build fails immediately | Check `package.json` syntax, remove node_modules |
| MongoDB connection timeout | Verify credentials, check MongoDB Atlas whitelist |
| API calls fail from frontend | Verify REACT_APP_API_URL in frontend .env matches Railway URL |
| PDF download broken | Check backend PDFKit installation, test locally first |
| 502 Bad Gateway | Check backend logs, ensure server starts correctly |

## 📝 Important Notes

- Railway automatically assigns a PORT - code handles this
- MongoDB Atlas needs `%40` for @ symbol (already encoded in MONGODB_URI)
- Never push `.env` files to GitHub
- JWT_SECRET should be different for production
- Accessing React app initially slow? That's normal - Railway spins down when inactive

---

## 🎯 Quick Command Reference

```bash
# Local testing before deployment
cd backend
npm install
npm start

# In another terminal
cd frontend
npm install --legacy-peer-deps
npm start

# Build for production
cd frontend
npm run build

# Push to GitHub (from root)
git add .
git commit -m "Deployment ready"
git push origin main

# View Railway logs
# Go to railway.app → Your Project → Deployments → View Logs
```

## ✅ Success Indicators

✅ You'll know deployment is successful when:
1. Railway shows "SUCCESS" badge on deployment
2. Railway provides a public URL (ends with .up.railway.app)
3. Frontend loads without CORS errors
4. Can register/login and create resumes
5. PDF download works
6. Backend logs show no errors

---

**Last Updated:** March 2026
**Status:** Ready for Production Deployment
