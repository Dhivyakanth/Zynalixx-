const admin = require('firebase-admin');

// Initialize Firebase Admin (Cloud Functions uses default credentials)
if (!admin.apps.length) {
  admin.initializeApp();
  console.log('Firebase initialized with default credentials (Cloud Functions)');
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = db;

