# 🔍 "Error Registering User" - Debugging Guide

## Step 1: Check Backend Health
```bash
# Railway URL खोलो browser में और यह URL visit करो:
https://your-railway-url.up.railway.app/api/health

# इस तरह का response आना चाहिए:
{
  "status": "Server is running",
  "timestamp": "2026-03-14T...",
  "mongodb": "Connected ✅",
  "environment": "production",
  "jwtConfigured": "Yes ✅"
}
```

### अगर MongoDB disconnected है ❌
→ Railway Variables में `MONGODB_URI` गलत है
→ MongoDB Atlas whitelist में Railway IP add करो (या 0.0.0.0/0 allow करो)

### अगर JWT not configured है ❌
→ Railway Variables में `JWT_SECRET` add नहीं करी है
→ Add करो Rails dashboard में

---

## Step 2: Check Frontend Console
Browser में:
1. **Right-click → Inspect (F12)**
2. **Console tab खोलो**
3. Signup form submit करो
4. Console में दिखने वाला error screenshot लो

Common errors:

| Error | Solution |
|-------|----------|
| `CORS error` | Backend CORS configuration ठीक नहीं |
| `404 /api/auth/register` | API route load नहीं हुआ |
| `NetworkError` | Backend offline या unreachable |
| `JWT_SECRET not set` on backend | Railway Variables missing |

---

## Step 3: Check Browser Network Tab
1. **F12 → Network tab**
2. Signup करो
3. **POST /api/auth/register** request खोलो
4. **Response** tab देखो

### Expected Status: 
- ✅ 201 Created = Success
- ⚠️ 400 Bad Request = Form data issue
- ❌ 500 Internal Server Error = Backend crash

---

## Step 4: Check Railway Logs
1. Railway Dashboard → Your Project
2. **Deployments** tab
3. Latest deployment click करो
4. **View Logs** button

Look for:
```
❌ MONGODB_URI missing
❌ Cannot read property of undefined
❌ bcryptjs error
✅ MongoDB Connected Successfully
```

---

## Required Environment Variables (Railway)

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-123
JWT_EXPIRE=7d
PORT=5000
SERVE_FRONTEND=true
```

**All 6 must be set!**

---

## Common Fixes

### Fix 1: Restart Railway
- Go to Railway Dashboard
- Click **Deploy** button again
- Wait for SUCCESS ✅

### Fix 2: Clear Browser Cache
```bash
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```
Then check **Cookies and Cached Images** and clear.

### Fix 3: Check MongoDB Atlas
1. Login to mongodb.com
2. Go to your Cluster
3. **Network Access** section
4. Check if 0.0.0.0/0 is whitelisted
5. If not → Add IP Address → 0.0.0.0/0

### Fix 4: Verify Database String
Run this and verify output matches:
```bash
mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority
```

IMPORTANT: Must have `%40` not `@`

---

## Test Commands (after fixes)

### Test 1: Health Check
```bash
curl https://your-railway-url/api/health
```

### Test 2: Register
```bash
curl -X POST https://your-railway-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

Should return:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "fullName": "Test User",
    "email": "test@example.com"
  }
}
```

---

## Still Not Working?

1. **Commit latest changes:**
   ```bash
   git add .
   git commit -m "Add better error logging"
   git push origin main
   ```

2. **Railway will auto-redeploy**

3. **Try again and send me:**
   - Railway health check response
   - Console error screenshot
   - Network tab POST response
   - Railway logs output
