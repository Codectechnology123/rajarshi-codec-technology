const mongoose = require('mongoose');
async function connectDatabase() {
  if (!process.env.MONGODB_URI) { console.warn('MONGODB_URI is not set. Portfolio uses demo data; contact submissions require MongoDB.'); return; }
  try { await mongoose.connect(process.env.MONGODB_URI); console.log('Connected to MongoDB.'); }
  catch (error) { console.error('MongoDB connection failed:', error.message); if (process.env.NODE_ENV === 'production') process.exit(1); }
}
module.exports = connectDatabase;
