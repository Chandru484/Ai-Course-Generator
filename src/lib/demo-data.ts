import { Course, Chapter, Category } from '@/types'

export const demoCategories: Category[] = [
  {
    id: '1',
    name: 'Programming',
    description: 'Learn programming languages and development',
    icon: '💻'
  },
  {
    id: '2',
    name: 'Design',
    description: 'UI/UX design and graphic design courses',
    icon: '🎨'
  },
  {
    id: '3',
    name: 'Business',
    description: 'Business strategy and entrepreneurship',
    icon: '💼'
  },
  {
    id: '4',
    name: 'Marketing',
    description: 'Digital marketing and social media',
    icon: '📈'
  },
  {
    id: '5',
    name: 'Data Science',
    description: 'Analytics, AI, and machine learning',
    icon: '📊'
  },
  {
    id: '6',
    name: 'Photography',
    description: 'Digital photography and editing',
    icon: '📷'
  }
]

export const demoChapters: Chapter[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React and component-based development',
    content: 'React is a JavaScript library for building user interfaces. In this chapter, we will explore the basic concepts of React including components, JSX, and state management.',
    order: 1,
    courseId: 'demo-1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Components and Props',
    description: 'Understanding how to create and use React components',
    content: 'Components are the building blocks of React applications. Learn how to create reusable components and pass data through props.',
    order: 2,
    courseId: 'demo-1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'State and Lifecycle',
    description: 'Managing component state and understanding lifecycle methods',
    content: 'State allows components to manage their own data. Learn about useState, useEffect, and other hooks for state management.',
    order: 3,
    courseId: 'demo-1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'Handling Events',
    description: 'Working with user interactions and event handling',
    content: 'Learn how to handle user interactions like clicks, form submissions, and other events in React applications.',
    order: 4,
    courseId: 'demo-1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'Conditional Rendering',
    description: 'Displaying different content based on conditions',
    content: 'Conditional rendering allows you to show or hide elements based on certain conditions. Learn various techniques for conditional rendering.',
    order: 5,
    courseId: 'demo-1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
]

export const demoCourses: Course[] = [
  {
    id: 'demo-1',
    title: 'Complete React Development Course',
    description: 'Master React from basics to advanced concepts including hooks, context, and modern development practices.',
    category: 'Programming',
    topic: 'React.js',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    chapters: demoChapters,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    userId: 'demo-user'
  },
  {
    id: 'demo-2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design with practical projects.',
    category: 'Design',
    topic: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    chapters: [
      {
        id: '6',
        title: 'Design Principles',
        description: 'Understanding core design principles',
        content: 'Learn about balance, contrast, emphasis, and other fundamental design principles.',
        order: 1,
        courseId: 'demo-2'
      },
      {
        id: '7',
        title: 'User Research',
        description: 'Conducting effective user research',
        content: 'Methods and techniques for understanding user needs and behaviors.',
        order: 2,
        courseId: 'demo-2'
      }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    userId: 'demo-user'
  },
  {
    id: 'demo-3',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to digital marketing including SEO, social media, and content marketing.',
    category: 'Marketing',
    topic: 'Digital Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    chapters: [
      {
        id: '8',
        title: 'SEO Fundamentals',
        description: 'Search engine optimization basics',
        content: 'Learn how to optimize your content for search engines.',
        order: 1,
        courseId: 'demo-3'
      },
      {
        id: '9',
        title: 'Social Media Marketing',
        description: 'Effective social media strategies',
        content: 'Build and execute successful social media campaigns.',
        order: 2,
        courseId: 'demo-3'
      }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    userId: 'demo-user'
  }
]

export const demoStats = {
  totalCourses: 12,
  totalStudents: 2847,
  totalRevenue: 15420,
  monthlyGrowth: 23.5
}

export function generateMockCourse(title: string, description: string, category: string): Course {
  const mockChapters: Chapter[] = [
    {
      id: generateId(),
      title: 'Introduction',
      description: 'Getting started with the course',
      content: `Welcome to ${title}! This chapter will introduce you to the fundamental concepts.`,
      order: 1,
      courseId: generateId()
    },
    {
      id: generateId(),
      title: 'Core Concepts',
      description: 'Understanding the main topics',
      content: 'In this chapter, we will dive deep into the core concepts and principles.',
      order: 2,
      courseId: generateId()
    },
    {
      id: generateId(),
      title: 'Practical Application',
      description: 'Applying what you have learned',
      content: 'Time to put your knowledge into practice with real-world examples.',
      order: 3,
      courseId: generateId()
    }
  ]

  return {
    id: generateId(),
    title,
    description,
    category,
    topic: category,
    imageUrl: `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=400&h=300&fit=crop`,
    chapters: mockChapters,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'demo-user'
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
