# Submission Checklist

Use this checklist before submitting your project.

## 📋 Pre-Submission Checklist

### Code Quality
- [ ] All code is properly formatted and linted
- [ ] No console errors in development
- [ ] TypeScript types are properly defined
- [ ] No unused imports or variables
- [ ] Code comments are clear and helpful

### Functionality
- [ ] App runs without crashes
- [ ] All three personalities work correctly
- [ ] Usage duration adaptation is functioning
- [ ] Safety refusals work for medical queries
- [ ] Coins increment correctly
- [ ] Chat history persists
- [ ] Quick actions work properly
- [ ] Backend API responds correctly

### Environment & Configuration
- [ ] `.env.example` files are complete
- [ ] Actual `.env` files are in `.gitignore`
- [ ] No API keys committed to repository
- [ ] MongoDB connection works
- [ ] OpenAI API integration works

### Documentation
- [ ] README.md is complete and accurate
- [ ] AI_README.md documents all AI usage
- [ ] SETUP_GUIDE.md has clear instructions
- [ ] PROJECT_SUMMARY.md is up to date
- [ ] Code has helpful comments

### Testing
- [ ] Tested on iOS simulator/device
- [ ] Tested on Android emulator/device (if possible)
- [ ] All three personalities tested
- [ ] Safety refusals verified
- [ ] Edge cases handled (empty input, network errors)
- [ ] Backend error handling tested

### GitHub Repository
- [ ] Repository is public
- [ ] Clean commit history with meaningful messages
- [ ] README.md is the main documentation
- [ ] `.gitignore` prevents sensitive file commits
- [ ] All required files are pushed

### Demo Video (2-5 minutes)
- [ ] Shows welcome screen and personality selection
- [ ] Demonstrates chat interaction
- [ ] Shows personality-based behavior example
- [ ] Demonstrates usage duration adaptation (mention days)
- [ ] Shows structured AI responses
- [ ] Demonstrates safety refusal with medical query
- [ ] Shows coin system working
- [ ] Clear audio and screen recording
- [ ] Uploaded to YouTube/Drive with public access

### Assignment Requirements

#### Technical Requirements
- [ ] React Native (Expo Managed Workflow) ✓
- [ ] Node.js 20.x ✓
- [ ] Express backend ✓
- [ ] MongoDB database ✓
- [ ] OpenAI API integration ✓
- [ ] No Expo ejection ✓
- [ ] Same Expo SDK as starter template ✓

#### Core Features
- [ ] Welcome/Home screen with disclaimers ✓
- [ ] Chat screen with input and messages ✓
- [ ] Three personality types implemented ✓
- [ ] Usage duration adaptation (3 tiers) ✓
- [ ] Lifestyle context (dummy data) ✓
- [ ] Prompt composition combining all factors ✓
- [ ] Safety guardrails for medical content ✓
- [ ] Structured AI responses ✓

#### Bonus Features (Optional but Implemented)
- [ ] Coin reward system ✓
- [ ] Clean UI/UX with theming ✓
- [ ] Quick action suggestions ✓
- [ ] Loading states and animations ✓

### Final Steps

1. **Test One More Time**
   ```bash
   # Fresh install test
   rm -rf node_modules backend/node_modules
   npm install
   cd backend && npm install && cd ..
   ```

2. **Record Demo Video**
   - Screen recording software (QuickTime, OBS, etc.)
   - 2-5 minutes duration
   - Show all key features
   - Mention days using app when testing duration

3. **Prepare GitHub Repository**
   ```bash
   git add .
   git commit -m "Final submission: Adaptive Fitness Chatbot"
   git push origin main
   ```

4. **Verify Repository**
   - Check GitHub page in incognito mode
   - Ensure README displays correctly
   - Verify all files are present
   - Check that .env is NOT committed

5. **Upload Demo Video**
   - YouTube (unlisted or public)
   - Google Drive (public access)
   - Loom
   - Get shareable link

6. **Create Submission Package**
   - GitHub repository URL
   - Demo video link
   - APK file (optional but recommended)
   - Any additional notes

### Submission Content

**Required:**
1. GitHub repository URL
2. Demo video (2-5 minutes)
3. README.md with:
   - How to run the app
   - Prompt composition explanation
   - Personality & usage logic
   - Safety handling approach
   - AI tools used (in AI_README.md)

**Optional but Recommended:**
4. Android APK file
5. Additional screenshots
6. Architecture diagrams

### APK Generation (Optional Bonus)

```bash
# Build for Android
eas build --platform android --profile preview

# Or using Expo build
expo build:android
```

Note: Requires Expo account and may take time.

### Quality Checklist

#### Code Quality (20%)
- [ ] Clean, readable code
- [ ] Proper error handling
- [ ] Good architecture and separation of concerns
- [ ] TypeScript properly used
- [ ] No code smells

#### UI/UX Quality (35%)
- [ ] Professional appearance
- [ ] Intuitive navigation
- [ ] Smooth interactions
- [ ] Loading states
- [ ] Error messages
- [ ] Responsive design

#### AI Behavior & Adaptation (30%)
- [ ] Personality differences are clear
- [ ] Duration adaptation works correctly
- [ ] Lifestyle data influences responses
- [ ] Prompts are well-composed
- [ ] Responses are relevant and helpful

#### Safety & Scope (10%)
- [ ] Medical queries properly refused
- [ ] Clear disclaimers present
- [ ] Safe, helpful responses only
- [ ] No harmful content generation

#### Documentation (5%)
- [ ] Clear README
- [ ] Setup instructions work
- [ ] Architecture explained
- [ ] AI usage documented

### Pre-Submission Test Script

Run these commands to verify everything:

```bash
# 1. Check Node version
node --version  # Should be 20.x

# 2. Backend health
curl http://localhost:3000/health

# 3. MongoDB connection
# Should see: MongoDB connected successfully

# 4. Frontend builds
npm run android  # or npm run ios

# 5. Linting
npm run lint
```

### Common Mistakes to Avoid

- [ ] ❌ Committing .env files with API keys
- [ ] ❌ Not testing safety refusals
- [ ] ❌ Missing documentation
- [ ] ❌ Demo video too long (>5 min)
- [ ] ❌ Repository is private
- [ ] ❌ Backend not documented
- [ ] ❌ No error handling
- [ ] ❌ Unclear setup instructions

### Final Verification

Before submitting, ask yourself:

1. Can someone clone my repo and run it following README?
2. Does the demo video show all required features?
3. Is my code clean and well-documented?
4. Are all safety mechanisms working?
5. Do the three personalities behave differently?
6. Is the AI adaptation clearly observable?

### Submission Format

**Email/Platform submission should include:**

```
Subject: [Your Name] - Adaptive Fitness Chatbot Submission

Body:
Name: [Your Name]
Track: Track A - React Native

GitHub Repository: [URL]
Demo Video: [YouTube/Drive Link]
APK (optional): [Link if available]

Key Features Implemented:
- 3 personality types with adaptive behavior
- 3-tier usage duration adaptation
- Lifestyle context integration
- Safety guardrails for medical content
- Coin reward system
- Structured AI responses

Tech Stack:
- React Native (Expo 54)
- Node.js 20 + Express
- MongoDB + Mongoose
- OpenAI GPT-4

Notes:
[Any additional information]
```

---

## ✅ Final Check

Once ALL items above are checked, you're ready to submit!

**Good luck! 🚀**
