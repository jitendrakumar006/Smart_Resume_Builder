# 🔧 Troubleshooting Guide

Solutions for common issues you might encounter while running Smart Resume Builder.

## Backend Issues

### Issue: MongoDB Connection Failed

**Error:**
```
❌ MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. **Start MongoDB service:**
   ```bash
   # Windows (if installed as service)
   net start MongoDB
   
   # Windows (Start from cmd)
   mongod
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. **Check MongoDB is running:**
   ```bash
   # Windows
   tasklist | findstr mongo
   
   # Mac/Linux
   ps aux | grep mongod
   ```

3. **Verify connection string in `.env`:**
   ```
   MONGODB_URI=mongodb://localhost:27017/smart-resume-builder
   ```

4. **Check port 27017 is not in use:**
   ```bash
   # Windows
   netstat -ano | findstr :27017
   
   # Mac/Linux
   lsof -i :27017
   ```

---

### Issue: Port 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

1. **Find what's using port 5000:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```

2. **Kill the process:**
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # Mac/Linux
   kill -9 <PID>
   ```

3. **Use different port:**
   ```bash
   # Edit backend/.env
   PORT=5001
   ```

---

### Issue: Backend Won't Start

**Error:**
```
Error: Cannot find module 'express'
```

**Solutions:**

1. **Reinstall dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version:**
   ```bash
   node -v  # Should be v14 or higher
   npm -v
   ```

---

### Issue: JWT Token Expired

**Error:**
```
401 Unauthorized
Token is not valid
```

**Solutions:**

1. **Login again to get new token:**
   - Token expires after 7 days
   - Clear localStorage and login again

2. **Check token format:**
   - Token should be sent as: `Authorization: Bearer <token>`

3. **Verify JWT_SECRET in `.env`:**
   ```
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   ```

---

## Frontend Issues

### Issue: React Won't Start

**Error:**
```
npm ERR! Missing script: "start"
```

**Solutions:**

1. **Make sure you're in the frontend folder:**
   ```bash
   cd smart_resume_builder/frontend
   pwd  # or cd to verify location
   ```

2. **Reinstall dependencies:**
   ```bash
   npm install
   npm start
   ```

3. **Clear cache and try again:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

---

### Issue: Cannot Connect to Backend

**Error:**
```
Network Error: Failed to fetch
GET http://localhost:5000/api/resume 404
```

**Solutions:**

1. **Verify backend is running:**
   - Check terminal for "🚀 Server is running on http://localhost:5000"
   - Visit http://localhost:5000/api/health in browser

2. **Check API URL in frontend `.env`:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Verify CORS is enabled:**
   - Backend should have `cors()` middleware
   - Frontend and backend must match ports

4. **Reset browser cache:**
   ```bash
   # Close React development server
   # Clear browser cache (Ctrl+Shift+Delete)
   # Restart React: npm start
   ```

---

### Issue: Port 3000 Already in Use

**Error:**
```
Something is already running on port 3000
```

**Solutions:**

1. **Find process using port 3000:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Mac/Linux
   lsof -i :3000
   ```

