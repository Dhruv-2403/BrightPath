import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/student/Navbar'
import Footer from '../../components/student/Footer'
import CourseCard from '../../components/student/CourseCard'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { backendUrl, currency, calculateRating, allCourses } = useContext(AppContext)
  const { getToken, userId } = useAuth()

  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  const fetchCourseData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`)
      if (data.success) {
        setCourseData(data.courseData)
        
        // Check if user is enrolled
        if (userId && data.courseData.enrolledStudents?.includes(userId)) {
          setIsAlreadyEnrolled(true)
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (courseId) => {
    if (!userId) {
      toast.error('Please login to enroll in this course')
      navigate('/login')
      return
    }

    try {
      setEnrolling(true)
      const token = await getToken()
      
      const { data } = await axios.post(
        `${backendUrl}/api/user/enroll/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      )

      if (data.success) {
        toast.success('Successfully enrolled in the course!')
        setIsAlreadyEnrolled(true)
        // Update course data to reflect enrollment
        setCourseData(prev => ({
          ...prev,
          enrolledStudents: [...(prev.enrolledStudents || []), userId]
        }))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll in course')
    } finally {
      setEnrolling(false)
    }
  }

  useEffect(() => {
    fetchCourseData()
  }, [id])

  const discountedPrice = courseData ? courseData.coursePrice - (courseData.coursePrice * courseData.discount / 100) : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link to="/course-list" className="text-blue-600 hover:text-blue-700">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  const relatedCourses = allCourses.filter(
    course => course.category === courseData.category && course._id !== courseData._id
  ).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {courseData.category}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {courseData.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {courseData.courseTitle}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {courseData.courseDescription}
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{calculateRating(courseData)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(calculateRating(courseData)) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-blue-100">({courseData.courseRatings?.length || 0} ratings)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-blue-100">{courseData.enrolledStudents?.length || 0} students</span>
                </div>
              </div>

              {/* Enroll Button */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">
                    {currency}{discountedPrice.toFixed(2)}
                  </div>
                  {courseData.discount > 0 && (
                    <div className="text-blue-200 line-through">
                      {currency}{courseData.coursePrice}
                    </div>
                  )}
                </div>
                
                {isAlreadyEnrolled ? (
                  <button
                    onClick={() => navigate(`/my-enrollments`)}
                    className="px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(courseData._id)}
                    disabled={enrolling}
                    className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
            
            <div className="relative">
              <img
                src={courseData.courseThumbnail || 'https://via.placeholder.com/600x400?text=Course'}
                alt={courseData.courseTitle}
                className="rounded-2xl shadow-2xl w-full"
              />
              {courseData.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  {courseData.discount}% OFF
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Content</h2>
            
            {courseData.courseContent && courseData.courseContent.length > 0 ? (
              <div className="space-y-4">
                {courseData.courseContent.map((chapter, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Chapter {index + 1}: {chapter.chapterTitle}
                      </h3>
                    </div>
                    {chapter.chapterContent && chapter.chapterContent.length > 0 && (
                      <div className="divide-y divide-gray-100">
                        {chapter.chapterContent.map((lecture, lectureIndex) => (
                          <div key={lectureIndex} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{lecture.lectureTitle}</h4>
                                  <p className="text-sm text-gray-500">{lecture.lectureDuration} minutes</p>
                                </div>
                              </div>
                              {lecture.isPreviewFree && (
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-600">Course content will be available soon</p>
              </div>
            )}
          </div>

          {/* Course Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Info</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{courseData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">{courseData.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {courseData.courseContent?.reduce((total, chapter) => 
                      total + (chapter.chapterContent?.reduce((chTotal, lecture) => chTotal + (lecture.lectureDuration || 0), 0) || 0), 0
                    ) || 0} minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{courseData.enrolledStudents?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium">{calculateRating(courseData)}/5</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {currency}{discountedPrice.toFixed(2)}
                  </div>
                  {courseData.discount > 0 && (
                    <div className="text-gray-400 line-through">
                      {currency}{courseData.coursePrice}
                    </div>
                  )}
                </div>
                
                {isAlreadyEnrolled ? (
                  <button
                    onClick={() => navigate(`/my-enrollments`)}
                    className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(courseData._id)}
                    disabled={enrolling}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CourseDetails
