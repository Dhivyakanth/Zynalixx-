const db = require('../config/db');

// Firestore collection reference
const Service = db.collection('services');

module.exports = Service;
