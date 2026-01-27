import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Learn from the best
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
          Discover our top-rated courses across various categories and start your learning journey today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/course-list"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-2 text-gray-500 border border-gray-300 px-10 py-3 rounded-full font-medium hover:bg-gray-50 transition"
        >
          View all courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
