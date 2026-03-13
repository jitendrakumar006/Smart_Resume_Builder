# 🚀 Quick Start Guide - Smart Resume Builder

## ⚡ 5-Minute Quick Start

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Step 1: Backend Setup (2 minutes)
```bash
cd Smart_Resume_Builder/backend

npm install

npm start
```
✅ Backend running on http://localhost:5000

### Step 2: Frontend Setup (2 minutes)
Open a **new terminal**:
```bash
cd Smart_Resume_Builder/frontend

npm install

npm start
```
✅ Frontend will open on http://localhost:3000

### Step 3: Start Building Resumes! (1 minute)
1. Click "Sign Up"
2. Create your account
3. Fill in your resume information
4. Watch live preview
5. Download as PDF

## 🎯 First Resume Steps

1. **Sign Up** → Use any email for testing
2. **Fill Personal Details** → Add your name and contact info
3. **Add Education** → Click "+ Add Education"
4. **Add Skills** → Click "+ Add Skill Category"
5. **Add Experience** → Click "+ Add Experience"
6. **Save** → Click "💾 Save Resume"
7. **Download** → Click "📥 Download PDF"

## ✨ Try Different Templates

After saving, switch templates by clicking:
- Professional (default)
- Modern (colorful)
- Simple (minimalist)

## ⚙️ Troubleshooting Quick Fixes

### Backend won't start?
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux

# Kill process if needed and restart
```

### MongoDB connection error?
```bash
# Start MongoDB
mongod

# Or start the service (Windows)
net start MongoDB
```

### React won't compile?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📲 Access the App

**Frontend (UI):** http://localhost:3000
**Backend (API):** http://localhost:5000/api

## 📊 Test the Features

### Test Authentication
- Register with test email
- Try logging out and logging back in
- Create multiple accounts

### Test Resume Building
- Fill all sections
- Switch templates - preview updates live
- Save multiple resumes
- Delete resumes

### Test PDF Download
- Save a resume
- Click Download PDF
- Open the downloaded file

## 🎨 Customize

**Change colors/fonts:** Edit `frontend/src/styles/`.css files

**Change templates:** Edit `frontend/src/components/ResumePreview.js`

**Change form fields:** Edit `frontend/src/components/ResumeForm.js`

## 📚 Project Structure Overview

```
Smart_Resume_Builder/
├── backend/          → Express API server
│   ├── models/       → Database schemas
│   ├── routes/       → API endpoints
│   ├── controllers/  → Business logic
│   └── server.js     → Main file
├── frontend/         → React web app
│   ├── src/
│   │   ├── pages/    → Page components
│   │   ├── components/ → Reusable components
│   │   └── styles/   → CSS files
│   └── index.js      → Entry point
└── README.md         → Full documentation
```

## 🔑 Important Files to Know

**Backend:**
- `backend/server.js` - Start here
- `backend/.env` - Configuration
- `backend/models/User.js` - User schema
- `backend/models/Resume.js` - Resume schema

**Frontend:**
- `frontend/src/App.js` - Main component
- `frontend/src/pages/ResumeBuilder.js` - Main page
- `frontend/src/utils/api.js` - API calls

## 💻 Environment Files

**backend/.env**
```
MONGODB_URI=mongodb://localhost:27017/smart-resume-builder
PORT=5000
JWT_SECRET=test-secret-key
JWT_EXPIRE=7d
NODE_ENV=development
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📞 Need Help?

Check these files for more info:
- [README.md](./README.md) - Full documentation
- [Backend folder](./backend/) - See server code
- [Frontend folder](./frontend/) - See React code

## 🎉 You're All Set!

Your Smart Resume Builder is ready to use. Happy resume building! 🎓

---
**Questions?** Check the main README.md for detailed documentation.
