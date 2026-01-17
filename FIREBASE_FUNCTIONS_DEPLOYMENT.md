# Firebase Cloud Functions Deployment Guide

## ✅ Setup Complete!

Your backend is now configured to deploy as Firebase Cloud Functions. Here's what was set up:

### 📁 Structure Created
```
functions/
├── index.js              # Main Cloud Function entry point
├── package.json          # Dependencies
├── config/
│   └── db.js            # Firebase Admin initialization
├── controllers/          # All your controllers
├── models/              # Firestore collection references
└── routes/              # Express routes
```

### 🔧 Configuration Updated
- ✅ `firebase.json` - Added API rewrite rules and functions config
- ✅ Frontend pages - Updated to use relative URLs for production
- ✅ API config - Automatically uses relative URLs in production

## 🚀 Deployment Steps

### Step 1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Install Functions Dependencies
```bash
cd functions
npm install
cd ..
```

### Step 4: Set Environment Variables (Optional - for email notifications)

If you want email notifications for contact form submissions, set these in Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Functions** → **Configuration**
4. Add environment variables:
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASSWORD` - Gmail App Password (not regular password)
   - `EMAIL_TO` - Where to send contact form notifications

**Note:** For Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833).

Or set them via CLI:
```bash
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"
firebase functions:config:set email.to="recipient@example.com"
```

### Step 5: Deploy Functions
```bash
firebase deploy --only functions
```

This will deploy your backend API as a Cloud Function.

### Step 6: Rebuild and Deploy Frontend
```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

Or deploy both at once:
```bash
firebase deploy
```

## 🧪 Testing

After deployment, test your API endpoints:

1. **Services API:**
   ```
   https://zynalixx-18854.web.app/api/services
   ```

2. **Projects API:**
   ```
   https://zynalixx-18854.web.app/api/projects
   ```

3. **Events API:**
   ```
   https://zynalixx-18854.web.app/api/events
   ```

4. **Contact API (POST):**
   ```
   https://zynalixx-18854.web.app/api/contacts
   ```

If you see JSON responses, your backend is connected! ✅

## 🔍 How It Works

1. **Frontend** makes requests to `/api/**` (relative URLs)
2. **Firebase Hosting** rewrite rule catches `/api/**` requests
3. **Rewrite rule** routes them to the `api` Cloud Function
4. **Cloud Function** handles the request and returns JSON
5. **Frontend** receives the data and displays it

## 🛠️ Local Development

For local development, the frontend will still use `http://localhost:5000`:

1. **Start your local backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start your local frontend:**
   ```bash
   cd frontend
   npm start
   ```

The API config automatically detects the environment and uses the correct URL.

## 📝 Important Notes

- **Firebase Admin**: Cloud Functions automatically have Firebase Admin credentials, so no service account key is needed
- **CORS**: Already configured to allow all origins
- **Firestore**: Uses the same Firestore database as your local backend
- **Cold Starts**: Cloud Functions may have a slight delay on first request (cold start), subsequent requests are fast

## 🐛 Troubleshooting

### Error: "Functions directory not found"
- Make sure you're in the project root directory
- Verify `functions/` directory exists

### Error: "Permission denied"
- Make sure you're logged in: `firebase login`
- Verify you have the correct Firebase project selected: `firebase use <project-id>`

### API returns 404
- Check that functions are deployed: `firebase functions:list`
- Verify `firebase.json` has the correct rewrite rules
- Make sure frontend is rebuilt after changes

### CORS errors
- CORS is already configured in `functions/index.js`
- If issues persist, check that the rewrite rule is working

## 🎉 Success!

Once deployed, your website will:
- ✅ Load data from Firestore via Cloud Functions
- ✅ Work without CORS errors
- ✅ Handle contact form submissions
- ✅ Work seamlessly in production

Your full-stack app is now live on Firebase! 🚀

