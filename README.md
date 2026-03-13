# 🎓 Smart Resume Builder for Students

A full-stack web application that allows students to create professional resumes with live preview and PDF export functionality.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Responsive Resume Form**: Easy-to-fill form for all resume sections
- **Live Preview**: Real-time resume preview while filling the form
- **Multiple Templates**: 
  - Modern (Colorful gradient design)
  - Professional (Classic format)
  - Simple (Minimalist design)
- **PDF Export**: Download resume as PDF
- **Resume Management**: Save, edit, and delete multiple resumes
- **Mobile Friendly**: Fully responsive design for all devices
- **Database Storage**: MongoDB for persistent resume storage

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** - NoSQL Database
- **JWT** - Authentication
- **Bcryptjs** - Password Hashing
- **PDFKit** - PDF Generation
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - UI Library
- **React Router** - Navigation
- **Axios** - HTTP Client
- **CSS3** - Styling with responsive design

## 📋 Prerequisites

Before running this application, make sure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download Community Edition](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** - For version control

## 📁 Project Structure

```
Smart_Resume_Builder/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resumeController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── resumeRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeForm.js
│   │   │   └── ResumePreview.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── ResumeBuilder.js
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   ├── resumeBuilder.css
│   │   │   ├── resumeForm.css
│   │   │   └── resumePreview.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
cd Smart_Resume_Builder
```

### Step 2: Start MongoDB

Make sure MongoDB is running on your system. If using MongoDB Community Edition:

**On Windows:**
```bash
# If MongoDB is installed, start the service from Services or use:
mongod
```

**On Mac:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

### Step 3: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
# or for development with auto-reload:
npm run dev
```

The backend will start on `http://localhost:5000`

### Step 4: Setup Frontend (In a new terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will automatically open on `http://localhost:3000`

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/smart-resume-builder
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📖 How to Use

### 1. **Register/Login**
- Open the application at `http://localhost:3000`
- Click "Sign Up" to create a new account
- Enter your full name, email, and password
- If you already have an account, click "Login"

### 2. **Create Resume**
- After login, you'll be on the Resume Builder dashboard
- Fill in your personal details on the form
- Add your education, skills, experience, projects, and certifications
- Watch the live preview update in real-time

### 3. **Choose Template**
- Select from 3 available templates: Modern, Professional, or Simple
- See the preview change instantly

### 4. **Save Resume**
- Click the "💾 Save Resume" button to save your resume to the database
- You can create and manage multiple resumes

### 5. **Download as PDF**
- Click the "📥 Download PDF" button to download your resume
- The file will be saved with your name as the filename

### 6. **Manage Resumes**
- View all your saved resumes in the left sidebar
- Click the edit icon to load a resume for editing
- Click the delete icon to remove a resume
- Switch between different templates for the same resume

## 🎨 Resume Sections

The application supports the following resume sections:

1. **Personal Details**
   - Full Name*
   - Email*
   - Phone Number*
   - Address
   - Professional Summary

2. **Education**
   - Degree
   - Institution
   - Field of Study
   - Start & End Dates
   - Description

3. **Skills**
   - Skill Category (e.g., Programming Languages)
   - Multiple skills per category

4. **Professional Experience**
   - Job Title
   - Company Name
   - Start & End Dates
   - Currently Working Option
   - Job Description

5. **Projects**
   - Project Name
   - Description
   - Technologies Used
   - Project Link

6. **Certifications**
   - Certification Name
   - Issuer
   - Issue & Expiry Dates
   - Credential ID

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Resume Operations
- `POST /api/resume` - Create or update resume (Protected)
- `GET /api/resume` - Get all user's resumes (Protected)
- `GET /api/resume/:resumeId` - Get specific resume (Protected)
- `DELETE /api/resume/:resumeId` - Delete resume (Protected)
- `GET /api/resume/:resumeId/pdf` - Download resume as PDF (Protected)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the connection string in `.env`
- Default: `mongodb://localhost:27017/smart-resume-builder`

### Frontend Can't Connect to Backend
- Make sure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check CORS settings in backend

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Set `PORT=3001` in terminal before running

```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Tablets (768px - 1024px)
- Mobile devices (320px - 768px)

## 🔒 Security Features

- Password hashing with Bcryptjs
- JWT-based authentication
- Protected API routes
- Environment variables for sensitive data
- CORS enabled

## 📦 Build & Deployment

### Build Frontend for Production
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Production
You can deploy the application to various platforms:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, AWS, Azure, DigitalOcean

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media login (Google, GitHub)
- [ ] Export to different formats (Word, HTML)
- [ ] Resume templates builder customization
- [ ] AI-powered suggestions
- [ ] ATS (Applicant Tracking System) optimization
- [ ] Collaboration features
- [ ] Online resume hosting
- [ ] Version history tracking

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Review the API documentation
3. Open an issue on GitHub
4. Contact the development team

## 🎓 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)

---

**Made with ❤️ for Students**

Start building your professional resume today! 🚀
