const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');

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
    console.log('Received contact form submission:', req.body);
    
    const contactData = {
      ...req.body,
      created_at: new Date()
    };
    const docRef = await Contact.add(contactData);
    const contact = {
      id: docRef.id,
      ...contactData
    };
    
    console.log('Contact data saved successfully with ID:', docRef.id);
    
    // Send email notification asynchronously (only if Resend is configured)
    if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      console.log('Attempting to send email notification via Resend...');
      
      // Send email in the background without waiting for it
      (async () => {
        try {
          await sendContactEmail({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError.message);
        }
      })();
    } else {
      console.log('Email notification skipped: Resend service not configured');
    }

    res.json(contact);
  } catch (error) {
    console.error('Error saving contact:', error.message);
    res.status(500).json({ error: error.message });
  }
};
