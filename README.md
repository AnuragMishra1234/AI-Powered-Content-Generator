# GenAI Hub - AI-Powered SaaS Platform

A production-ready, full-stack SaaS application for generating AI-powered content including text, posters, resumes, and websites.

## 🎯 Features

### Core Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Text Generator**: Create captions, blogs, and creative ideas
- **Poster Generator**: Design beautiful marketing posters
- **Resume Builder**: Generate professional resumes instantly
- **Website Generator**: Create HTML websites without coding
- **Generation History**: Track all your AI generations
- **Credits System**: Limited credits per user for API usage
- **Dark Mode**: Beautiful light/dark theme toggle

### Technical Features
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Secure Backend**: Node.js + Express API routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with bcrypt password hashing
- **Responsive Design**: Mobile-first, works on all devices
- **Error Handling**: Comprehensive error handling and validation
- **Scalable Architecture**: Modular, production-ready code structure

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or cloud instance)
- Groq API key (or HuggingFace for alternative AI integration)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd genai-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/genai-hub

# JWT Secret (Use a strong secret in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Groq Configuration
GROQ_API_KEY=your-groq-api-key

# Alternative: HuggingFace
HUGGINGFACE_API_KEY=your-huggingface-api-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Then start the MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update MONGODB_URI in `.env.local`

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
genai-hub/
├── app/
│   ├── api/                    # API route handlers
│   │   ├── auth/              # Authentication endpoints
│   │   │   ├── signup/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── me/route.ts
│   │   ├── generate/          # AI generation endpoints
│   │   │   ├── text/route.ts
│   │   │   ├── poster/route.ts
│   │   │   ├── resume/route.ts
│   │   │   └── website/route.ts
│   │   └── history/route.ts
│   ├── dashboard/             # Dashboard pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── text/page.tsx
│   │   ├── poster/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── website/page.tsx
│   │   └── history/page.tsx
│   ├── auth/                  # Authentication pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── components/            # Reusable components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── OutputCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── lib/                   # Utilities and helpers
│   │   ├── mongodb.ts         # Database connection
│   │   ├── auth.ts            # JWT utilities
│   │   ├── middleware.ts      # Auth middleware
│   │   ├── apiResponse.ts     # Response helpers
│   │   ├── models/            # Database models
│   │   │   ├── User.ts
│   │   │   └── History.ts
│   │   └── ThemeProvider.tsx
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Text Generation
- `POST /api/generate/text` - Generate text content (requires auth)

### Poster Generation
- `POST /api/generate/poster` - Generate poster (requires auth)

### Resume Generation
- `POST /api/generate/resume` - Generate resume (requires auth)

### Website Generation
- `POST /api/generate/website` - Generate website (requires auth)

### History
- `GET /api/history` - Get user's generation history (requires auth)
- `DELETE /api/history?id=<ID>` - Delete history item (requires auth)

## 🔐 Authentication Flow

1. User signs up with email and password
2. Password is hashed with bcrypt (10 salt rounds)
3. JWT token is generated with 30-day expiration
4. Token is stored in localStorage on client
5. Token is sent with Authorization header for protected routes
6. Token is verified on backend before processing requests

## 💰 Credits System

- New users start with **100 credits**
- Each generation costs a certain number of credits:
  - Text Generation: 10 credits
  - Poster Generation: 20 credits
  - Resume Generation: 15 credits
  - Website Generation: 25 credits
- Users cannot generate if they have insufficient credits
- Credits are deducted after successful generation

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: System preference detection and manual toggle
- **Loading States**: Elegant animations during AI processing
- **Error Handling**: User-friendly error messages
- **Copy to Clipboard**: One-click content copying
- **Download Support**: Export generated content as files
- **Glass Effect**: Modern glassmorphism design elements
- **Gradient Text**: Eye-catching gradient typography

## 🛠️ Configuration

### Next.js Configuration
- App Router (Next.js 14)
- TypeScript strict mode enabled
- Image optimization enabled
- Incremental Static Regeneration

### Tailwind CSS
- Responsive design utilities
- Dark mode support
- Custom color extensions
- Pre-defined animations

### Database Models

**User Model**
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  credits: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**History Model**
```typescript
{
  userId: ObjectId (ref: User),
  toolType: String (text|poster|resume|website),
  input: String,
  output: String,
  creditsUsed: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 📝 Database Indexing

- `User.email` - Unique index
- `History.userId + History.createdAt` - Compound index for fast queries

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Update environment variables in Vercel dashboard:
- MONGODB_URI
- JWT_SECRET
- OPENAI_API_KEY

### Building for Production
```bash
npm run build
npm start
```

## 🔒 Security Considerations

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with expiration
- ✅ CORS configured
- ✅ SQL injection prevention via Mongoose ODM
- ✅ XSS protection via React/Next.js
- ✅ CSRF tokens (implement if using form-based auth)
- ✅ Rate limiting recommended (implement with middleware)
- ✅ Environment variables for sensitive data

## 🆚 Integrating Real AI APIs

### OpenAI Integration
Replace mock functions in `/api/generate/*` with actual API calls:

```typescript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  messages: [
    { role: 'user', content: prompt }
  ],
});
```

### HuggingFace Integration
```typescript
const response = await fetch(
  'https://api-inference.huggingface.co/models/gpt2',
  {
    headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
    method: 'POST',
    body: JSON.stringify({ inputs: prompt }),
  }
);
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongo --eval "db.version()"

# Verify connection string
# Format: mongodb://username:password@host:port/database
```

### JWT Errors
- Ensure JWT_SECRET is set correctly
- Check token format in Authorization header
- Verify token expiration time

### API 404 Errors
- Ensure file names match route patterns
- Check Next.js App Router conventions
- Verify `/api` folder structure

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📚 Learning Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js, MongoDB, and Tailwind CSS**
