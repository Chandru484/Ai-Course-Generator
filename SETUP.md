# AI Course Generator - Free API Setup Guide

This guide will help you set up the AI Course Generator application using free APIs and services.

## 🆓 Free Services Used

### 1. Clerk Authentication (Free Tier)
- **Free Plan**: Up to 10,000 monthly active users
- **Features**: User authentication, user management, social logins
- **Setup**: https://clerk.com/

### 2. Firebase (Free Tier - Spark Plan)
- **Free Plan**: 1 GB storage, 10 GB transfer/month
- **Features**: File storage, real-time database
- **Setup**: https://console.firebase.google.com/

### 3. YouTube Data API v3 (Free Tier)
- **Free Plan**: 10,000 units/day (100 units per search)
- **Features**: Search videos, get video details
- **Setup**: https://console.developers.google.com/

### 4. OpenAI API (Free Credits)
- **Free Plan**: $5 free credits for new users
- **Features**: GPT-3.5-turbo for content generation
- **Setup**: https://platform.openai.com/

### 5. JSONPlaceholder (Free Mock Data)
- **Free Plan**: Unlimited requests
- **Features**: Mock API for development
- **Setup**: https://jsonplaceholder.typicode.com/

## 🔧 Setup Instructions

### Step 1: Create Clerk Account
1. Go to [clerk.com](https://clerk.com/)
2. Sign up for a free account
3. Create a new application
4. Copy your publishable key and secret key
5. Add them to your `.env.local` file

### Step 2: Set up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Storage and Firestore
4. Go to Project Settings > General > Web Apps
5. Add a web app and copy the config
6. Add the config to your `.env.local` file

### Step 3: Get YouTube API Key
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env.local` file

### Step 4: Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up and get $5 free credits
3. Create an API key
4. Copy the API key to your `.env.local` file

### Step 5: Environment Variables
Create a `.env.local` file in your project root:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_WEBSITE_DOMAIN_NAME
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_NEXT_PUBLIC_FIREBASE_APP_ID

# YouTube API
NEXT_PUBLIC_YOUTUBE_API_KEY=YOUR_NEXT_PUBLIC_YOUTUBE_API_KEY

# OpenAI API
OPENAI_API_KEY=YOUR_OPENAI_API_KEY

# Development Mode
NODE_ENV=development
```

## 🚀 Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Free Tier Limits

| Service | Free Limit | Usage Monitoring |
|---------|------------|------------------|
| Clerk | 10,000 MAU | Dashboard shows usage |
| Firebase | 1GB storage | Console shows usage |
| YouTube API | 10,000 units/day | Google Cloud Console |
| OpenAI | $5 credits | OpenAI Dashboard |

## 🔄 Alternative Free Options

If you want to avoid API limits, you can use:

1. **Mock Data**: Replace AI generation with predefined course templates
2. **Local Storage**: Use browser localStorage instead of Firebase
3. **Demo Mode**: Create a demo version with sample data

## 📝 Notes

- All API keys are for development only
- Never commit API keys to version control
- Monitor your usage to stay within free limits
- Consider upgrading plans as your app grows

## 🆘 Troubleshooting

### Common Issues:
1. **Clerk not working**: Check if keys are correct and app is published
2. **Firebase errors**: Verify project configuration and rules
3. **YouTube API limits**: Check quota usage in Google Cloud Console
4. **OpenAI errors**: Verify API key and check credit balance

### Getting Help:
- Check service documentation
- Use browser developer tools for debugging
- Check console logs for error messages
