import mongoose from 'mongoose'
import Course from './models/course.js'
import User from './models/user.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

// Sample educator ID (you'll need to replace this with a real educator user ID from your database)
const SAMPLE_EDUCATOR_ID = "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V" // Replace with actual educator ID

const courses = [
  // ===================== JAVASCRIPT COURSE =====================
  {
    courseTitle: "Complete JavaScript Mastery",
    courseDescription: `
      <h2>Master JavaScript from Zero to Hero</h2>
      <p>Learn JavaScript fundamentals, ES6+, DOM manipulation, async programming, and modern JavaScript development.</p>
      <ul>
        <li>Variables, Functions, and Control Structures</li>
        <li>ES6+ Features (Arrow Functions, Destructuring, Modules)</li>
        <li>DOM Manipulation and Event Handling</li>
        <li>Async JavaScript (Promises, Async/Await)</li>
        <li>Modern JavaScript Development</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    coursePrice: 49.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "js_ch1",
        chapterOrder: 1,
        chapterTitle: "JavaScript Fundamentals",
        chapterContent: [
          {
            lectureId: "js_1_1",
            lectureTitle: "What is JavaScript? - Introduction",
            lectureDuration: 15,
            lectureUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "js_1_2",
            lectureTitle: "Variables and Data Types",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "js_1_3",
            lectureTitle: "Functions and Scope",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=N8ap4k_1QEQ",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "js_ch2",
        chapterOrder: 2,
        chapterTitle: "DOM Manipulation",
        chapterContent: [
          {
            lectureId: "js_2_1",
            lectureTitle: "Understanding the DOM",
            lectureDuration: 18,
            lectureUrl: "https://www.youtube.com/watch?v=0ik6X4DJKCc",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "js_2_2",
            lectureTitle: "Event Handling",
            lectureDuration: 22,
            lectureUrl: "https://www.youtube.com/watch?v=XF1_MlZ5l6M",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample1", rating: 5 },
      { userId: "user_sample2", rating: 4 },
    ],
  },

  // ===================== PYTHON COURSE =====================
  {
    courseTitle: "Python Programming Complete Course",
    courseDescription: `
      <h2>Learn Python from Beginner to Advanced</h2>
      <p>Master Python programming with hands-on projects, data structures, OOP, and real-world applications.</p>
      <ul>
        <li>Python Syntax and Basic Programming</li>
        <li>Data Structures and Algorithms</li>
        <li>Object-Oriented Programming</li>
        <li>File Handling and Error Management</li>
        <li>Libraries and Frameworks</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/HGOBQPFzWKo/maxresdefault.jpg",
    coursePrice: 79.99,
    isPublished: true,
    discount: 15,
    courseContent: [
      {
        chapterId: "py_ch1",
        chapterOrder: 1,
        chapterTitle: "Python Basics",
        chapterContent: [
          {
            lectureId: "py_1_1",
            lectureTitle: "Python Installation and Setup",
            lectureDuration: 12,
            lectureUrl: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "py_1_2",
            lectureTitle: "Variables and Data Types",
            lectureDuration: 18,
            lectureUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "py_1_3",
            lectureTitle: "Control Structures",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=DQgof4GXMIk",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "py_ch2",
        chapterOrder: 2,
        chapterTitle: "Object-Oriented Programming",
        chapterContent: [
          {
            lectureId: "py_2_1",
            lectureTitle: "Classes and Objects",
            lectureDuration: 30,
            lectureUrl: "https://www.youtube.com/watch?v=JeznW_7DlB0",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "py_2_2",
            lectureTitle: "Inheritance and Polymorphism",
            lectureDuration: 28,
            lectureUrl: "https://www.youtube.com/watch?v=RSl87lqOXDE",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample3", rating: 5 },
      { userId: "user_sample4", rating: 5 },
    ],
  },

  // ===================== REACT COURSE =====================
  {
    courseTitle: "React.js Complete Guide",
    courseDescription: `
      <h2>Build Modern Web Applications with React</h2>
      <p>Learn React from scratch, including hooks, state management, routing, and building real projects.</p>
      <ul>
        <li>React Components and JSX</li>
        <li>State Management with Hooks</li>
        <li>React Router for Navigation</li>
        <li>API Integration and HTTP Requests</li>
        <li>Building Real-World Projects</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    coursePrice: 89.99,
    isPublished: true,
    discount: 25,
    courseContent: [
      {
        chapterId: "react_ch1",
        chapterOrder: 1,
        chapterTitle: "React Fundamentals",
        chapterContent: [
          {
            lectureId: "react_1_1",
            lectureTitle: "What is React?",
            lectureDuration: 15,
            lectureUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "react_1_2",
            lectureTitle: "Components and JSX",
            lectureDuration: 22,
            lectureUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "react_1_3",
            lectureTitle: "Props and State",
            lectureDuration: 28,
            lectureUrl: "https://www.youtube.com/watch?v=4UZrsTqkcW4",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "react_ch2",
        chapterOrder: 2,
        chapterTitle: "React Hooks",
        chapterContent: [
          {
            lectureId: "react_2_1",
            lectureTitle: "useState Hook",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "react_2_2",
            lectureTitle: "useEffect Hook",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=0ZJgIjIuY7U",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample5", rating: 5 },
    ],
  },

  // ===================== DATA STRUCTURES & ALGORITHMS =====================
  {
    courseTitle: "Data Structures & Algorithms Masterclass",
    courseDescription: `
      <h2>Master DSA for Coding Interviews</h2>
      <p>Complete guide to data structures and algorithms with coding problems and interview preparation.</p>
      <ul>
        <li>Arrays, Linked Lists, Stacks, Queues</li>
        <li>Trees, Graphs, and Hash Tables</li>
        <li>Sorting and Searching Algorithms</li>
        <li>Dynamic Programming</li>
        <li>Coding Interview Problems</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg",
    coursePrice: 99.99,
    isPublished: true,
    discount: 30,
    courseContent: [
      {
        chapterId: "dsa_ch1",
        chapterOrder: 1,
        chapterTitle: "Introduction to DSA",
        chapterContent: [
          {
            lectureId: "dsa_1_1",
            lectureTitle: "Why Learn Data Structures?",
            lectureDuration: 12,
            lectureUrl: "https://www.youtube.com/watch?v=8hly31xKli0",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "dsa_1_2",
            lectureTitle: "Time and Space Complexity",
            lectureDuration: 18,
            lectureUrl: "https://www.youtube.com/watch?v=mV3wrLBbuuE",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "dsa_1_3",
            lectureTitle: "Arrays and Strings",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=QJNwK2uJyGs",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "dsa_ch2",
        chapterOrder: 2,
        chapterTitle: "Advanced Data Structures",
        chapterContent: [
          {
            lectureId: "dsa_2_1",
            lectureTitle: "Binary Trees",
            lectureDuration: 30,
            lectureUrl: "https://www.youtube.com/watch?v=fAAZixBzIAI",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "dsa_2_2",
            lectureTitle: "Graph Algorithms",
            lectureDuration: 35,
            lectureUrl: "https://www.youtube.com/watch?v=tWVWeAqZ0WU",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample6", rating: 5 },
      { userId: "user_sample7", rating: 4 },
    ],
  },

  // ===================== NODE.JS COURSE =====================
  {
    courseTitle: "Node.js Backend Development",
    courseDescription: `
      <h2>Build Scalable Backend Applications</h2>
      <p>Learn Node.js, Express.js, MongoDB, and build RESTful APIs and full-stack applications.</p>
      <ul>
        <li>Node.js Fundamentals</li>
        <li>Express.js Framework</li>
        <li>MongoDB and Mongoose</li>
        <li>Authentication and Authorization</li>
        <li>RESTful API Development</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
    coursePrice: 79.99,
    isPublished: true,
    discount: 20,
    courseContent: [
      {
        chapterId: "node_ch1",
        chapterOrder: 1,
        chapterTitle: "Node.js Basics",
        chapterContent: [
          {
            lectureId: "node_1_1",
            lectureTitle: "Introduction to Node.js",
            lectureDuration: 15,
            lectureUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "node_1_2",
            lectureTitle: "NPM and Package Management",
            lectureDuration: 18,
            lectureUrl: "https://www.youtube.com/watch?v=jHDhaSSKmB0",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "node_1_3",
            lectureTitle: "File System and Modules",
            lectureDuration: 22,
            lectureUrl: "https://www.youtube.com/watch?v=xHLd36QoS4k",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "node_ch2",
        chapterOrder: 2,
        chapterTitle: "Express.js Framework",
        chapterContent: [
          {
            lectureId: "node_2_1",
            lectureTitle: "Setting up Express Server",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "node_2_2",
            lectureTitle: "Middleware and Routing",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=lY6icfhap2o",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample8", rating: 5 },
    ],
  },

  // ===================== FULL STACK COURSE =====================
  {
    courseTitle: "Full Stack Web Development",
    courseDescription: `
      <h2>Become a Complete Full Stack Developer</h2>
      <p>Learn frontend, backend, databases, and deployment to build complete web applications.</p>
      <ul>
        <li>HTML, CSS, JavaScript</li>
        <li>React.js Frontend Development</li>
        <li>Node.js Backend Development</li>
        <li>Database Design and Management</li>
        <li>Deployment and DevOps</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/nu_pCVPKzTk/maxresdefault.jpg",
    coursePrice: 129.99,
    isPublished: true,
    discount: 35,
    courseContent: [
      {
        chapterId: "fs_ch1",
        chapterOrder: 1,
        chapterTitle: "Frontend Development",
        chapterContent: [
          {
            lectureId: "fs_1_1",
            lectureTitle: "HTML & CSS Fundamentals",
            lectureDuration: 45,
            lectureUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "fs_1_2",
            lectureTitle: "JavaScript for Web Development",
            lectureDuration: 50,
            lectureUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "fs_1_3",
            lectureTitle: "React.js Fundamentals",
            lectureDuration: 40,
            lectureUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "fs_ch2",
        chapterOrder: 2,
        chapterTitle: "Backend Development",
        chapterContent: [
          {
            lectureId: "fs_2_1",
            lectureTitle: "Node.js and Express Setup",
            lectureDuration: 35,
            lectureUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "fs_2_2",
            lectureTitle: "Database Integration",
            lectureDuration: 40,
            lectureUrl: "https://www.youtube.com/watch?v=0B2raYYH2fE",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample9", rating: 5 },
      { userId: "user_sample10", rating: 5 },
    ],
  },

  // ===================== MACHINE LEARNING COURSE =====================
  {
    courseTitle: "Machine Learning with Python",
    courseDescription: `
      <h2>Master Machine Learning from Scratch</h2>
      <p>Learn ML algorithms, data preprocessing, model evaluation, and build real ML projects.</p>
      <ul>
        <li>Python for Data Science</li>
        <li>Supervised Learning Algorithms</li>
        <li>Unsupervised Learning</li>
        <li>Deep Learning Basics</li>
        <li>Real-World ML Projects</li>
      </ul>
    `,
    courseThumbnail: "https://img.youtube.com/vi/7eh4d6sabA0/maxresdefault.jpg",
    coursePrice: 109.99,
    isPublished: true,
    discount: 25,
    courseContent: [
      {
        chapterId: "ml_ch1",
        chapterOrder: 1,
        chapterTitle: "Introduction to Machine Learning",
        chapterContent: [
          {
            lectureId: "ml_1_1",
            lectureTitle: "What is Machine Learning?",
            lectureDuration: 20,
            lectureUrl: "https://www.youtube.com/watch?v=7eh4d6sabA0",
            isPreviewFree: true,
            lectureOrder: 1,
          },
          {
            lectureId: "ml_1_2",
            lectureTitle: "Types of Machine Learning",
            lectureDuration: 25,
            lectureUrl: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
            isPreviewFree: true,
            lectureOrder: 2,
          },
          {
            lectureId: "ml_1_3",
            lectureTitle: "Python Libraries for ML",
            lectureDuration: 30,
            lectureUrl: "https://www.youtube.com/watch?v=45ryDIPHdGg",
            isPreviewFree: false,
            lectureOrder: 3,
          },
        ],
      },
      {
        chapterId: "ml_ch2",
        chapterOrder: 2,
        chapterTitle: "Supervised Learning",
        chapterContent: [
          {
            lectureId: "ml_2_1",
            lectureTitle: "Linear Regression",
            lectureDuration: 35,
            lectureUrl: "https://www.youtube.com/watch?v=E5RjzSK0fvY",
            isPreviewFree: false,
            lectureOrder: 1,
          },
          {
            lectureId: "ml_2_2",
            lectureTitle: "Classification Algorithms",
            lectureDuration: 40,
            lectureUrl: "https://www.youtube.com/watch?v=yIYKR4sgzI8",
            isPreviewFree: false,
            lectureOrder: 2,
          },
        ],
      },
    ],
    educator: SAMPLE_EDUCATOR_ID,
    enrolledStudents: [],
    courseRatings: [
      { userId: "user_sample11", rating: 5 },
      { userId: "user_sample12", rating: 4 },
    ],
  },
]

const seedCourses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing courses (optional - remove this if you want to keep existing courses)
    // await Course.deleteMany({})
    // console.log('Cleared existing courses')

    // Insert new courses
    const insertedCourses = await Course.insertMany(courses)
    console.log(`✅ Successfully seeded ${insertedCourses.length} courses`)

    // Display course titles
    insertedCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.courseTitle} - $${course.coursePrice}`)
    })

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\nCourses added:')
    console.log('- JavaScript Complete Course')
    console.log('- Python Programming Course')
    console.log('- React.js Complete Guide')
    console.log('- Data Structures & Algorithms')
    console.log('- Node.js Backend Development')
    console.log('- Full Stack Web Development')
    console.log('- Machine Learning with Python')

  } catch (error) {
    console.error('❌ Error seeding courses:', error)
  } finally {
    // Close the connection
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// Run the seed function
seedCourses()