const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../services/emailService');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.createContact = async (req, res, next) => {
 try {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const subject = typeof req.body.subject === 'string' ? req.body.subject.trim() : '';
  const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
  if (name.length < 2 || name.length > 80) return res.status(400).json({ message: 'Name must be between 2 and 80 characters.' });
  if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ message: 'Please enter a valid email address.' });
  if (subject.length > 120) return res.status(400).json({ message: 'Subject must be 120 characters or fewer.' });
  if (message.length < 10 || message.length > 3000) return res.status(400).json({ message: 'Message must be between 10 and 3000 characters.' });
  if (ContactMessage.db.readyState !== 1) return res.status(503).json({ message: 'The contact service is not connected to the database yet. Please try again later.' });
  const saved = await ContactMessage.create({ name, email, subject, message });
  let emailSent = false;
  try { emailSent = (await sendContactNotification({ name, email, subject, message })).sent; } catch (mailError) { console.error('Email notification failed:', mailError.message); }
  res.status(201).json({ message: emailSent ? 'Thanks! Your message was saved and sent.' : 'Thanks! Your message was saved. Email notifications are not configured yet.', id: saved._id });
 } catch (error) { next(error); }
};
