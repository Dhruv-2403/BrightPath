import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/student/Navbar'
import SearchBar from '../../components/student/SearchBar'
import { useParams, useNavigate } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CourseList = () => {
  const { allCourses } = useContext(AppContext)
  const navigate = useNavigate()
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  const categories = ['DSA', 'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'Cloud Computing', 'Other']
  const levels = ['Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      let tempCourses = allCourses.slice()

      // Filter by search input
      if (input) {
        tempCourses = tempCourses.filter(
          item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      }

      // Filter by category
      if (selectedCategory) {
        tempCourses = tempCourses.filter(item => item.category === selectedCategory)
      }

      // Filter by level
      if (selectedLevel) {
        tempCourses = tempCourses.filter(item => item.level === selectedLevel)
      }

      setFilteredCourse(tempCourses)
    }
  }, [allCourses, input, selectedCategory, selectedLevel])

  return (
    <div className="bg-white min-h-screen font-outfit">
      <Navbar />

      {/* Content Container */}
      <div className='md:px-36 px-8 pt-24 pb-20 text-left'>

        {/* Header Section */}
        <div className='flex md:flex-row flex-col gap-8 md:items-center justify-between w-full border-b border-gray-100 pb-10 mb-12'>
          <div className="space-y-2">
            <h1 className='text-4xl md:text-5xl font-black text-gray-900 tracking-tight'>
              Course List
            </h1>
            <nav className='flex items-center gap-2 text-sm font-medium'>
              <span
                className='text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer'
                onClick={() => navigate('/')}
              >
                Home
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-500">Course List</span>
            </nav>
          </div>

          <div className="w-full md:w-auto">
            <SearchBar data={input} />
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Level:</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {(selectedCategory || selectedLevel) && (
              <button
                onClick={() => {
                  setSelectedCategory('')
                  setSelectedLevel('')
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filters / Search Terms */}
        {input && (
          <div className='flex items-center gap-3 mb-12 animate-in fade-in slide-in-from-left-4 duration-500'>
            <span className="text-gray-500 font-medium">Results for:</span>
            <div className='inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-bold shadow-sm'>
              <p>{input}</p>
              <button
                onClick={() => navigate('/course-list')}
                className='hover:bg-indigo-200 p-1 rounded-full transition-colors'
                aria-label="Clear filter"
              >
                <img src={assets.cross_icon} alt="" className='w-2.5' />
              </button>
            </div>
          </div>
        )}

        {/* Course Grid */}
        {filteredCourse.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
              <img src={assets.search_icon} alt="No results" className="w-12 h-12 opacity-20" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 max-w-sm">
              We couldn't find any courses matching your search. Try different keywords or browse all categories.
            </p>
            <button
              onClick={() => navigate('/course-list')}
              className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Browse All Courses
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default CourseList