/**
 * Resume Preview Component
 * Displays live preview of resume in selected template
 */

import React from 'react';
import '../styles/resumePreview.css';

function ResumePreview({ resumeData, template }) {
  const { personalDetails, education, experience, skills, projects, certifications } = resumeData;

  return (
    <div className={`resume-preview template-${template}`}>
      {/* Modern Template */}
      {template === 'modern' && (
        <div className="modern-template">
          <div className="header-modern">
            <div className="header-content">
              <h1>{personalDetails.fullName || 'Your Name'}</h1>
              <p className="contact-info">
                {personalDetails.email && <span>{personalDetails.email}</span>}
                {personalDetails.phoneNumber && <span>•</span>}
                {personalDetails.phoneNumber && <span>{personalDetails.phoneNumber}</span>}
                {personalDetails.address && <span>•</span>}
                {personalDetails.address && <span>{personalDetails.address}</span>}
              </p>
            </div>
          </div>

          <div className="content-modern">
            {personalDetails.profileSummary && (
              <section className="section-modern">
                <h2>Professional Summary</h2>
                <p>{personalDetails.profileSummary}</p>
              </section>
            )}

            {experience && experience.length > 0 && (
              <section className="section-modern">
                <h2>Professional Experience</h2>
                {experience.map((job, index) => (
                  <div key={index} className="item-modern">
                    <div className="item-header">
                      <h3>{job.jobTitle}</h3>
                      <span className="date">
                        {job.startDate} - {job.currentlyWorking ? 'Present' : job.endDate}
                      </span>
                    </div>
                    <p className="company">{job.company}</p>
                    <p className="description">{job.description}</p>
                  </div>
                ))}
              </section>
            )}

            {education && education.length > 0 && (
              <section className="section-modern">
                <h2>Education</h2>
                {education.map((edu, index) => (
                  <div key={index} className="item-modern">
                    <div className="item-header">
                      <h3>{edu.degree}</h3>
                      <span className="date">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="company">{edu.institution}</p>
                    <p className="field">{edu.field}</p>
                    <p className="description">{edu.description}</p>
                  </div>
                ))}
              </section>
            )}

            {skills && skills.length > 0 && (
              <section className="section-modern">
                <h2>Skills</h2>
                <div className="skills-grid">
                  {skills.map((skillGroup, index) => (
                    <div key={index} className="skill-category">
                      <h4>{skillGroup.category}</h4>
                      <p>{skillGroup.items.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects && projects.length > 0 && (
              <section className="section-modern">
                <h2>Projects</h2>
                {projects.map((project, index) => (
                  <div key={index} className="item-modern">
                    <div className="item-header">
                      <h3>{project.projectName}</h3>
                    </div>
                    <p className="description">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="tech">
                        <strong>Tech Stack:</strong> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="section-modern">
                <h2>Certifications</h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="item-modern">
                    <div className="item-header">
                      <h3>{cert.certificationName}</h3>
                      <span className="date">{cert.issueDate}</span>
                    </div>
                    <p className="company">{cert.issuer}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      )}

      {/* Professional Template */}
      {template === 'professional' && (
        <div className="professional-template">
          <div className="header-prof">
            <h1>{personalDetails.fullName || 'Your Name'}</h1>
            <p className="contact">
              {personalDetails.email && <span>{personalDetails.email}</span>}
              {personalDetails.phoneNumber && <span> | {personalDetails.phoneNumber}</span>}
              {personalDetails.address && <span> | {personalDetails.address}</span>}
            </p>
            <hr />
          </div>

          <div className="content-prof">
            {personalDetails.profileSummary && (
              <section className="section-prof">
                <h2>PROFESSIONAL SUMMARY</h2>
                <p>{personalDetails.profileSummary}</p>
              </section>
            )}

            {experience && experience.length > 0 && (
              <section className="section-prof">
                <h2>PROFESSIONAL EXPERIENCE</h2>
                {experience.map((job, index) => (
                  <div key={index} className="item-prof">
                    <h3>{job.jobTitle}</h3>
                    <p className="company-date">
                      {job.company} | {job.startDate} - {job.currentlyWorking ? 'Present' : job.endDate}
                    </p>
                    <p className="description">{job.description}</p>
                  </div>
                ))}
              </section>
            )}

            {education && education.length > 0 && (
              <section className="section-prof">
                <h2>EDUCATION</h2>
                {education.map((edu, index) => (
                  <div key={index} className="item-prof">
                    <h3>{edu.degree} in {edu.field}</h3>
                    <p className="company-date">
                      {edu.institution} | {edu.startDate} - {edu.endDate}
                    </p>
                    <p className="description">{edu.description}</p>
                  </div>
                ))}
              </section>
            )}

            {skills && skills.length > 0 && (
              <section className="section-prof">
                <h2>SKILLS</h2>
                {skills.map((skillGroup, index) => (
                  <div key={index} className="skill-item">
                    <strong>{skillGroup.category}:</strong> {skillGroup.items.join(', ')}
                  </div>
                ))}
              </section>
            )}

            {projects && projects.length > 0 && (
              <section className="section-prof">
                <h2>PROJECTS</h2>
                {projects.map((project, index) => (
                  <div key={index} className="item-prof">
                    <h3>{project.projectName}</h3>
                    <p className="description">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <p>
                        <strong>Technologies:</strong> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="section-prof">
                <h2>CERTIFICATIONS</h2>
                {certifications.map((cert, index) => (
                  <div key={index} className="item-prof">
                    <h3>{cert.certificationName}</h3>
                    <p className="company-date">{cert.issuer} | {cert.issueDate}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      )}

      {/* Simple Template */}
      {template === 'simple' && (
        <div className="simple-template">
          <div className="header-simple">
            <h1>{personalDetails.fullName || 'Your Name'}</h1>
            <p>
              {personalDetails.email} | {personalDetails.phoneNumber} | {personalDetails.address}
            </p>
          </div>

          <div className="content-simple">
            {personalDetails.profileSummary && (
              <section className="section-simple">
                <h3>PROFESSIONAL SUMMARY</h3>
                <p>{personalDetails.profileSummary}</p>
              </section>
            )}

            {experience && experience.length > 0 && (
              <section className="section-simple">
                <h3>PROFESSIONAL EXPERIENCE</h3>
                {experience.map((job, index) => (
                  <div key={index}>
                    <p>
                      <strong>{job.jobTitle}</strong> at <strong>{job.company}</strong>
                    </p>
                    <p className="date">{job.startDate} - {job.currentlyWorking ? 'Present' : job.endDate}</p>
                    <p>{job.description}</p>
                  </div>
                ))}
              </section>
            )}

            {education && education.length > 0 && (
              <section className="section-simple">
                <h3>EDUCATION</h3>
                {education.map((edu, index) => (
                  <div key={index}>
                    <p>
                      <strong>{edu.degree}</strong> in <strong>{edu.field}</strong>
                    </p>
                    <p className="date">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                    <p>{edu.description}</p>
                  </div>
                ))}
              </section>
            )}

            {skills && skills.length > 0 && (
              <section className="section-simple">
                <h3>SKILLS</h3>
                {skills.map((skillGroup, index) => (
                  <p key={index}>
                    <strong>{skillGroup.category}:</strong> {skillGroup.items.join(', ')}
                  </p>
                ))}
              </section>
            )}

            {projects && projects.length > 0 && (
              <section className="section-simple">
                <h3>PROJECTS</h3>
                {projects.map((project, index) => (
                  <div key={index}>
                    <p>
                      <strong>{project.projectName}</strong>
                    </p>
                    <p>{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <p>
                        <strong>Stack:</strong> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="section-simple">
                <h3>CERTIFICATIONS</h3>
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <p>
                      <strong>{cert.certificationName}</strong> - {cert.issuer} ({cert.issueDate})
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;
