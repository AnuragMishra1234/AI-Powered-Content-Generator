# GenAI Hub - Complete Setup Guide

This guide will walk you through setting up GenAI Hub from scratch.

## ✅ Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Groq API key (optional - for real AI integration)
- [ ] Text editor or IDE (VS Code recommended)
- [ ] Git installed

## 📥 Step 1: Download/Clone the Project

```bash
# If you received as a ZIP file, extract it
# Otherwise, clone from repository
git clone <repository-url>
cd genai-hub
```

## 📦 Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- next
- react
- typescript
- tailwindcss
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- axios

## 🗄️ Step 3: Setup MongoDB

### Option A: Local MongoDB (Recommended for Development)

1. **Windows Users:**
   - Download from: https://www.mongodb.com/try/download/community
   - Run the installer
   - Follow the installation wizard
   - MongoDB Community Server will install as a Windows service

2. **Mac Users:**
   ```bash
   # Using Homebrew
   brew tap mongodb/brew
   brew install mongodb-community

   # Start MongoDB
   brew services start mongodb-community
   ```

3. **Linux Users:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb

   # Start MongoDB
   sudo systemctl start mongod
   ```

4. **Verify Installation:**
   ```bash
   # Connect to MongoDB shell
   mongosh
   # or older versions
   mongo
   ```

### Option B: MongoDB Atlas (Cloud - Easier)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Create a cluster (select M0 Free tier)
5. Wait for cluster to deploy (5-10 minutes)
6. Click "Connect"
7. Choose "Connect your application"
8. Copy the connection string
9. Replace username, password, and database name:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true
   ```

## 🔑 Step 4: Configure Environment Variables

1. Create `.env.local` file in project root:
   ```bash
   # Windows
   type nul > .env.local

   # Mac/Linux
   touch .env.local
   ```

2. Copy content from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` and fill in values:

```env
# MongoDB Connection String
# For local: mongodb://localhost:27017/genai-hub
# For Atlas: mongodb+srv://user:password@cluster.mongodb.net/genai-hub
MONGODB_URI=mongodb://localhost:27017/genai-hub

# JWT Secret - Change this to a random string
JWT_SECRET=your-super-secret-key-min-32-characters-long

# Groq API (Optional - leave as is for now)
GROQ_API_KEY=your-groq-api-key-here

# HuggingFace API (Optional)
HUGGINGFACE_API_KEY=your-huggingface-api-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

**Security Tips:**
- Generate a strong JWT_SECRET: `openssl rand -hex 32`
- Never commit `.env.local` to git
- Use different secrets for production

## 🚀 Step 5: Verify MongoDB Connection

Test your MongoDB connection:

```bash
# Start Node.js REPL
node

# In Node.js REPL:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/genai-hub')
  .then(() => console.log('Connected!'))
  .catch(err => console.log('Error:', err));
```

Press `Ctrl+D` to exit.

## 📱 Step 6: Start Development Server

```bash
npm run dev
```

You should see:
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

## 🌐 Step 7: Test the Application

1. Open browser: http://localhost:3000
2. You should see the GenAI Hub landing page
3. Click "Sign Up" to create an account

### Create Test Account:
```
Name: John Doe
Email: test@example.com
Password: Test@123456
Confirm: Test@123456
```

4. After signup, you'll see the dashboard
5. Try each tool:
   - Text Generator (10 credits)
   - Poster Generator (20 credits)
   - Resume Builder (15 credits)
   - Website Generator (25 credits)

## 🧪 Testing API Endpoints

Use Postman or cURL to test API:

### 1. Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "confirmPassword": "Password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

Save the returned token and use it for next requests:

### 3. Get User Info
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Generate Text
```bash
curl -X POST http://localhost:3000/api/generate/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "prompt": "Write a catchy Instagram caption for a coffee shop"
  }'
```

## 🔧 Development Useful Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run linter
npm run lint

# Format code (if prettier installed)
npm run format
```

## 📁 Creating New Features

### Add a New API Endpoint

1. Create file: `app/api/[route]/route.ts`
2. Add handler:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}
```

### Add a New Page

1. Create file: `app/[route]/page.tsx`
2. Add component:
```typescript
export default function Page() {
  return <div>Your content</div>;
}
```

### Add a New Component

1. Create file: `app/components/YourComponent.tsx`
2. Use in pages:
```typescript
import YourComponent from '@/app/components/YourComponent';
```

## ❌ Common Issues & Solutions

### Issue: "Cannot find module 'mongoose'"
```bash
# Solution: Reinstall dependencies
npm install
```

### Issue: "MongoDB connection refused"
```bash
# Check if MongoDB is running
# Windows: Check Services in Task Manager
# Mac/Linux: sudo systemctl status mongod
# Then restart MongoDB
```

### Issue: "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: ".env variables not loading"
```bash
# Make sure file is named .env.local
# Restart dev server after making changes
# Clear browser cache
```

### Issue: "JWT token invalid"
```bash
# Make sure JWT_SECRET is set in .env.local
# Check Authorization header format: "Bearer TOKEN"
# Verify token is not expired
```

## 📚 File Structure Tips

```
Each feature should follow:
feature/
├── api/            (backend)
├── components/     (UI components)
├── page.tsx        (frontend page)
└── lib/            (utilities)
```

## 🔐 Production Setup Checklist

- [ ] Update JWT_SECRET to secure random value
- [ ] Use MongoDB Atlas (not local instance)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Setup rate limiting
- [ ] Configure CORS properly
- [ ] Use environment-specific configs
- [ ] Setup error logging
- [ ] Configure backup strategy
- [ ] Setup monitoring/alerts

## 📞 Need Help?

1. Check the main README.md
2. Review error messages in terminal
3. Check MongoDB connection
4. Verify .env.local file
5. Clear .next folder and rebuild
6. Check browser console for errors

---

**You're all set! Happy coding! 🚀**
