# Deploy Backend to Render - Complete Guide

## 🚀 Quick Start

Your backend is ready to deploy to Render! Follow these steps:

## Step 1: Prepare Your Firebase Service Account Key

1. **Get your service account key JSON content:**
   - Open `backend/zynalixx-22367-firebase-adminsdk-fbsvc-9116f619be.json`
   - Copy the **entire JSON content** (all of it, including braces)

2. **Convert to a single line (optional but recommended):**
   - Remove all line breaks and extra spaces
   - Or use an online JSON minifier: https://www.jsonformatter.org/json-minify

## Step 2: Create Render Account & Deploy

### Option A: Deploy via Render Dashboard (Recommended)

1. **Sign up/Login to Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub (recommended) or email

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use "Public Git repository")
   - If using GitHub, select your repository

3. **Configure the Service:**
   - **Name:** `zynalixx-backend` (or any name you prefer)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend` (important!)

4. **Set Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:

   ```
   FIREBASE_SERVICE_ACCOUNT_KEY = {"type":"service_account","project_id":"zynalixx-22367",...}
   ```
   
   **Important:** Paste the entire JSON as a single line (minified)

   Optional (for email notifications):
   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASSWORD = your-gmail-app-password
   EMAIL_TO = recipient@example.com
   ```

5. **Select Plan:**
   - Choose **Free** plan (perfect for starting out)
   - Free tier includes: 750 hours/month, auto-sleep after 15 min inactivity

6. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Wait 5-10 minutes for the first deployment

7. **Get Your Backend URL:**
   - After deployment, you'll see: `https://zynalixx-backend.onrender.com`
   - Copy this URL (it will be your API base URL)

### Option B: Deploy via render.yaml (Alternative)

If you prefer using the `render.yaml` file:

1. Push `render.yaml` to your repository
2. In Render dashboard, select "Infrastructure as Code"
3. Render will detect and use the `render.yaml` configuration
4. Still need to set `FIREBASE_SERVICE_ACCOUNT_KEY` in the dashboard

## Step 3: Update Frontend API URL

After you get your Render backend URL (e.g., `https://zynalixx-backend.onrender.com`):

1. **Update `frontend/src/config/api.js`:**
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 
     (process.env.NODE_ENV === 'production' 
       ? 'https://zynalixx-backend.onrender.com' // Your Render URL here
       : 'http://localhost:5000');
   ```

   Replace `zynalixx-backend.onrender.com` with your actual Render URL.

2. **Or use environment variable (recommended):**
   Create `frontend/.env.production`:
   ```env
   REACT_APP_API_URL=https://zynalixx-backend.onrender.com
   ```

3. **Rebuild frontend:**
   ```bash
   cd frontend
   npm run build
   ```

4. **Deploy frontend to Firebase:**
   ```bash
   firebase deploy --only hosting
   ```

## Step 4: Test Your Deployment

### Test Backend Directly:
1. Visit: `https://your-backend.onrender.com/api/services`
2. You should see JSON data (or empty array `[]`)

### Test from Frontend:
1. Visit your Firebase Hosting URL
2. Check browser console for any errors
3. Navigate to Services, Projects, Events pages
4. Data should load from Render backend

## 🔧 Configuration Details

### Backend Configuration (`backend/server.js`)
- ✅ CORS configured to allow Firebase Hosting domain
- ✅ Port automatically set by Render (uses `process.env.PORT`)
- ✅ Express server ready for production

### Firebase Configuration (`backend/config/db.js`)
- ✅ Supports service account key from environment variable
- ✅ Works with `FIREBASE_SERVICE_ACCOUNT_KEY` (Render)
- ✅ Falls back to file path for local development

## 📝 Important Notes

### Render Free Tier Limitations:
- **Auto-sleep:** Service sleeps after 15 minutes of inactivity
- **Cold starts:** First request after sleep takes ~30-50 seconds
- **Monthly hours:** 750 hours/month (enough for most projects)
- **Upgrade:** $7/month for always-on (no sleep)

### Firebase Service Account Key:
- **Never commit** the JSON file to Git (already in `.gitignore`)
- **Use environment variable** in Render dashboard
- **Format:** Paste entire JSON as a single string (minified)

### CORS Configuration:
- Backend allows requests from:
  - `https://zynalixx-18854.web.app`
  - `https://zynalixx-22367.web.app`
  - `http://localhost:3000` (for local dev)
  - `http://localhost:5173` (for local dev)
  - Custom `FRONTEND_URL` if set

## 🐛 Troubleshooting

### Backend returns 503 or times out:
- **Cold start:** Wait 30-50 seconds for first request after sleep
- **Check logs:** Render dashboard → Logs tab
- **Verify build:** Check that `npm install` completed successfully

### CORS errors:
- **Check backend URL:** Make sure frontend is calling the correct Render URL
- **Verify CORS config:** Check `backend/server.js` includes your Firebase domain
- **Check logs:** Render dashboard → Logs for CORS-related errors

### Firebase connection errors:
- **Verify service account key:** Check `FIREBASE_SERVICE_ACCOUNT_KEY` is set correctly
- **Check JSON format:** Must be valid JSON, minified (single line)
- **Check logs:** Render dashboard → Logs for Firebase initialization errors

### Environment variables not working:
- **Render dashboard:** Environment variables must be set in Render dashboard
- **Redeploy:** After adding env vars, Render auto-redeploys
- **Check format:** JSON strings must be properly escaped

## 🎉 Success Checklist

- [ ] Render service deployed and running
- [ ] Backend URL accessible (test in browser)
- [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` set in Render
- [ ] Frontend API config updated with Render URL
- [ ] Frontend rebuilt and deployed
- [ ] Test API endpoints from browser
- [ ] Test frontend pages load data correctly

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Free Tier Info](https://render.com/docs/free)
- [Firebase Admin SDK Setup](https://firebase.google.com/docs/admin/setup)

---

**Your backend is now deployed on Render! 🚀**

The free tier is perfect for development and small projects. Upgrade to paid plan ($7/month) when you need always-on service without cold starts.

