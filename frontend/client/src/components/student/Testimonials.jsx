import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const Testimonials = () => {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-20 bg-gray-50/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Students Love BrightPath
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
          Hear from our global community of learners and see how BrightPath has helped them achieve their goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-indigo-100"
            />
            <h4 className="text-lg font-bold text-gray-900 mb-1">{testimonial.name}</h4>
            <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>

            <p className="text-gray-600 italic leading-relaxed">
              "{testimonial.feedback}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
