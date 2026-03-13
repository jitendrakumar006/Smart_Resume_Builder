/**
 * Resume Form Component
 * Handles all form inputs for resume data
 */

import React, { useState } from 'react';
import '../styles/resumeForm.css';

function ResumeForm({ resumeData, onChange }) {
  const [expandedSections, setExpandedSections] = useState({
    personalDetails: true,
    education: true,
    skills: true,
    experience: true,
    projects: false,
    certifications: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePersonalDetailsChange = (field, value) => {
    onChange({
      ...resumeData,
      personalDetails: {
        ...resumeData.personalDetails,
        [field]: value,
      },
    });
  };

  const handleTemplateChange = (template) => {
    onChange({
      ...resumeData,
      template,
    });
  };

  const handleResumeNameChange = (name) => {
    onChange({
      ...resumeData,
      resumeName: name,
    });
  };

  // Education handlers
  const addEducation = () => {
    onChange({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          degree: '',
          institution: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index][field] = value;
    onChange({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const removeEducation = (index) => {
    onChange({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  };

  // Skills handlers
  const addSkillCategory = () => {
    onChange({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          category: '',
          items: [],
        },
      ],
    });
  };

  const updateSkillCategory = (index, field, value) => {
    const updatedSkills = [...resumeData.skills];
    if (field === 'items') {
      updatedSkills[index].items = value.split(',').map((item) => item.trim());
    } else {
      updatedSkills[index][field] = value;
    }
    onChange({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const removeSkill = (index) => {
    onChange({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  // Experience handlers
  const addExperience = () => {
    onChange({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: '',
        },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index][field] = value;
    onChange({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const removeExperience = (index) => {
    onChange({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  };

  // Projects handlers
  const addProject = () => {
    onChange({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          projectName: '',
          description: '',
          technologies: [],
          link: '',
          startDate: '',
          endDate: '',
        },
      ],
    });
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    if (field === 'technologies') {
      updatedProjects[index].technologies = value.split(',').map((item) => item.trim());
    } else {
      updatedProjects[index][field] = value;
    }
    onChange({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const removeProject = (index) => {
    onChange({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index),
    });
  };

  // Certifications handlers
  const addCertification = () => {
    onChange({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          certificationName: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialId: '',
        },
      ],
    });
  };

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index][field] = value;
    onChange({
      ...resumeData,
      certifications: updatedCertifications,
    });
  };

  const removeCertification = (index) => {
    onChange({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="resume-form">
      <div className="form-section-header">
        <h2>📝 Resume Details</h2>
      </div>

      {/* Resume Name and Template Selection */}
      <div className="form-group-top">
        <div className="form-group">
          <label>Resume Name</label>
          <input
            type="text"
            value={resumeData.resumeName}
            onChange={(e) => handleResumeNameChange(e.target.value)}
            placeholder="e.g., My Resume, Cover Letter"
          />
        </div>

        <div className="form-group">
          <label>Template</label>
          <div className="template-selector">
            {['professional', 'modern', 'simple'].map((tmpl) => (
              <button
                key={tmpl}
                className={`template-btn ${resumeData.template === tmpl ? 'active' : ''}`}
                onClick={() => handleTemplateChange(tmpl)}
              >
                {tmpl.charAt(0).toUpperCase() + tmpl.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="collapsible-section">
        <div
          className="section-header"
          onClick={() => toggleSection('personalDetails')}
        >
          <h3>👤 Personal Details</h3>
          <span className="toggle-icon">{expandedSections.personalDetails ? '▼' : '▶'}</span>
        </div>
        {expandedSections.personalDetails && (
          <div className="section-content">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={resumeData.personalDetails.fullName}
                  onChange={(e) => handlePersonalDetailsChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={resumeData.personalDetails.email}
                  onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={resumeData.personalDetails.phoneNumber}
                  onChange={(e) => handlePersonalDetailsChange('phoneNumber', e.target.value)}
                  placeholder="+1-234-567-8900"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={resumeData.personalDetails.address}
                  onChange={(e) => handlePersonalDetailsChange('address', e.target.value)}
                  placeholder="City, State, Country"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                value={resumeData.personalDetails.profileSummary}
                onChange={(e) => handlePersonalDetailsChange('profileSummary', e.target.value)}
                placeholder="Brief summary about yourself..."
                rows="3"
              />
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => toggleSection('education')}>
          <h3>🎓 Education</h3>
          <span className="toggle-icon">{expandedSections.education ? '▼' : '▶'}</span>
        </div>
        {expandedSections.education && (
          <div className="section-content">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="item-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="B.Tech, M.S., etc."
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="form-group-small">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group-small">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    placeholder="Additional details..."
                    rows="2"
                  />
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeEducation(index)}
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addEducation}>
              + Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => toggleSection('skills')}>
          <h3>🔧 Skills</h3>
          <span className="toggle-icon">{expandedSections.skills ? '▼' : '▶'}</span>
        </div>
        {expandedSections.skills && (
          <div className="section-content">
            {resumeData.skills.map((skillGroup, index) => (
              <div key={index} className="item-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Skill Category</label>
                    <input
                      type="text"
                      value={skillGroup.category}
                      onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                      placeholder="e.g., Programming Languages"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Skills (comma-separated)</label>
                  <input
                    type="text"
                    value={skillGroup.items.join(', ')}
                    onChange={(e) => updateSkillCategory(index, 'items', e.target.value)}
                    placeholder="JavaScript, React, Node.js, etc."
                  />
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeSkill(index)}
                >
                  Remove Skill Category
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addSkillCategory}>
              + Add Skill Category
            </button>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => toggleSection('experience')}>
          <h3>💼 Experience</h3>
          <span className="toggle-icon">{expandedSections.experience ? '▼' : '▶'}</span>
        </div>
        {expandedSections.experience && (
          <div className="section-content">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="item-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-small">
                    <label>Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group-small">
                    <label>End Date</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      disabled={exp.currentlyWorking}
                    />
                  </div>
                  <div className="form-group-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={exp.currentlyWorking}
                        onChange={(e) => updateExperience(index, 'currentlyWorking', e.target.checked)}
                      />
                      Currently Working
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows="3"
                  />
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeExperience(index)}
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addExperience}>
              + Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => toggleSection('projects')}>
          <h3>🚀 Projects</h3>
          <span className="toggle-icon">{expandedSections.projects ? '▼' : '▶'}</span>
        </div>
        {expandedSections.projects && (
          <div className="section-content">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="item-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={project.projectName}
                      onChange={(e) => updateProject(index, 'projectName', e.target.value)}
                      placeholder="Project Name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    placeholder="Project description..."
                    rows="2"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Technologies</label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Link</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeProject(index)}
                >
                  Remove Project
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addProject}>
              + Add Project
            </button>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="collapsible-section">
        <div className="section-header" onClick={() => toggleSection('certifications')}>
          <h3>📜 Certifications</h3>
          <span className="toggle-icon">{expandedSections.certifications ? '▼' : '▶'}</span>
        </div>
        {expandedSections.certifications && (
          <div className="section-content">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="item-card">
                <div className="form-row">
                  <div className="form-group">
                    <label>Certification Name</label>
                    <input
                      type="text"
                      value={cert.certificationName}
                      onChange={(e) => updateCertification(index, 'certificationName', e.target.value)}
                      placeholder="Certification Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuer</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      placeholder="Issuing Organization"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-small">
                    <label>Issue Date</label>
                    <input
                      type="month"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(index, 'issueDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group-small">
                    <label>Expiry Date</label>
                    <input
                      type="month"
                      value={cert.expiryDate}
                      onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Credential ID</label>
                    <input
                      type="text"
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                      placeholder="Optional credential ID"
                    />
                  </div>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeCertification(index)}
                >
                  Remove Certification
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addCertification}>
              + Add Certification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeForm;
