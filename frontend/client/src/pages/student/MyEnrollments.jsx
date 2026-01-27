import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/student/Navbar'
import Footer from '../../components/student/Footer'
import { Line } from 'rc-progress'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import humanizeDuration from 'humanize-duration'

const MyEnrollments = () => {
  const { backendUrl, currency, calculateRating } = useContext(AppContext)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const fetchEnrolledCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, { withCredentials: true })
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Helper to calculate total lectures in a course
  const getTotalLectures = (course) => {
    let total = 0;
    course.courseContent.forEach(chapter => {
      total += chapter.chapterContent.length;
    });
    return total;
  }

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  return (
    <div className="bg-white min-h-screen font-outfit">
      <Navbar />

      <div className='md:px-36 px-8 pt-24 pb-20 text-left'>
        <h1 className='text-3xl md:text-4xl font-black text-gray-900 mb-2'>My Enrollments</h1>
        <p className='text-gray-500 mb-12 font-medium'>Track your learning progress and continue where you left off.</p>

        {enrolledCourses.length > 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <table className='w-full text-left'>
              <thead className='bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-black tracking-widest'>
                <tr>
                  <th className='px-6 py-5 font-black'>Course</th>
                  <th className='px-6 py-5 font-black hidden sm:table-cell'>Duration</th>
                  <th className='px-6 py-5 font-black hidden sm:table-cell'>Completed</th>
                  <th className='px-6 py-5 font-black'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {enrolledCourses.map((course, index) => {
                  const totalLectures = getTotalLectures(course);
                  const completedLectures = course.progress ? course.progress.length : 0;
                  const progressPercentage = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;

                  return (
                    <tr key={index} className='hover:bg-gray-50/50 transition duration-200 group'>
                      <td className='px-6 py-6'>
                        <div className='flex items-center gap-4'>
                          <img
                            src={course.courseThumbnail}
                            className='w-20 md:w-28 aspect-video rounded-xl object-cover shadow-sm group-hover:shadow-md transition'
                            alt=""
                          />
                          <div className='flex-1'>
                            <p className='font-bold text-gray-900 text-lg line-clamp-1 leading-tight mb-1'>{course.courseTitle}</p>
                            <div className='sm:hidden block mt-2'>
                              <Line
                                percent={progressPercentage}
                                strokeWidth={4}
                                strokeColor="#4F46E5"
                                trailColor="#F3F4F6"
                                trailWidth={4}
                                className="rounded-full"
                              />
                              <p className='text-[10px] items-center gap-1 mt-1 text-gray-400 font-bold uppercase tracking-tighter'>
                                {completedLectures}/{totalLectures} Lectures Completed
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-6 hidden sm:table-cell'>
                        <p className='text-gray-600 font-medium'>
                          {humanizeDuration(course.courseContent.reduce((acc, ch) => acc + ch.chapterContent.reduce((sum, l) => sum + l.lectureDuration, 0), 0) * 60 * 1000, { units: ['h', 'm'], round: true })}
                        </p>
                      </td>
                      <td className='px-6 py-6 hidden sm:table-cell'>
                        <p className='text-gray-600 font-medium'>{completedLectures} / {totalLectures}</p>
                      </td>
                      <td className='px-6 py-6'>
                        <div className='flex flex-col items-center sm:items-start gap-4'>
                          <div className='w-full hidden sm:block'>
                            <Line
                              percent={progressPercentage}
                              strokeWidth={2.5}
                              strokeColor="#4F46E5"
                              trailColor="#F3F4F6"
                              trailWidth={2.5}
                              className="rounded-full"
                            />
                            <p className='text-[10px] mt-1.5 text-gray-400 font-bold uppercase tracking-widest'>
                              {Math.round(progressPercentage)}% Complete
                            </p>
                          </div>
                          <button
                            onClick={() => navigate(`/player/${course._id}`)}
                            className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black rounded-xl transition shadow-lg shadow-indigo-100 active:scale-95 whitespace-nowrap'
                          >
                            {progressPercentage === 100 ? "Review Course" : progressPercentage > 0 ? "Continue" : "Start Learning"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
              <svg className="w-12 h-12 text-indigo-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You haven't enrolled in any courses yet</h3>
            <p className="text-gray-500 max-w-sm">
              Unlock your potential today! Explore our wide range of courses and start your learning journey.
            </p>
            <button
              onClick={() => navigate('/course-list')}
              className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Explore Courses
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyEnrollments