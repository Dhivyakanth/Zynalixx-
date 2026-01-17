const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration - allow all origins for now
app.use(cors({ origin: true }));
app.use(express.json());

// Import routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);

