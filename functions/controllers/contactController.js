const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Email transporter - only create if credentials are provided
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} else {
  console.log('Email notification disabled: EMAIL_USER and/or EMAIL_PASSWORD not set');
}

exports.getContacts = async (req, res) => {
  try {
    const snapshot = await Contact.orderBy('created_at', 'desc').get();
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      created_at: new Date()
    };
    const docRef = await Contact.add(contactData);
    const contact = {
      id: docRef.id,
      ...contactData
    };
    
    // Send email notification (only if transporter is configured)
    if (transporter && process.env.EMAIL_TO) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        replyTo: req.body.email,
        subject: `New Contact Message from ${req.body.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${req.body.message}</p>
          <hr>
          <p><em>Reply directly to this email to respond to ${req.body.name}</em></p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email error:', error.message);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    } else {
      console.log('Email notification skipped: Email service not configured');
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

