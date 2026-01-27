import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const MyCourses = () => {
  const { getToken } = useAuth();
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`${backendUrl}/api/educator/courses`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setCourses(data.courses);
      } else {
        toast.error(data.message || 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Courses
          </h1>
          <p className="text-gray-600">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'} published
          </p>
        </div>
        <button
          onClick={() => navigate('/educator/add-courses')}
          className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg flex items-center gap-2"
        >
          <span>➕</span>
          <span>Add New Course</span>
        </button>
      </div>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                {course.courseThumbnail ? (
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">📚</span>
                  </div>
                )}

                {/* Published Badge */}
                {course.isPublished ? (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Published
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Draft
                  </div>
                )}

                {/* Discount Badge */}
                {course.discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {course.discount}% OFF
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-5">
                {/* Category & Level */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                    {course.category}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                    {course.level}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
                  {course.courseTitle}
                </h3>

                {/* Course Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.courseDescription}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{course.enrolledStudents?.length || 0} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📖</span>
                    <span>{course.courseContent?.length || 0} chapters</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    {course.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-indigo-600">
                          ${calculateDiscountedPrice(course.coursePrice, course.discount)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${course.coursePrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-indigo-600">
                        ${course.coursePrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/course/${course._id}`);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                  >
                    View Details
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-8xl mb-6">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Courses Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't created any courses yet. Start sharing your knowledge by creating your first course!
          </p>
          <button
            onClick={() => navigate('/educator/add-courses')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg inline-flex items-center gap-2"
          >
            <span>➕</span>
            <span>Create Your First Course</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
