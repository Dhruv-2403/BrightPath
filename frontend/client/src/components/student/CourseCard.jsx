import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition">
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{course.educator?.name}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-bold text-amber-500">{calculateRating(course)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({course.courseRatings?.length})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-xl font-black text-gray-900">
            {currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
          </p>
          {course.discount > 0 && (
            <p className="text-sm text-gray-400 line-through">
              {currency}{course.coursePrice}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
