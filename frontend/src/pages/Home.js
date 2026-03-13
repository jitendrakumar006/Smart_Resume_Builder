/**
 * Home Page Component
 * Landing page for authenticated users
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleStartBuilding = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>🎓 Smart Resume Builder</h1>
          <nav className="header-nav">
            <button className="nav-btn" onClick={handleStartBuilding}>
              Resume Builder
            </button>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome back, {user.fullName || 'Student'}!</h2>
          <p className="hero-subtitle">Create your professional resume in minutes</p>
          <button className="btn-cta" onClick={handleStartBuilding}>
            Start Building Your Resume →
          </button>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Smart Resume Builder?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <h3>Beautiful Templates</h3>
            <p>Choose from 3 professionally designed templates</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👁️</span>
            <h3>Live Preview</h3>
            <p>See your resume update in real-time as you type</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📥</span>
            <h3>PDF Download</h3>
            <p>Download your resume as a professional PDF</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💾</span>
            <h3>Save & Edit</h3>
            <p>Create and manage multiple resumes</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on all devices</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and private</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Fill Your Details</h3>
            <p>Enter your personal, education, and professional information</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose Template</h3>
            <p>Select from modern, professional, or simple templates</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Preview & Save</h3>
            <p>Watch the live preview and save your resume</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Download</h3>
            <p>Download your professional resume as PDF</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Smart Resume Builder. Made with ❤️ for Students.</p>
      </footer>
    </div>
  );
}

export default Home;
