const db = require('../config/db');

// Firestore collection reference
const Event = db.collection('events');

module.exports = Event;

