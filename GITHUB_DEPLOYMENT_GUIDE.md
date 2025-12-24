# 🚀 Deploy to Vercel via GitHub (No CLI Needed!)

## Overview
We'll deploy your backend to Vercel using GitHub integration - no local deployment needed!

---

## ✅ Prerequisites

1. **GitHub Account** - https://github.com
2. **Vercel Account** - https://vercel.com (sign up with GitHub)
3. **MongoDB Atlas** - https://cloud.mongodb.com (free tier)
4. **Grok API Key** - https://console.x.ai

---

## 📦 Step 1: Create GitHub Repository

### 1.1 Create New Repository

1. Go to: **https://github.com/new**
2. Fill in:
   - **Repository name:** `adaptiveFitness-ai-chatbot`
   - **Description:** `Adaptive Fitness AI Chatbot - React Native Assignment`
   - **Visibility:** Public (required for free Vercel deployment)
   - **DO NOT** check "Initialize with README" (you already have one)
3. Click **"Create repository"**

### 1.2 You'll see a page with instructions - ignore them, we'll use our own!

---

## 📤 Step 2: Push Code to GitHub

### 2.1 Open Terminal in Your Project Directory

```bash
# Navigate to your project
cd "/Users/mohammed.shaikh/Documents/ai fitness /adaptiveFitness-ai-chatbot"
```

### 2.2 Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If you see "not a git repository", run:
git init
```

### 2.3 Add All Files

```bash
# Add all files
git add .

# Check what will be committed
git status
```

### 2.4 Create .gitignore (Important!)

Create a `.gitignore` file to avoid committing sensitive data:

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.npm/

# Expo
.expo/
dist/
web-build/

# Environment variables
.env
.env.local
.env*.local
backend/.env

# OS
.DS_Store
*.swp
*.swo

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build
build/
*.apk
*.ipa
EOF
```

### 2.5 Commit Your Code

```bash
git add .gitignore
git commit -m "Complete adaptive fitness chatbot with all features

Features:
- ✅ Personality-based AI adaptation
- ✅ Usage duration coaching
- ✅ Structured workout responses
- ✅ Coin reward system
- ✅ RAG-lite FAQ
- ✅ Chat history
- ✅ Safety guardrails
- ✅ Grok API integration"
```

### 2.6 Add Remote and Push

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/adaptiveFitness-ai-chatbot.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### 2.7 Verify Upload

Go to: `https://github.com/YOUR_USERNAME/adaptiveFitness-ai-chatbot`

You should see all your files!

---

## 🗄️ Step 3: Setup MongoDB Atlas (Database)

### 3.1 Create Account

1. Go to: **https://cloud.mongodb.com**
2. Sign up (free - no credit card needed)
3. Choose **"Shared" (free tier)**

### 3.2 Create Cluster

1. Choose **M0 Sandbox** (free forever)
2. Provider: **AWS** (or any)
3. Region: Choose closest to you
4. Cluster Name: `fitness-chatbot`
5. Click **"Create"**

### 3.3 Create Database User

1. Security → Database Access
2. Click **"Add New Database User"**
3. Authentication: **Password**
4. Username: `fitnessUser`
5. Password: Generate strong password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### 3.4 Setup Network Access

1. Security → Network Access
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP: `0.0.0.0/0` (auto-filled)
5. Click **"Confirm"**

⚠️ Note: For production, restrict this to Vercel IPs only

### 3.5 Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: **4.1 or later**
5. Copy the connection string:

```
mongodb+srv://fitnessUser:<password>@fitness-chatbot.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

6. Replace `<password>` with your actual password
7. Add database name at the end:

```
mongodb+srv://fitnessUser:YOUR_PASSWORD@fitness-chatbot.xxxxx.mongodb.net/fitness-chatbot?retryWrites=true&w=majority
```

**Save this! You'll need it for Vercel.**

---

## ☁️ Step 4: Deploy Backend to Vercel

### 4.1 Sign Up for Vercel

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

### 4.2 Import Your Repository

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find **`adaptiveFitness-ai-chatbot`**
4. Click **"Import"**

### 4.3 Configure Project

**IMPORTANT:** We're deploying the backend folder only!

1. **Framework Preset:** Select **"Other"**
2. **Root Directory:** Click **"Edit"** → Type: `backend`
3. **Build Command:** Leave empty
4. **Output Directory:** Leave empty
5. **Install Command:** Leave as default (`npm install`)

### 4.4 Add Environment Variables

Click **"Environment Variables"** section and add these:

| Name | Value |
|------|-------|
| `GROK_API_KEY` | `xai-YOUR_ACTUAL_KEY_HERE` |
| `GROK_BASE_URL` | `https://api.x.ai/v1` |
| `GROK_MODEL` | `grok-beta` |
| `DATABASE_URL` | Your MongoDB connection string (from Step 3.5) |
| `NODE_ENV` | `production` |

**How to add each variable:**
1. Name: `GROK_API_KEY`
2. Value: Your actual Grok API key
3. Select: **Production**, **Preview**, **Development** (all three)
4. Click **"Add"**
5. Repeat for all variables

### 4.5 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll see build logs

### 4.6 Get Your Backend URL

