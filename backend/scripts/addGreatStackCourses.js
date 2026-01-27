import mongoose from 'mongoose';
import Course from '../models/course.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const greatStackCourses = [
  {
    courseTitle: "Complete React Course 2024",
    courseDescription: "Master React.js from basics to advanced. Learn hooks, state management, routing, and build modern web applications with React. Includes Redux, React Router, and real-world projects.",
    category: "Web Development",
    level: "Intermediate",
    coursePrice: 89.99,
    discount: 30,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "React Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction to React",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=Pyv0tMm5i_w",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "JavaScript Full Course",
    courseDescription: "Complete JavaScript masterclass from zero to hero. Learn ES6+, async programming, DOM manipulation, and advanced JavaScript concepts with hands-on projects.",
    category: "Web Development",
    level: "Beginner",
    coursePrice: 79.99,
    discount: 25,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "JavaScript Basics",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Variables and Data Types",
            lectureDuration: 30,
            lectureUrl: "https://www.youtube.com/watch?v=gbAdFfSdtQ4",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "HTML & CSS Complete Course",
    courseDescription: "Build beautiful responsive websites with HTML5 and CSS3. Learn modern CSS techniques, Flexbox, Grid, animations, and create stunning web designs from scratch.",
    category: "Web Development",
    level: "Beginner",
    coursePrice: 69.99,
    discount: 20,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "HTML Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "HTML5 Semantic Elements",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=zgJjWx3b958",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Node.js & Express Backend",
    courseDescription: "Build powerful backend applications with Node.js and Express. Learn REST APIs, authentication, database integration, and deploy scalable server applications.",
    category: "Web Development",
    level: "Intermediate",
    coursePrice: 94.99,
    discount: 35,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Node.js Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction to Node.js",
            lectureDuration: 30,
            lectureUrl: "https://www.youtube.com/watch?v=6wf5dIrryoQ",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "MongoDB Database Masterclass",
    courseDescription: "Master MongoDB from basics to advanced. Learn NoSQL concepts, data modeling, aggregation pipeline, and integrate MongoDB with modern applications.",
    category: "Web Development",
    level: "Intermediate",
    coursePrice: 74.99,
    discount: 25,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "MongoDB Basics",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction to NoSQL",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=b_glcE0SOoE",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Python Programming Complete",
    courseDescription: "Learn Python programming from scratch. Master data structures, algorithms, OOP, and build real-world applications with Python.",
    category: "Data Science",
    level: "Beginner",
    coursePrice: 84.99,
    discount: 30,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Python Basics",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Python Installation and Setup",
            lectureDuration: 15,
            lectureUrl: "https://www.youtube.com/watch?v=xwI5OBEnsZU&list=TLPQMjcwMTIwMjY8ztYVhOGtkQ&index=2",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Data Structures & Algorithms",
    courseDescription: "Master DSA with Python. Learn arrays, linked lists, trees, graphs, sorting algorithms, and solve complex coding problems.",
    category: "DSA",
    level: "Advanced",
    coursePrice: 99.99,
    discount: 40,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Introduction to DSA",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "What are Data Structures?",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=dsa1",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Tailwind CSS Modern Design",
    courseDescription: "Create beautiful modern designs with Tailwind CSS. Learn utility-first CSS, responsive design, animations, and build stunning UI components.",
    category: "Web Development",
    level: "Intermediate",
    coursePrice: 59.99,
    discount: 15,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Tailwind CSS Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Introduction to Tailwind",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=tailwind1",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  }
];

const addGreatStackCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Use GreatStack educator ID
    const greatStackEducatorId = "greatstack_educator_123";

    // Clear existing GreatStack courses
    await Course.deleteMany({ educator: greatStackEducatorId });
    console.log('Cleared existing GreatStack courses');

    // Add GreatStack courses
    for (const courseData of greatStackCourses) {
      courseData.educator = greatStackEducatorId;
      courseData.courseThumbnail = `https://i.ytimg.com/vi/${Math.random().toString(36).substring(7)}/hqdefault.jpg`;
      
      // Ensure category and level are included
      if (!courseData.category) {
        courseData.category = "Web Development";
      }
      if (!courseData.level) {
        courseData.level = "Beginner";
      }
      
      const course = new Course(courseData);
      await course.save();
      console.log(`Added course: ${courseData.courseTitle}`);
    }

    console.log('GreatStack courses added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding GreatStack courses:', error);
    process.exit(1);
  }
};

addGreatStackCourses();
