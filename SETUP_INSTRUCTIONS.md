# AI Course Generator - Setup Instructions

## 🚀 Quick Start

Your AI Course Generator application is now ready! Here's how to get it running:

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in your project root with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Development Mode
NODE_ENV=development
```

### 3. Run the Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Service Setup

### Clerk Authentication (Required)
1. Go to [clerk.com](https://clerk.com/)
2. Create a free account and new application
3. Copy your publishable and secret keys to `.env.local`

### Firebase (Optional - for data persistence)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database and Storage
4. Copy the config to `.env.local`

### YouTube API (Optional - for video integration)
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Enable YouTube Data API v3
3. Create an API key
4. Add to `.env.local`

### OpenAI API (Optional - for AI content generation)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Add to `.env.local`

## 🎯 Features Implemented

### ✅ Core Features
- **Landing Page**: Beautiful homepage with features showcase
- **Authentication**: Complete Clerk integration with sign-in/sign-up
- **Dashboard**: Course overview with analytics and recent courses
- **Course Creation**: 3-step wizard for creating AI-powered courses
- **Course Viewing**: Detailed course view with chapters and videos
- **Responsive Design**: Mobile-friendly interface

### ✅ API Integration
- **Hybrid API System**: Real APIs with demo fallbacks
- **OpenAI Integration**: AI-powered course content generation
- **YouTube Integration**: Automatic video discovery and embedding
- **Firebase Integration**: Data persistence and file storage
- **Error Handling**: Graceful fallbacks when APIs are unavailable

### ✅ User Experience
- **Step-by-step Course Creation**: Category → Details → Preview → Generate
- **Real-time Generation**: Live progress indicators during AI generation
- **Course Management**: View, edit, and delete courses
- **Chapter Navigation**: Interactive chapter list with progress tracking
- **Video Integration**: Embedded YouTube videos in chapters

## 🔄 How It Works

### Demo Mode (No API Keys Required)
- Uses mock data and simulated AI generation
- Perfect for testing and development
- All features work without external dependencies

### Production Mode (With API Keys)
- Real AI content generation using OpenAI GPT-3.5
- Actual YouTube video search and embedding
- Persistent data storage with Firebase
- Full user authentication and management

## 🛠️ Development

### File Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard pages
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/           # React components
│   ├── course-creation/  # Course creation components
│   └── ui/              # Reusable UI components
├── lib/                 # Utility libraries
│   ├── demo-api.ts      # Mock API service
│   ├── real-api.ts      # Real API service
│   └── firebase.ts      # Firebase configuration
└── types/               # TypeScript type definitions
```

### API Services
- **DemoAPIService**: Mock data for development
- **RealAPIService**: Production API integrations
- **Hybrid Approach**: Automatically falls back to demo when APIs fail

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site hosting
- **Railway**: Full-stack deployment
- **AWS/GCP**: Container deployment

## 📝 Usage Guide

### Creating Your First Course
1. Sign up for an account
2. Go to Dashboard → Create New Course
3. Choose a category (Programming, Design, etc.)
4. Fill in course details (title, description, topic)
5. Review and generate with AI
6. View your generated course with chapters and videos

### Managing Courses
- **Dashboard**: Overview of all your courses
- **Course Detail**: View chapters, watch videos, track progress
- **Edit/Delete**: Manage your course library

## 🔍 Troubleshooting

### Common Issues
1. **API Keys Not Working**: Check `.env.local` file exists and keys are correct
2. **Authentication Issues**: Verify Clerk configuration
3. **Firebase Errors**: Check project setup and rules
4. **YouTube API Limits**: Monitor quota in Google Cloud Console

### Getting Help
- Check browser console for error messages
- Verify all environment variables are set
- Test with demo mode first (no API keys required)

## 🎉 You're All Set!

Your AI Course Generator is now fully functional with:
- ✅ Complete authentication system
- ✅ AI-powered course generation
- ✅ Video integration
- ✅ Data persistence
- ✅ Beautiful, responsive UI
- ✅ Production-ready architecture

Start creating amazing courses with AI assistance!
