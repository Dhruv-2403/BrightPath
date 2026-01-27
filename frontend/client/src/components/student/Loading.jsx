import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Loading = () => {
  const { path } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [path, navigate])

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin'></div>
        <p className='text-gray-500 font-medium animate-pulse'>Loading BrightPath...</p>
      </div>
    </div>
  )
}

export default Loading
