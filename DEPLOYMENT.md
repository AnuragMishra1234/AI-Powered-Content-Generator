# GenAI Hub - Deployment Guide

Complete guide to deploy GenAI Hub to production.

## 🚀 Deployment Options

### 1. Vercel (Recommended - Easiest)
### 2. Netlify
### 3. Railway
### 4. DigitalOcean
### 5. AWS

---

## ✨ Option 1: Deploy to Vercel (Recommended)

Vercel is the company behind Next.js and provides seamless integration.

### Step 1: Prepare Repository

```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub

1. Create account on GitHub: https://github.com
2. Create new repository (genai-hub)
3. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/genai-hub.git
git branch -M main
git push -u origin main
```

### Step 3: Connect to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your "genai-hub" repository
5. Click "Import"

### Step 4: Configure Environment Variables

1. In Vercel dashboard, go to project settings
2. Click "Environment Variables"
3. Add each variable:

```
MONGODB_URI = mongodb+srv://user:password@cluster.mongodb.net/genai-hub
JWT_SECRET = your-super-secret-key-32-characters
GROQ_API_KEY = your-groq-api-key
NEXT_PUBLIC_APP_URL = https://your-domain.vercel.app
NODE_ENV = production
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app is live!

**Your app URL:** https://your-project-name.vercel.app

### Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions

---

## 🚀 Option 2: Deploy to Railway

Railway simplifies deployment of full-stack applications.

### Step 1: Create Railway Account

Go to https://railway.app and sign up.

### Step 2: Create New Project

1. Click "New Project"
2. Select "GitHub Repo"
3. Authorize GitHub
4. Select your genai-hub repository
5. Click "Deploy"

### Step 3: Add MongoDB

Railway automatically detects database needs:

1. Click "Add Services"
2. Select "MongoDB"
3. Configure (default settings fine)
4. Railway adds MONGODB_URI automatically

### Step 4: Set Environment Variables

1. In project, click "Variables"
2. Add remaining variables:

```
JWT_SECRET = secure-key-here
GROQ_API_KEY = your-groq-api-key
NEXT_PUBLIC_APP_URL = https://your-railway-domain
NODE_ENV = production
```

### Step 5: Configure MongoDB Connection

Railway automatically manages MongoDB, but verify in variables.

### Step 6: Deploy

1. Railway auto-deploys on git push
2. Check "Status" tab for deployment status
3. Once done, click "Generate Domain"

---

## 🚀 Option 3: Deploy to DigitalOcean App Platform

### Step 1: DigitalOcean Setup

1. Create account at https://www.digitalocean.com
2. Add payment method

### Step 2: Create App

1. Click "Apps" in left menu
2. Click "Create Apps"
3. Connect GitHub and select repository
4. Choose settings

### Step 3: Configure

1. For deployment instructions:
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Port: `3000`

### Step 4: Add Services

1. Add MongoDB from DigitalOcean Marketplace
2. Configure database

### Step 5: Environment Variables

In app settings, add all variables from `.env.example`

### Step 6: Deploy

Click "Deploy" and wait for deployment to complete.

---

## 🐳 Option 4: Docker Deployment

Deploy using Docker containers.

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app files
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

# Start app
CMD ["npm", "start"]
```

### Step 2: Create .dockerignore

```
node_modules
.next
.git
.gitignore
npm-debug.log
.env
.env.local
```

### Step 3: Build Docker Image

```bash
docker build -t genai-hub .
```

### Step 4: Run Docker Container

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://... \
  -e JWT_SECRET=your-secret \
  -e GROQ_API_KEY=your-groq-api-key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  genai-hub
```

### Step 5: Push to Docker Hub (Optional)

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag genai-hub username/genai-hub

# Push
docker push username/genai-hub
```

---

## 📊 Production Checklist

Before deploying to production:

### Security
- [ ] Change JWT_SECRET to secure random value
- [ ] Generate secure API keys
- [ ] Enable HTTPS/SSL
- [ ] Create strong database password
- [ ] Restrict database access by IP
- [ ] Enable CORS properly
- [ ] Set Node environment to "production"

### Database
- [ ] Use MongoDB Atlas (not local instance)
- [ ] Enable encryption
- [ ] Setup automated backups
- [ ] Test backup restoration
- [ ] Monitor database performance

