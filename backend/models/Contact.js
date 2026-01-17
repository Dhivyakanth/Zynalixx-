const db = require('../config/db');

// Firestore collection reference
const Contact = db.collection('contacts');

module.exports = Contact;
