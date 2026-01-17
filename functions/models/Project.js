const db = require('../config/db');

// Firestore collection reference
const Project = db.collection('projects');

module.exports = Project;

