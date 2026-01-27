import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0)

  const handleRate = (value) => {
    if (onRate) {
      setRating(value)
      onRate(value)
    }
  }

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating)
    }
  }, [initialRating])

  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: 5 }).map((_, index) => (
        <img
          key={index}
          src={index < Math.floor(rating) ? assets.star : assets.star_blank}
          alt=''
          className='w-3.5 h-3.5 cursor-pointer'
          onClick={() => handleRate(index + 1)}
        />
      ))}
    </div>
  )
}

export default Rating