2. **Kill the process:**
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # Mac/Linux
   kill -9 <PID>
   ```

3. **Use different port:**
   ```bash
   # Windows
   set PORT=3001 && npm start
   
   # Mac/Linux
   PORT=3001 npm start
   ```

---

### Issue: Blank White Screen

**Error:**
```
No errors but just white screen
```

**Solutions:**

1. **Check browser console for errors:**
   - F12 → Console tab
   - Look for red error messages

2. **Verify authentication:**
   - Check if token exists: `localStorage.getItem('token')`
   - If missing, go to /login page

3. **Check backend API:**
   - Open DevTools → Network tab
   - Make a request and check response
   - Look for 404 or 500 errors

4. **Delete browser cache:**
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Clear all cache
   - Refresh page

---

### Issue: Form Data Not Saving

**Error:**
```
❌ Error saving resume: 401 Token is not valid
```

**Solutions:**

1. **Login again:**
   - Token might be expired
   - Clear localStorage and login fresh

2. **Check token in localStorage:**
   ```javascript
   // In browser console
   localStorage.getItem('token')
   ```

3. **Verify backend is running:**
   - Check terminal for backend errors
   - Restart backend if needed

4. **Check MongoDB for data:**
   ```javascript
   // In MongoDB shell
   use smart-resume-builder
   db.resumes.find()
   ```

---

### Issue: PDF Download Not Working

**Error:**
```
❌ Error downloading PDF: 404 Resume not found
```

**Solutions:**

1. **Save resume first:**
   - Resume must be saved before downloading
   - Check if resume appears in left sidebar

2. **Verify resume exists in database:**
   ```javascript
   // MongoDB shell
   db.resumes.findOne({})
   ```

3. **Check backend PDF generation:**
   - Verify pdfkit is installed: `npm list pdfkit`
   - Check controller for PDF generation code
   - Look for errors in backend terminal

4. **Clear browser cache:**
   - Close and reopen browser
   - Try downloading again

---

## Database Issues

### Issue: Cannot Access MongoDB Shell

**Error:**
```
mongosh: command not found
```

**Solutions:**

1. **Install MongoDB CLI:**
   ```bash
   npm install -g mongosh
   ```

2. **Or use older mongo shell:**
   ```bash
   mongo
   ```

3. **Check MongoDB installation:**
   ```bash
   mongod --version
   ```

---

### Issue: Database Has No Data

**Error:**
```
No resumes found / Empty database
```

**Solutions:**

1. **Check database selection:**
   ```bash
   mongosh
   use smart-resume-builder
   db.resumes.find()
   ```

2. **Create test data:**
   ```bash
   db.resumes.insertOne({
     resumeName: "Test Resume",
     template: "professional"
   })
   ```

3. **Verify data is being saved:**
   - Watch MongoDB logs during save
   - Check API response in browser Network tab

---

## Authentication Issues

### Issue: Cannot Login

**Error:**
```
❌ Invalid email or password
```

**Solutions:**

1. **Verify email and password:**
   - Check caps lock
   - Verify password is correct

2. **Check if user exists:**
   ```bash
   mongosh
   use smart-resume-builder
   db.users.findOne({ email: "your-email@example.com" })
   ```

3. **Create test user:**
   - Use signup form to create new account
   - Try logging in with new account

4. **Check password hashing:**
   - Passwords must be at least 6 characters
   - Use alphanumeric + symbols for security

---

### Issue: Session Lost After Refresh

**Error:**
```
Logged in but redirected to login page after refresh
```

**Solutions:**

1. **Check localStorage:**
   ```javascript
   // Browser console
   localStorage.getItem('token')
   localStorage.getItem('user')
   ```

2. **Verify token is valid:**
   - Tokens expire after 7 days
   - Need to login again if expired

3. **Check App.js routing:**
   - Verify `useEffect` checks for token
   - Token should persist in localStorage

---

## Performance Issues

### Issue: App is Slow

**Solutions:**

1. **Optimize MongoDB queries:**
   - Add indexes on frequently queried fields
   - Limit data returned in queries

2. **Reduce bundle size:**
   ```bash
   npm run build
   npm install -g source-map-explorer
   source-map-explorer 'build/static/js/*.js'
   ```

3. **Enable compression:**
   - Add `compression` middleware in backend
   - Enable gzip in browser

4. **Use React Dev Tools:**
   - Install React Dev Tools extension
   - Check component render times
   - Look for unnecessary re-renders

---

## Common Solutions Checklist

- [ ] MongoDB is running
- [ ] Backend runs without errors
- [ ] Frontend shows no console errors
- [ ] Token exists in localStorage
- [ ] Backend and frontend ports different
- [ ] `.env` files configured correctly
- [ ] All dependencies installed
- [ ] Node.js version is v14+
- [ ] No ports in use conflict
- [ ] Database connection working

---

## Debug Mode

### Enable Verbose Logging

**Backend:**
```javascript
// In server.js
console.log('Request:', req.method, req.path);
console.log('Headers:', req.headers);
```

**Frontend:**
```javascript
// In api.js
api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

---

## Getting Help

If you can't solve the issue:

1. **Check the README.md** - Full documentation
2. **Review API_DOCUMENTATION.md** - API details
3. **Check console/terminal logs** - Error messages
4. **Search GitHub Issues** - Similar problems
5. **Ask in Stack Overflow** - Tag: node.js, react, mongodb

---

**Still stuck?** Contact the development team or check the main documentation files.
