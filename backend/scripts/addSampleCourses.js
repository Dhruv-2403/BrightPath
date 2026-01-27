import mongoose from 'mongoose';
import Course from '../models/course.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sampleCourses = [
  {
    courseTitle: "Complete Data Structures & Algorithms",
    courseDescription: "Master DSA from basics to advanced. Learn arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming with hands-on coding examples.",
    category: "DSA",
    level: "Beginner",
    coursePrice: 49.99,
    discount: 20,
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
            lectureDuration: 15,
            lectureUrl: "https://example.com/lecture1",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "lec2",
            lectureTitle: "Time and Space Complexity",
            lectureDuration: 20,
            lectureUrl: "https://example.com/lecture2",
            isPreviewFree: true,
            lectureOrder: 2
          }
        ]
      },
      {
        chapterId: "ch2",
        chapterTitle: "Arrays and Strings",
        chapterOrder: 2,
        chapterContent: [
          {
            lectureId: "lec3",
            lectureTitle: "Array Operations",
            lectureDuration: 25,
            lectureUrl: "https://example.com/lecture3",
            isPreviewFree: false,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Advanced Algorithms & Problem Solving",
    courseDescription: "Take your DSA skills to the next level. Learn advanced algorithms, problem-solving patterns, and competitive programming techniques.",
    category: "DSA",
    level: "Advanced",
    coursePrice: 79.99,
    discount: 15,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Advanced Sorting Algorithms",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Quick Sort Deep Dive",
            lectureDuration: 30,
            lectureUrl: "https://example.com/lecture4",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Complete Web Development Bootcamp",
    courseDescription: "Build modern web applications from scratch. Learn HTML, CSS, JavaScript, React, Node.js, MongoDB, and deployment strategies.",
    category: "Web Development",
    level: "Beginner",
    coursePrice: 89.99,
    discount: 25,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "HTML & CSS Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "HTML5 Semantic Elements",
            lectureDuration: 20,
            lectureUrl: "https://example.com/lecture5",
            isPreviewFree: true,
            lectureOrder: 1
          },
          {
            lectureId: "lec2",
            lectureTitle: "CSS Grid and Flexbox",
            lectureDuration: 35,
            lectureUrl: "https://example.com/lecture6",
            isPreviewFree: true,
            lectureOrder: 2
          }
        ]
      },
      {
        chapterId: "ch2",
        chapterTitle: "JavaScript Essentials",
        chapterOrder: 2,
        chapterContent: [
          {
            lectureId: "lec3",
            lectureTitle: "DOM Manipulation",
            lectureDuration: 25,
            lectureUrl: "https://example.com/lecture7",
            isPreviewFree: false,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "React & Modern Frontend Development",
    courseDescription: "Master React.js and modern frontend development. Learn hooks, state management, routing, and build production-ready applications.",
    category: "Web Development",
    level: "Intermediate",
    coursePrice: 69.99,
    discount: 10,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "React Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Components and Props",
            lectureDuration: 25,
            lectureUrl: "https://example.com/lecture8",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Node.js & Backend Development",
    courseDescription: "Build scalable backend applications with Node.js. Learn Express, MongoDB, authentication, REST APIs, and microservices.",
    category: "Web Development",
    level: "Intermediate",
    coursePrice: 74.99,
    discount: 20,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "Node.js Fundamentals",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Event Loop and Async Programming",
            lectureDuration: 30,
            lectureUrl: "https://example.com/lecture9",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Mobile Development with React Native",
    courseDescription: "Build native mobile apps for iOS and Android using React Native. Learn components, navigation, state management, and deployment.",
    category: "Mobile Development",
    level: "Intermediate",
    coursePrice: 84.99,
    discount: 15,
    isPublished: true,
    courseContent: [
      {
        chapterId: "ch1",
        chapterTitle: "React Native Setup",
        chapterOrder: 1,
        chapterContent: [
          {
            lectureId: "lec1",
            lectureTitle: "Environment Setup and First App",
            lectureDuration: 25,
            lectureUrl: "https://example.com/lecture10",
            isPreviewFree: true,
            lectureOrder: 1
          }
        ]
      }
    ]
  }
];

const addSampleCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Use a sample educator ID (you might want to replace this with an actual educator ID)
    const sampleEducatorId = "sample_educator_123";

    // Clear existing sample courses
    await Course.deleteMany({ educator: sampleEducatorId });
    console.log('Cleared existing sample courses');

    // Add sample courses
    for (const courseData of sampleCourses) {
      courseData.educator = sampleEducatorId;
      courseData.courseThumbnail = `https://via.placeholder.com/400x300?text=${encodeURIComponent(courseData.courseTitle)}`;
      
      const course = new Course(courseData);
      await course.save();
      console.log(`Added course: ${courseData.courseTitle}`);
    }

    console.log('Sample courses added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample courses:', error);
    process.exit(1);
  }
};

addSampleCourses();
