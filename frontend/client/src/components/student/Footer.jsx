import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 px-4 sm:px-10 md:px-14 lg:px-36">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-16">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            BrightPath
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Empowering lifelong learners through expert-led courses and a supportive community. Your path to mastery starts here.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Explore</h3>
          <ul className="space-y-4 text-gray-400">
            <li><a href="/course-list" className="hover:text-indigo-400 transition">All Courses</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Categories</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Educators</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Support</h3>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-indigo-400 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6">Subscribe to our newsletter</h3>
          <p className="text-gray-400 mb-6">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 flex-1 outline-none focus:border-indigo-500 transition"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <p>© 2026 BrightPath. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition text-lg">𝕏</a>
          <a href="#" className="hover:text-white transition text-lg">ig</a>
          <a href="#" className="hover:text-white transition text-lg">fb</a>
          <a href="#" className="hover:text-white transition text-lg">in</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
