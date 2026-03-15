# Railway Variables - CORRECT Setup

## ✅ Add ONLY ये variables (बाकी Railway auto-handle करेगा):

```
MONGODB_URI = mongodb+srv://Jitendra007:Shiv%40007@cluster0.248qsfx.mongodb.net/smart-resume-db?retryWrites=true&w=majority

JWT_SECRET = super-secret-production-key-minimum-32-chars-long

JWT_EXPIRE = 7d

NODE_ENV = production

SERVE_FRONTEND = true
```

## ❌ ये REMOVE करो:

```
PORT = 8080  ← Railway automatically assign करता है!
```

## क्यों?

Railway automatically एक PORT assign करता है (usually 8080 या कोई और)।
अगर हम manually PORT set करते हैं तो validation error आता है।

## Server Code:

```javascript
// Express automatically Railway के assigned PORT को use करेगा
const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

Railway का `PORT` environment variable automatically pass होगा।
हमें manually set करने की जरूरत नहीं!

## Railway Dashboard में करो:

1. **Your Project** → **Variables** tab
2. अगर `PORT` variable है तो **DELETE** करो
3. बाकी 5 variables सही हों:
   - ✅ MONGODB_URI
   - ✅ JWT_SECRET
   - ✅ JWT_EXPIRE
   - ✅ NODE_ENV
   - ✅ SERVE_FRONTEND
4. **Save** दबाओ

Railway auto-redeploy करेगा!
