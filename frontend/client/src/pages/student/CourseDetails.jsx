import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/student/Navbar'
import Footer from '../../components/student/Footer'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import axios from 'axios'
import toast from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripePayment from '../../components/student/StripePayment'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { backendUrl, currency, calculateRating } = useContext(AppContext)

  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [showPayment, setShowPayment] = useState(false)

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`)
      if (data.success) {
        setCourseData(data.courseData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleEnroll = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/create-payment-intent`, { courseId: id }, { withCredentials: true });
      if (data.success) {
        setClientSecret(data.clientSecret);
        setShowPayment(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  useEffect(() => {
    fetchCourseData()
  }, [id])

  if (!courseData) return <Loading />

  return (
    <div className="bg-white min-h-screen font-outfit">
      <Navbar />

      {showPayment && clientSecret && (
        <Elements stripe={stripePromise}>
          <StripePayment
            courseData={courseData}
            clientSecret={clientSecret}
            onClose={() => setShowPayment(false)}
          />
        </Elements>
      )}

      {/* Course Hero Section */}
      <div className="md:px-36 px-8 pt-24 pb-16 bg-gradient-to-b from-indigo-50/50 to-white text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-100/20 blur-3xl rounded-full -mr-20 -mt-20"></div>

        <div className="max-w-4xl relative z-10">
          <nav className='flex items-center gap-2 text-sm font-medium mb-6'>
            <span className='text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer' onClick={() => navigate('/')}>Home</span>
            <span className="text-gray-300">/</span>
            <span className='text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer' onClick={() => navigate('/course-list')}>Course List</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 truncate">{courseData.courseTitle}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {courseData.courseTitle}
          </h1>

          <div
            className="text-gray-600 text-lg mb-8 leading-relaxed max-w-3xl"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(1, 200).split('</p>')[0] }}
          ></div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold text-lg">{calculateRating(courseData)}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={i < calculateRating(courseData) ? assets.star : assets.star_blank} className="w-4 h-4" alt="" />
                ))}
              </div>
              <span className="text-gray-400">({courseData.courseRatings.length} reviews)</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <img src={assets.person_tick_icon} className="w-4" alt="" />
              <span>{courseData.enrolledStudents.length} students enrolled</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <span>Created by <span className="text-indigo-600 font-bold">{courseData.educator.name}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:px-36 px-8 py-16 flex flex-col md:flex-row gap-16 relative">

        {/* Left Column: Curriculum & Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-4 pb-4 border-b">Course Structure</h2>

          <div className="space-y-4">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-5 bg-gray-50/50 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={assets.down_arrow_icon}
                      className={`w-3 transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      alt=""
                    />
                    <span className="font-bold text-gray-800">{chapter.chapterTitle}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {chapter.chapterContent.length} lectures • {humanizeDuration(chapter.chapterContent.reduce((acc, l) => acc + l.lectureDuration, 0) * 60 * 1000, { units: ['h', 'm'] })}
                  </span>
                </button>

                {openSections[index] && (
                  <div className="bg-white border-t border-gray-50">
                    {chapter.chapterContent.map((lecture, i) => (
                      <div key={i} className="flex items-center justify-between p-5 hover:bg-gray-50 transition border-b border-gray-50 last:border-0 pl-12">
                        <div className="flex items-center gap-3">
                          <img src={assets.play_icon} className="w-4 opacity-40" alt="" />
                          <span className="text-gray-700">{lecture.lectureTitle}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {lecture.isPreviewFree && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Preview</span>}
                          <span className="text-sm text-gray-400">{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['m', 's'] })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-16 pb-4 border-b">Course Description</h2>
          <div
            className="text-gray-600 leading-relaxed rich-text space-y-4"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
          ></div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="md:w-96 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden p-2 transition-transform hover:scale-[1.01]">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
              <img src={courseData.courseThumbnail} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform scale-110">
                  <img src={assets.play_icon} className="w-5 ml-1" alt="" />
                </div>
              </div>
            </div>

            <div className="p-5 space-y-6">
              <div className="flex items-center gap-4">
                <p className="text-4xl font-black text-gray-900 tracking-tight">
                  {currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
                </p>
                {courseData.discount > 0 && (
                  <div className="flex flex-col">
                    <p className="text-gray-400 line-through text-sm font-medium">{currency}{courseData.coursePrice}</p>
                    <span className="text-indigo-600 text-xs font-black uppercase tracking-tight">{courseData.discount}% Off</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <img src={assets.time_left_clock_icon} className="w-4" alt="" />
                  <p><span className="text-red-500 font-bold">5 days</span> left at this price!</p>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <img src={assets.lesson_icon} className="w-4" alt="" />
                  <p>Full lifetime access</p>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                disabled={isAlreadyEnrolled}
                className={`w-full py-4 ${isAlreadyEnrolled ? 'bg-gray-100 text-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 active:scale-95'} font-black rounded-2xl transition-all`}
              >
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <div className="pt-4 border-t border-gray-50 flex flex-col items-center gap-4">
                <p className="text-center text-xs text-gray-400 font-medium italic">30-Day Money-Back Guarantee</p>
                <div className="flex items-center gap-4 opacity-30 grayscale scale-75">
                  <img src={assets.microsoft_logo} className="w-12" alt="" />
                  <img src={assets.adobe_logo} className="w-12" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default CourseDetails