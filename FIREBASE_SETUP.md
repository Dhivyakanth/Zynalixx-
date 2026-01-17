# Firebase Setup Guide for Zynalix

This guide will help you set up Firebase Firestore for your Zynalix application.

## Prerequisites

1. A Firebase account (sign up at https://firebase.google.com)
2. Node.js installed on your system
3. npm or yarn package manager

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project
4. Enable **Firestore Database** in the Firebase Console:
   - Go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in production mode" or "Start in test mode" (for development)
   - Select your preferred location

## Step 2: Generate Service Account Key

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Navigate to the **Service Accounts** tab
3. Click **Generate new private key**
4. Save the JSON file securely (e.g., `serviceAccountKey.json`)
5. **DO NOT commit this file to Git** - add it to `.gitignore`

## Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Firebase Configuration (choose one method)
# Method 1: Service Account JSON file path (relative to backend folder)
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json

# OR Method 2: Service Account JSON as string (for production/hosting)
# FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...",...}

# Server Configuration
PORT=5000

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=recipient@example.com
```

### Important Notes:
- For **Firebase Hosting/Cloud Functions**, you can use Method 2 or rely on default credentials
- For **local development**, use Method 1 with the JSON file path
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password

## Step 4: Install Dependencies

```bash
cd backend
npm install
```

## Step 5: Migrate Sample Data (Optional)

If you want to populate Firestore with sample data, you can use the migration script:

```bash
cd backend
node scripts/migrateData.js
```

Or manually add data through the Firebase Console.

## Step 6: Firestore Security Rules

Update your Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to public collections
    match /services/{document=**} {
      allow read: if true;
      allow write: if false; // Only through Admin SDK
    }
    match /projects/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /events/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Contacts should be write-only from client (if needed)
    match /contacts/{document=**} {
      allow create: if true;
      allow read, update, delete: if false; // Only through Admin SDK
    }
    
    // Admins collection - restricted access
    match /admins/{document=**} {
      allow read, write: if false; // Only through Admin SDK
    }
  }
}
```

## Step 7: Test the Setup

Start your backend server:

```bash
npm run dev
```

Test the API endpoints:
- `GET http://localhost:5000/api/services`
- `GET http://localhost:5000/api/projects`
- `GET http://localhost:5000/api/events`
- `POST http://localhost:5000/api/contacts`

## Deployment to Firebase

### Option 1: Firebase Hosting (Frontend only)
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### Option 2: Firebase Cloud Functions (Backend)
1. Initialize Firebase Functions in your project
2. Move backend code to `functions` directory
3. Deploy with `firebase deploy --only functions`

### Option 3: Firebase Hosting + External Backend
- Deploy frontend to Firebase Hosting
- Host backend on a separate service (e.g., Cloud Run, Heroku, Railway)
- Update frontend API URLs to point to your backend URL

## Troubleshooting

### Error: "Firebase initialization error"
- Ensure your service account key file path is correct
- Check that the JSON file is valid
- Verify environment variables are loaded correctly

### Error: "Permission denied"
- Check Firestore security rules
- Verify service account has proper permissions
- Ensure Firestore API is enabled in Google Cloud Console

### Error: "Missing or insufficient permissions"
- Go to Google Cloud Console → IAM & Admin
- Ensure your service account has "Cloud Datastore User" role

## Data Structure

Your Firestore collections will have the following structure:

### services
```
{
  title: string,
  description: string,
  icon: string,
  created_at: timestamp
}
```

### projects
```
{
  project_name: string,
  project_type: string,
  client_name: string,
  created_at: timestamp
}
```

### events
```
{
  event_name: string,
  event_date: date,
  description: string,
  created_at: timestamp
}
```

### contacts
```
{
  name: string,
  email: string,
  phone: string,
  message: string,
  created_at: timestamp
}
```

### admins
```
{
  username: string,
  password: string (hashed),
  created_at: timestamp
}
```

