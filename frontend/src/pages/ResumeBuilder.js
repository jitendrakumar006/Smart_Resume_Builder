/**
 * Resume Builder Component
 * Main component for building resumes with form and live preview
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import { resumeAPI } from '../utils/api';
import '../styles/resumeBuilder.css';

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    resumeName: 'My Resume',
    template: 'professional',
    personalDetails: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      profileSummary: '',
    },
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
  });

  const [currentResumes, setCurrentResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    loadResumes();
  }, [navigate]);

  const loadResumes = async () => {
    try {
      const response = await resumeAPI.getAll();
      setCurrentResumes(response.data.resumes);
    } catch (err) {
      console.error('Error loading resumes:', err);
    }
  };

  const handleFormDataChange = (data) => {
    setResumeData(data);
  };

  const handleSaveResume = async () => {
    setLoading(true);
    try {
      await resumeAPI.createOrUpdate(resumeData);
      setSaveMessage('✅ Resume saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      loadResumes();
    } catch (err) {
      setSaveMessage('❌ Error saving resume: ' + (err.response?.data?.message || err.message));
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      if (!selectedResumeId) {
        alert('Please save your resume first');
        return;
      }
      const response = await resumeAPI.downloadPDF(selectedResumeId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resumeData.personalDetails.fullName}_Resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error downloading PDF: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleLoadResume = async (resumeId) => {
    try {
      const response = await resumeAPI.getOne(resumeId);
      setResumeData(response.data.resume);
      setSelectedResumeId(resumeId);
    } catch (err) {
      alert('Error loading resume: ' + err.message);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.delete(resumeId);
        loadResumes();
        if (selectedResumeId === resumeId) {
          setSelectedResumeId(null);
          setResumeData({
            resumeName: 'My Resume',
            template: 'professional',
            personalDetails: {
              fullName: '',
              email: '',
              phoneNumber: '',
              address: '',
              profileSummary: '',
            },
            education: [],
            skills: [],
            experience: [],
            projects: [],
            certifications: [],
          });
        }
      } catch (err) {
        alert('Error deleting resume: ' + err.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="resume-builder">
      <header className="builder-header">
        <div className="header-content">
          <h1>🎓 Smart Resume Builder</h1>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="builder-container">
        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Your Resumes</h3>
            <div className="resume-list">
              {currentResumes.length === 0 ? (
                <p className="empty-message">No resumes yet. Create one now!</p>
              ) : (
                currentResumes.map((resume) => (
                  <div
                    key={resume._id}
                    className={`resume-item ${selectedResumeId === resume._id ? 'active' : ''}`}
                  >
                    <div className="resume-info">
                      <p className="resume-name">{resume.resumeName}</p>
                      <small className="resume-template">{resume.template}</small>
                    </div>
                    <div className="resume-actions">
                      <button
                        className="btn-small"
                        onClick={() => handleLoadResume(resume._id)}
                        title="Load Resume"
                      >
                        ✎
                      </button>
                      <button
                        className="btn-small btn-danger"
                        onClick={() => handleDeleteResume(resume._id)}
                        title="Delete Resume"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sidebar-actions">
            <button className="btn-primary btn-block" onClick={handleSaveResume} disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Resume'}
            </button>
            <button
              className="btn-secondary btn-block"
              onClick={handleDownloadPDF}
              disabled={!selectedResumeId}
            >
              📥 Download PDF
            </button>
          </div>

          {saveMessage && <div className="save-message">{saveMessage}</div>}
        </div>

        <div className="main-content">
          <div className="form-section">
            <ResumeForm resumeData={resumeData} onChange={handleFormDataChange} />
          </div>

          <div className="preview-section">
            <h3>📄 Live Preview</h3>
            <ResumePreview resumeData={resumeData} template={resumeData.template} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
