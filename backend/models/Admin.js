const db = require('../config/db');

// Firestore collection reference
const Admin = db.collection('admins');

module.exports = Admin;
