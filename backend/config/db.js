const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    // Option 1: Use service account file path (recommended for local development)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      // Resolve path relative to backend directory or absolute path
      const serviceAccountPath = path.isAbsolute(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
        ? process.env.FIREBASE_SERVICE_ACCOUNT_PATH
        : path.join(__dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('Firebase initialized with service account file');
    }
    // Option 2: Use service account key as JSON string (for production/hosting)
    else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Remove any extra whitespace and parse JSON
      const keyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      const serviceAccount = JSON.parse(keyString);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('Firebase initialized with service account key');
    }
    // Option 3: Use default credentials (for Firebase hosting/Cloud Functions)
    else {
      admin.initializeApp();
      console.log('Firebase initialized with default credentials');
    }
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
    console.error('Please check your .env file configuration.');
    console.error('You need either FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_KEY set.');
    throw error;
  }
}

const db = admin.firestore();

module.exports = db;
