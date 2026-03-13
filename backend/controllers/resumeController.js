/**
 * Resume Controller
 * Handles resume CRUD operations and PDF generation
 */

const Resume = require('../models/Resume');
const PDFDocument = require('pdfkit');

// Create or Update Resume
exports.createOrUpdateResume = async (req, res) => {
  try {
    const { personalDetails, education, skills, experience, projects, certifications, template, resumeName } = req.body;
    const userId = req.user.id;

    let resume = await Resume.findOne({ userId, resumeName });

    if (resume) {
      // Update existing resume
      resume.personalDetails = personalDetails;
      resume.education = education;
      resume.skills = skills;
      resume.experience = experience;
      resume.projects = projects;
      resume.certifications = certifications;
      resume.template = template;
      resume.updatedAt = new Date();
      await resume.save();

      res.status(200).json({
        success: true,
        message: 'Resume updated successfully',
        resume,
      });
    } else {
      // Create new resume
      resume = await Resume.create({
        userId,
        resumeName,
        template,
        personalDetails,
        education,
        skills,
        experience,
        projects,
        certifications,
      });

      res.status(201).json({
        success: true,
        message: 'Resume created successfully',
        resume,
      });
    }
  } catch (err) {
    console.error('Resume Error:', err);
    res.status(500).json({ message: 'Error saving resume', error: err.message });
  }
};

// Get all resumes for a user
exports.getResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (err) {
    console.error('Get Resumes Error:', err);
    res.status(500).json({ message: 'Error fetching resumes', error: err.message });
  }
};

// Get single resume
exports.getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (err) {
    console.error('Get Resume Error:', err);
    res.status(500).json({ message: 'Error fetching resume', error: err.message });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (err) {
    console.error('Delete Resume Error:', err);
    res.status(500).json({ message: 'Error deleting resume', error: err.message });
  }
};

// Generate PDF
exports.generatePDF = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const pdf = new PDFDocument({ bufferPages: true, size: 'A4' });
    let filename = `${resume.personalDetails.fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe to response
    pdf.pipe(res);

    // Generate PDF based on template
    generatePDFContent(pdf, resume);

    pdf.end();
  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ message: 'Error generating PDF', error: err.message });
  }
};

// Generate PDF Content based on template
function generatePDFContent(pdf, resume) {
  const { personalDetails, education, skills, experience, projects, certifications, template } = resume;

  // Set default font
  pdf.fontSize(25).font('Helvetica-Bold');

  // Header with Name
  pdf.text(personalDetails.fullName, { align: 'center' });
  pdf.fontSize(11).font('Helvetica').moveDown(0.2);
  
  // Contact Info
  const contactInfo = [
    personalDetails.email,
    personalDetails.phoneNumber,
    personalDetails.address,
  ]
    .filter(Boolean)
    .join(' | ');
  pdf.text(contactInfo, { align: 'center' });
  pdf.moveDown(0.8);

  // Draw horizontal line
  pdf.moveTo(50, pdf.y).lineTo(545, pdf.y).stroke().moveDown(0.5);

  // Professional Summary
  if (personalDetails.profileSummary) {
    pdf.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
    pdf.fontSize(11).font('Helvetica').text(personalDetails.profileSummary);
    pdf.moveDown(0.5);
  }

  // Experience
  if (experience && experience.length > 0) {
    pdf.fontSize(14).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE');
    experience.forEach((job, index) => {
      if (pdf.y > 700) pdf.addPage();
      pdf.fontSize(12).font('Helvetica-Bold').text(job.jobTitle);
      pdf.fontSize(11).font('Helvetica').text(`${job.company} | ${job.startDate} - ${job.currentlyWorking ? 'Present' : job.endDate}`);
      pdf.fontSize(10).text(job.description || '');
      pdf.moveDown(0.3);
    });
    pdf.moveDown(0.5);
  }

  // Education
  if (education && education.length > 0) {
    pdf.fontSize(14).font('Helvetica-Bold').text('EDUCATION');
    education.forEach((edu) => {
      if (pdf.y > 700) pdf.addPage();
      pdf.fontSize(12).font('Helvetica-Bold').text(edu.degree);
      pdf.fontSize(11).font('Helvetica').text(`${edu.institution} | ${edu.field}`);
      if (edu.startDate) {
        pdf.fontSize(10).text(`${edu.startDate} - ${edu.endDate}`);
      }
      pdf.moveDown(0.3);
    });
    pdf.moveDown(0.5);
  }

  // Skills
  if (skills && skills.length > 0) {
    pdf.fontSize(14).font('Helvetica-Bold').text('SKILLS');
    skills.forEach((skillGroup) => {
      if (pdf.y > 700) pdf.addPage();
      pdf.fontSize(11).font('Helvetica-Bold').text(`${skillGroup.category}:`);
      pdf.fontSize(10).font('Helvetica').text(skillGroup.items.join(', '));
      pdf.moveDown(0.3);
    });
    pdf.moveDown(0.5);
  }

  // Projects
  if (projects && projects.length > 0) {
    pdf.fontSize(14).font('Helvetica-Bold').text('PROJECTS');
    projects.forEach((project) => {
      if (pdf.y > 700) pdf.addPage();
      pdf.fontSize(12).font('Helvetica-Bold').text(project.projectName);
      pdf.fontSize(10).font('Helvetica').text(project.description || '');
      if (project.technologies) {
        pdf.text(`Technologies: ${project.technologies.join(', ')}`);
      }
      pdf.moveDown(0.3);
    });
    pdf.moveDown(0.5);
  }

  // Certifications
  if (certifications && certifications.length > 0) {
    pdf.fontSize(14).font('Helvetica-Bold').text('CERTIFICATIONS');
    certifications.forEach((cert) => {
      if (pdf.y > 700) pdf.addPage();
      pdf.fontSize(12).font('Helvetica-Bold').text(cert.certificationName);
      pdf.fontSize(10).font('Helvetica').text(`${cert.issuer} | ${cert.issueDate}`);
      pdf.moveDown(0.3);
    });
  }
}
