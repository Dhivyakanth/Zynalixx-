const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send contact form email using Resend
 */
async function sendContactEmail({ name, email, phone, message }) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error('Resend is not properly configured. Please set RESEND_API_KEY and EMAIL_FROM in environment variables.');
  }

  // Determine recipient emails - can be a single email or comma-separated list
  let toEmails = process.env.EMAIL_TO ? process.env.EMAIL_TO.split(',').map(email => email.trim()) : [];
  
  // Add a default fallback email if none is configured
  if (toEmails.length === 0) {
    toEmails = ['zynalixx@gmail.com']; // Default fallback
    console.log('Using fallback email for notifications');
  }
  
  // Add an additional email if specified in environment variables
  if (process.env.ADDITIONAL_EMAIL) {
    const additionalEmails = process.env.ADDITIONAL_EMAIL.split(',').map(email => email.trim());
    toEmails = [...toEmails, ...additionalEmails];
  }

  try {
    const emailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: toEmails,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Reply directly to this email to respond to ${name}</em></p>
      `
    });

    console.log('Email sent successfully via Resend:', emailResponse.id);
    return emailResponse;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw error;
  }
}

module.exports = {
  sendContactEmail
};