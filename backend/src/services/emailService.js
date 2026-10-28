const nodemailer = require('nodemailer');
async function sendContactNotification({ name, email, subject, message }) {
 const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
 if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return { sent: false, reason: 'Email is not configured; message can still be stored in the database.' };
 const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, secure: String(SMTP_SECURE).toLowerCase() === 'true', auth: { user: SMTP_USER, pass: SMTP_PASS } });
 await transporter.sendMail({ from: CONTACT_FROM_EMAIL, to: CONTACT_TO_EMAIL, replyTo: email, subject: `Portfolio contact: ${subject || 'New message'}`, text: `From: ${name}\nEmail: ${email}\nSubject: ${subject || '(none)'}\n\n${message}` });
 return { sent: true };
}
module.exports = { sendContactNotification };
