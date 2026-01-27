import React from 'react';
import Navbar from '../../components/student/Navbar';
import Hero from '../../components/student/Hero';
import Companies from '../../components/student/Companies';
import CourseSection from '../../components/student/CourseSection';
import Testimonials from '../../components/student/Testimonials';
import Footer from '../../components/student/Footer';

const Home = () => {
  return (
    <div className="flex flex-col text-default min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Companies />
      <CourseSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
