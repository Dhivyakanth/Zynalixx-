const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
// CORS configuration - allow requests from Firebase Hosting and localhost
app.use(cors({
  origin: [

    'https://zynalixx-22367.web.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5000',
    process.env.FRONTEND_URL
  ].filter(Boolean), // Remove undefined values
  credentials: true
}));
app.use(express.json());

app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

const PORT = process.env.PORT || 5000;

// Firestore connection test
db.settings({ ignoreUndefinedProperties: true });
console.log('Firebase Firestore connected');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
  console.log('Ready to accept contact form submissions...');
});