Once deployed, you'll see:
```
🎉 Your project has been successfully deployed!

https://adaptive-fitness-ai-chatbot.vercel.app
```

**Save this URL!**

### 4.7 Test Backend

Open in browser:
```
https://your-project.vercel.app/health
```

Should see:
```json
{"status":"ok","message":"Fitness Chatbot API is running"}
```

✅ **Backend is live!**

---

## 📱 Step 5: Update Frontend

### 5.1 Create .env File

In your project root (not backend folder):

```bash
cat > .env << 'EOF'
EXPO_PUBLIC_API_BASE_URL=https://your-actual-vercel-url.vercel.app
EOF
```

Replace with your actual Vercel URL!

### 5.2 Update services/api.ts (already done)

The file should already have:
```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';
```

### 5.3 Test Frontend

```bash
# Clear cache and restart
npx expo start -c

# Try the app
# Send a message
# Verify it connects to deployed backend
```

---

## 🎬 Step 6: For Demo/Submission

### 6.1 Share Your App

**Option A: QR Code (Easiest)**
```bash
npx expo start

# Users scan QR with Expo Go app
```

**Option B: Build APK**
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview

# Wait ~10 mins
# Download from expo.dev
```

### 6.2 Update README with URLs

Add this to your README.md:

```markdown
## 🚀 Live Deployment

### Backend API
- **Production URL:** https://your-project.vercel.app
- **Health Check:** https://your-project.vercel.app/health
- **Platform:** Vercel
- **Database:** MongoDB Atlas

### Mobile App
- **Platform:** React Native (Expo)
- **QR Code:** [Scan to open in Expo Go]
- **APK Download:** [Link if available]

### How to Test
1. Download Expo Go app (iOS/Android)
2. Scan QR code
3. Or download APK and install
```

---

## ✅ Verification Checklist

Before submitting, verify:

- [ ] GitHub repository is public
- [ ] All code is pushed to GitHub
- [ ] Backend deployed to Vercel
- [ ] Backend /health endpoint works
- [ ] MongoDB Atlas cluster running
- [ ] Frontend .env has correct backend URL
- [ ] App connects to deployed backend
- [ ] All features work (test each one!)
- [ ] README has deployment URLs
- [ ] Demo video recorded

---

## 🐛 Troubleshooting

### "Build Failed" on Vercel

**Check:**
- Root Directory is set to `backend`
- vercel.json exists in backend folder
- All environment variables are set correctly

**Solution:**
1. Vercel Dashboard → Your Project → Settings
2. General → Root Directory → `backend`
3. Redeploy

---

### "Cannot Connect to Database"

**Check:**
- DATABASE_URL environment variable is correct
- Password in connection string is URL-encoded
- MongoDB Atlas allows 0.0.0.0/0 IP access

**Solution:**
1. Verify connection string format
2. Check MongoDB Atlas → Network Access
3. Ensure database user exists

---

### "Grok API Error"

**Check:**
- GROK_API_KEY environment variable is set
- Key starts with `xai-`
- Key is valid at console.x.ai

**Solution:**
1. Vercel → Settings → Environment Variables
2. Verify GROK_API_KEY value
3. Regenerate key if needed

---

### "Frontend Can't Connect"

**Check:**
- .env file has correct Vercel URL
- URL doesn't have trailing slash
- App was restarted after changing .env

**Solution:**
```bash
# Clear Expo cache
npx expo start -c

# Verify .env
cat .env
```

---

## 📊 Expected Results

### Backend (Vercel)
```
✅ Deployed successfully
✅ /health returns {"status":"ok"}
✅ /api/users endpoint works
✅ /api/chat endpoint works
✅ MongoDB connected
```

### Frontend (Expo)
```
✅ Connects to Vercel backend
✅ Personality selection works
✅ Chat sends/receives messages
✅ Coins increment
✅ History loads
✅ Structured responses render
```

---

## 🎓 For Assignment Submission

Include in your README:

```markdown
## 📦 Deployment Details

### Technology Stack
- **Frontend:** React Native (Expo SDK 54)
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **AI:** Grok API (X.AI)
- **Hosting:** Vercel (Backend)

### Live URLs
- Backend: https://your-backend.vercel.app
- GitHub: https://github.com/YOUR_USERNAME/adaptiveFitness-ai-chatbot

### Deployment Process
1. Backend deployed to Vercel via GitHub integration
2. MongoDB Atlas cluster for database
3. Mobile app accessible via Expo Go
4. All environment variables configured securely

### How Evaluators Can Test
1. Visit backend health check: [URL]/health
2. Scan QR code with Expo Go app
3. Or download APK: [Link]
4. Test all features in mobile app
```

---

## 🎉 You're Done!

Your app is now fully deployed and accessible!

**Final URLs to save:**
- GitHub: `https://github.com/YOUR_USERNAME/adaptiveFitness-ai-chatbot`
- Backend: `https://your-project.vercel.app`
- Health: `https://your-project.vercel.app/health`

**Next:**
1. Test everything works
2. Record demo video
3. Submit GitHub repo link
4. Include Vercel URL in README
5. Share Expo QR code or APK

🚀 **Congratulations on completing the deployment!**
