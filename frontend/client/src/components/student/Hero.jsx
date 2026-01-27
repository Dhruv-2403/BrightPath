import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-10 md:px-14 lg:px-36 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
          Empower Your Future with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Expert-Led</span> Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
          Discover a world of knowledge with thousands of courses taught by industry professionals.
          Start your journey towards mastery today with BrightPath.
        </p>

        <div className="mb-12">
          <SearchBar />
        </div>

        <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">✓</span>
            <span>Over 5,000+ Courses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">✓</span>
            <span>Lifetime Access</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">✓</span>
            <span>Expert Instruction</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute top-20 right-10 lg:right-36 w-1/3 max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl rotate-3 scale-105 opacity-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Students learning together"
            className="relative rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
