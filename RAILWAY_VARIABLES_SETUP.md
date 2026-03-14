# 🚀 Railway Variables - Exact Setup Guide

## ❌ Problem मिला:
```
ERROR: invalid key-value pair "= JWT_EXPIRE=7d": empty key
```

**Reason:** Railway variables में format issue - extra spaces या invalid characters

---

## ✅ सही तरीका:

### **Step 1: Railway Dashboard खोलो**
1. https://railway.app में login करो
2. **Your Project** select करो
3. **Variables** tab क्लिक करो

### **Step 2: पुरानी entries को clear करो**
अगर पहले से variables हैं:
- हर variable के पास **X** button होगा
- सब को delete कर दो (fresh start के लिए)

### **Step 3: नई entries add करो**
ये exactly add करो (कोई modification नहीं):

```
Variable Name          |  Variable Value
───────────────────────┼─────────────────────────────────────────────────────────────────────────
NODE_ENV               |  production
MONGODB_URI            |  mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority
JWT_SECRET             |  secretkey123456789production
JWT_EXPIRE             |  7d
PORT                   |  5000
SERVE_FRONTEND         |  true
```

**⚠️ RULES:**
- ❌ कोई extra spaces नहीं
- ❌ कोई quotes नहीं (" या ')
- ❌ हर variable एक line पर
- ❌ Variable name में spaces नहीं
- ✅ हर variable के बाद **Save** करो

### **Step 4: Verify करو**
```
✅ NODE_ENV = production
✅ MONGODB_URI = mongodb+srv://...%40007@cluster0...
✅ JWT_SECRET = secretkey123456789production
✅ JWT_EXPIRE = 7d
✅ PORT = 5000
✅ SERVE_FRONTEND = true
```

All 6 variables visible होने चाहिए, कोई blank नहीं।

---

## 🔄 After Variables Added:

Railway automatically redeploy करेगा।

### **Check deployment status:**
1. **Deployments** tab जाओ
2. Latest deployment देखो
3. Wait for **SUCCESS** ✅ badge

---

## 🧪 Test करने के लिए:

```bash
# Health check
curl https://your-railway-url.up.railway.app/api/health

# Expected response:
{
  "status": "Server is running",
  "mongodb": "Connected ✅",
  "environment": "production",
  "jwtConfigured": "Yes ✅"
}
```

---

## ❓ अगर फिर भी error आए:

**Error:** `invalid key-value pair`
- **Fix:** Railway dashboard में हर variable को clear करो
- फिर से fresh add करो
- Spaces का ध्यान रखो

**Error:** `ENOENT: no such file or directory`
- **Fix:** सब files commit करके push करो
  ```bash
  git add -A
  git commit -m "Fix environment setup"
  git push origin main
  ```

**Error:** `JWT_SECRET not found`
- **Fix:** Railway Variables में JWT_SECRET की value blank है
- Value add करो: `secretkey123456789production`

---

## 📋 Checklist:

- [ ] Railway dashboard में **Variables** tab खुला है
- [ ] पुरानी entries clear कर दीं
- [ ] नई 6 variables add कीं
- [ ] कोई spaces/quotes नहीं हैं
- [ ] **Save** button press किया
- [ ] Deployments tab में SUCCESS ✅ दिख रहा है
- [ ] Health check endpoint काम कर रहा है

---

## 🎯 Next Steps:

1. Variables सही तरीके से add करो
2. Railway को redeploy करने दो
3. Health check test करो
4. अब signup try करो

**Success! 🚀**
