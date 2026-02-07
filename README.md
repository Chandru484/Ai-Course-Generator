# 🚀 AI Course Generator

A comprehensive full-stack application for creating AI-powered educational courses with multimedia integration. Built with Next.js, React, TypeScript, and modern web technologies.


## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Course Generation**: Create comprehensive courses using AI assistance
- **Multi-step Course Creation**: Intuitive wizard for course setup
- **Category Selection**: Choose from predefined course categories
- **Course Management**: Full CRUD operations for courses and chapters
- **User Authentication**: Secure login/signup with Clerk
- **Responsive Design**: Works perfectly on desktop and mobile

### 🎨 User Interface
- **Modern Landing Page**: Beautiful hero section with features showcase
- **Dashboard**: Comprehensive overview with statistics and recent courses
- **Course Creation Wizard**: Step-by-step course generation process
- **Category Selection**: Visual category picker with icons
- **Course Preview**: Review before AI generation

### 🤖 AI Integration
- **Content Generation**: AI creates course outlines and chapter content
- **YouTube Integration**: Automatically finds relevant educational videos
- **Image Generation**: Creates course thumbnails and visuals
- **Smart Recommendations**: Suggests related topics and resources

### 📊 Analytics & Management
- **Course Statistics**: Track course performance and engagement
- **User Management**: Comprehensive user dashboard
- **File Storage**: Firebase integration for media files
- **Real-time Updates**: Live course creation progress

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible component primitives

### Backend & Services
- **Clerk** - Authentication and user management
- **Firebase** - File storage and database
- **OpenAI API** - AI content generation
- **YouTube Data API** - Video search and integration
- **Demo API** - Mock services for development

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-course-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure free API keys** (See [SETUP.md](./SETUP.md) for detailed instructions)
   - Clerk (Authentication)
   - Firebase (Storage)
   - YouTube API (Videos)
   - OpenAI API (AI Generation)

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Setup Guide

For detailed setup instructions with free API keys, see [SETUP.md](./SETUP.md)

### Free Services Used:
- **Clerk**: 10,000 monthly active users
- **Firebase**: 1GB storage, 10GB transfer
- **YouTube API**: 10,000 units/day
- **OpenAI**: $5 free credits

## 🎯 Usage

### Creating Your First Course

1. **Sign Up**: Create an account using Clerk authentication
2. **Access Dashboard**: View your course statistics and recent activity
3. **Create Course**: Click "Create New Course" to start the wizard
4. **Select Category**: Choose from Programming, Design, Business, etc.
5. **Add Details**: Provide course title, description, and target audience
6. **Generate**: Let AI create your comprehensive course with content and videos

### Course Management

- **View All Courses**: Browse your created courses
- **Edit Courses**: Modify course details and chapters
- **Add Chapters**: Extend courses with additional content
- **Analytics**: Track course performance and student engagement

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── course-creation/ # Course creation components
│   └── ...              # Other components
├── lib/                 # Utility functions
│   ├── demo-api.ts     # Mock API service
│   ├── demo-data.ts    # Sample data
│   └── ...             # Other utilities
├── types/              # TypeScript type definitions
├── context/            # React context providers
└── hooks/              # Custom React hooks
```

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure

- **Components**: Reusable UI components with TypeScript
- **Pages**: Next.js App Router pages
- **API Routes**: Server-side API endpoints
- **Context**: React context for state management
- **Utils**: Helper functions and utilities

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/app/globals.css` for global styles
- Use Tailwind utility classes throughout components

### Content
- Edit `src/lib/demo-data.ts` for sample data
- Modify categories in the course creation flow
- Update the landing page content

### Features
- Add new course categories
- Implement additional AI features
- Extend the analytics dashboard
- Add more multimedia integrations

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **AWS**: Scalable cloud deployment

## 📊 Demo Mode

The application includes a comprehensive demo mode that works without API keys:

- **Mock Data**: Predefined courses and categories
- **Simulated AI**: Fake AI generation with realistic delays
- **Demo API**: Complete mock service layer
- **Sample Content**: Realistic course examples

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Clerk** for authentication services
- **Firebase** for backend services
- **OpenAI** for AI capabilities
- **Tailwind CSS** for styling utilities

## 📞 Support

- **Documentation**: Check the [SETUP.md](./SETUP.md) file
- **Issues**: Report bugs via GitHub issues
- **Discussions**: Join community discussions

---

**Built with ❤️ for educators and learners worldwide**

*Start creating amazing AI-powered courses today!*
