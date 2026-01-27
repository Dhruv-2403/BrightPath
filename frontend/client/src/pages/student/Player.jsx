import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/student/Navbar'
import Footer from '../../components/student/Footer'
import { assets } from '../../assets/assets'
import YouTube from 'react-youtube'
import axios from 'axios'
import toast from 'react-hot-toast'

const Player = () => {
  const { backendUrl, calculateRating } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [progressData, setProgressData] = useState([])

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${courseId}`)
      if (data.success) {
        setCourseData(data.courseData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchUserProgress = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-progress/${courseId}`, { withCredentials: true })
      if (data.success) {
        setProgressData(data.progressData ? data.progressData.completedLectures : [])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const markLectureComplete = async (lectureId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/add-progress`, { courseId, lectureId }, { withCredentials: true })
      if (data.success) {
        toast.success(data.message)
        fetchUserProgress()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))
  }

  useEffect(() => {
    fetchCourseData()
    fetchUserProgress()
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      <div className='p-4 md:px-24 flex flex-col md:flex-row gap-8 pt-24'>
        {/* Left: Video Player */}
        <div className='flex-1'>
          {playerData ? (
            <div className='bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video'>
              <YouTube
                videoId={playerData.lectureUrl.split('/').pop()}
                opts={{ height: '100%', width: '100%', playerVars: { autoplay: 1 } }}
                className='w-full h-full'
              />
              <div className='p-6 bg-white border-t border-gray-100 flex items-center justify-between'>
                <div>
                  <h1 className='text-2xl font-black text-gray-900'>{playerData.lectureTitle}</h1>
                  <p className='text-gray-500 font-medium mt-1'>Keep learning and growing!</p>
                </div>
                <button
                  onClick={() => markLectureComplete(playerData.lectureId)}
                  className={`px-8 py-3 rounded-2xl font-black transition ${progressData.includes(playerData.lectureId) ? 'bg-green-100 text-green-600' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'}`}
                >
                  {progressData.includes(playerData.lectureId) ? 'Done ✅' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          ) : (
            <div className='bg-gray-50 rounded-3xl overflow-hidden aspect-video flex flex-col items-center justify-center border border-dashed border-gray-200'>
              <img src={courseData?.courseThumbnail} className='w-1/2 rounded-2xl shadow-xl mb-8 opacity-50' alt="" />
              <h2 className='text-2xl font-bold text-gray-900'>Select a lecture to start learning</h2>
              <p className='text-gray-500 mt-2'>Your progress is automatically saved as you go.</p>
            </div>
          )}

          {courseData && (
            <div className='mt-12 text-left'>
              <h3 className='text-2xl font-black text-gray-900 mb-4'>About this Course</h3>
              <div
                className='text-gray-600 font-medium leading-relaxed prose prose-indigo'
                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              />
            </div>
          )}
        </div>

        {/* Right: Course Content */}
        <div className='md:w-96 w-full flex flex-col gap-4'>
          <h2 className='text-2xl font-black text-gray-900 mb-2'>Course Content</h2>
          <div className='space-y-3'>
            {courseData?.courseContent.map((chapter, index) => (
              <div key={index} className='bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden'>
                <div
                  className='flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100/50 transition'
                  onClick={() => toggleSection(index)}
                >
                  <div className='flex items-center gap-3'>
                    <img className={`w-4 transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="" />
                    <p className='font-bold text-gray-800'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-xs font-black text-indigo-600 bg-white px-3 py-1.5 rounded-full border border-gray-100'>{chapter.chapterContent.length} Lectures</p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                  <ul className='border-t border-gray-100 bg-white/50'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-center gap-3 p-4 pl-10 border-b border-gray-50 last:border-b-0 hover:bg-indigo-50/30 transition cursor-pointer group' onClick={() => setPlayerData({ ...lecture, chapter: index + 1, index: i + 1 })}>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition ${progressData.includes(lecture.lectureId) ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                          {progressData.includes(lecture.lectureId) ? '✓' : (i + 1)}
                        </div>
                        <div className='flex-1'>
                          <p className={`text-sm font-bold transition ${playerData?.lectureId === lecture.lectureId ? 'text-indigo-600' : 'text-gray-700'}`}>{lecture.lectureTitle}</p>
                          <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5'>{lecture.lectureDuration} Min</p>
                        </div>
                        {lecture.lectureUrl ? (
                          <img src={assets.play_icon} className='w-4 opacity-30 group-hover:opacity-100 transition' alt="" />
                        ) : (
                          <img src={assets.lock_icon} className='w-4 opacity-30' alt="" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Player