### Performance
- [ ] Enable caching
- [ ] Compress assets
- [ ] Optimize images
- [ ] Setup CDN (optional)
- [ ] Monitor response times

### Monitoring
- [ ] Setup error logging (Sentry)
- [ ] Setup performance monitoring (New Relic)
- [ ] Setup uptime monitoring
- [ ] Configure alerts
- [ ] Review logs daily

### Backup & Recovery
- [ ] Setup automated backups
- [ ] Test restore process
- [ ] Document recovery steps
- [ ] Store backups securely

---

## 🔧 Production Configuration

### Environment Variables (Production)

```env
# Security
NODE_ENV=production
JWT_SECRET=generate-with-openssl-rand-hex-32

# Database - Use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/genai-hub

# API Keys
GROQ_API_KEY=your-groq-api-key

# URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Optional: Error Tracking
SENTRY_DSN=your-sentry-dsn
```

### Next.js Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Should compile without warnings
```

---

## 📈 Scaling Considerations

### Database Optimization
```javascript
// Add database indexes for production queries
db.users.createIndex({ email: 1 })
db.history.createIndex({ userId: 1, createdAt: -1 })
```

### API Rate Limiting
```typescript
// Implement rate limiting middleware
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // requests per windowMs
});

app.use('/api/', limiter);
```

### Load Balancing
- Use Vercel's auto-scaling (default)
- Or configure load balancer in DigitalOcean/AWS

### Caching Strategy
```typescript
// Add cache headers
res.setHeader('Cache-Control', 'public, max-age=3600');
```

---

## 🔍 Monitoring & Logging

### Setup Error Tracking (Sentry)

1. Create account: https://sentry.io
2. Create project for Next.js
3. Get DSN key

```bash
npm install @sentry/nextjs
```

Configure in `next.config.js`:
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Setup Performance Monitoring

```typescript
// Log slow queries
const startTime = Date.now();
const result = await db.query();
const duration = Date.now() - startTime;

if (duration > 1000) {
  console.warn(`Slow query: ${duration}ms`);
}
```

---

## 🆘 Troubleshooting Deployment

### Issue: Build Fails on Vercel

```bash
# Check build logs in Vercel dashboard
# Common causes:
# 1. Environment variables not set
# 2. TypeScript errors
# 3. Missing dependencies

# Solution:
npm run build  # Test locally first
```

### Issue: Database Connection Error

```bash
# Verify connection string format
# mongodb+srv://user:password@cluster.mongodb.net/database

# Check IP whitelist in MongoDB Atlas
# Add production server IP to whitelist
```

### Issue: API Timeout

```bash
# Increase timeout in serverless functions
# Vercel: Configure in vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## 📞 Post-Deployment

### Verify Deployment

1. Test all endpoints
2. Check database connections
3. Verify environment variables
4. Test authentication flow
5. Monitor error logs

### Database Backup

```bash
# Manual backup with MongoDB Atlas
# Go to Database > Backup > Backup Now

# Or automatic backups
# Enable: Settings > Backup Frequency > Daily
```

### Performance Metrics

Monitor in dashboard:
- Response times
- Error rates
- Database performance
- User growth
- API usage

---

## 🔒 Security After Deployment

1. **Regular Updates**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Monitor Logs**
   - Check for unusual activity
   - Review error logs daily

3. **Backup Management**
   - Test restore monthly
   - Maintain 30-day backup history

4. **Access Control**
   - Limit database access
   - Rotate API keys quarterly

---

## 📊 Cost Estimation

### Vercel
- **Free:** Up to 100GB bandwidth
- **Pro:** $20/month

### Railway
- **Free:** $5 credit/month
- **Pro:** Pay as you go

### DigitalOcean
- **Starter:** $5/month (basic)
- **Standard:** $12/month (recommended)

### MongoDB Atlas
- **Free:** 512MB storage
- **Shared:** $9/month (recommended)

---

## 🎯 Next Steps

1. Choose deployment platform
2. Setup environment variables
3. Configure database
4. Deploy application
5. Test thoroughly
6. Setup monitoring
7. Create backup plan

---

**Happy deploying! 🚀**
