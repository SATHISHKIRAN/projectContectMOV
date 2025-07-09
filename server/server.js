// Added nodemailer for sending emails
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer transporter with SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP host for Gmail
  port: 587, // SMTP port for TLS
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable
    pass: process.env.EMAIL_PASS  // Use environment variable
  }
});

// POST endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Log the received data
  console.log('Contact form submission received:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Prepare email options for site owner
  const mailOptions = {
    from: '"Contact Form" <contentmovin@gmail.com>',
    to: 'contentmovin@gmail.com',
    subject: 'New Contact Form Submission',
    text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `
  };

  // Prepare thank you email options for client
  const thankYouMailOptions = {
    from: '"Content.in" <contentmovin@gmail.com>',
    to: email,
    subject: 'Thank you for contacting Content.in',
    text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nContent.in Team`,
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
      <p>Best regards,<br/>Content.in Team</p>
    `
  };

  try {
    // Send email to site owner
    await transporter.sendMail(mailOptions);

    // Respond to client immediately
    res.json({ message: 'Thank you for contacting us! We will get back to you soon.' });

    // Send thank you email to client asynchronously
    transporter.sendMail(thankYouMailOptions)
      .then(() => {
        console.log('Thank you email sent to client:', email);
      })
      .catch(clientEmailError => {
        console.error('Error sending thank you email to client:', clientEmailError);
      });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// POST endpoint to handle newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ error: 'Please provide an email address.' });
  }

  // Log the subscription request
  console.log('Newsletter subscription received:', email);

  // Here you can add logic to save the email to a database or mailing list service
  // For demonstration, we just simulate success

  // Optionally, send a confirmation email to the subscriber
  const confirmationMailOptions = {
    from: '"Content.in" <contentmovin@gmail.com>',
    to: email,
    subject: 'Thank you for subscribing to Content.in Newsletter',
    text: `Dear subscriber,\n\nThank you for subscribing to our newsletter. We will keep you updated with the latest news and offers.\n\nBest regards,\nContent.in Team`,
    html: `
      <p>Dear subscriber,</p>
      <p>Thank you for subscribing to our newsletter. We will keep you updated with the latest news and offers.</p>
      <p>Best regards,<br/>Content.in Team</p>
    `
  };

  try {
    await transporter.sendMail(confirmationMailOptions);
    res.json({ message: 'Thank you for subscribing to our newsletter!' });
  } catch (error) {
    console.error('Error sending subscription confirmation email:', error);
    res.status(500).json({ error: 'Failed to send confirmation email. Please try again later.' });
  }
});
app.get('/', (req, res) => {
  res.send('✅ Backend API Server for Content.in is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
