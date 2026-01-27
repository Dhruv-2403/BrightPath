import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate('/course-list/' + input);
    }
  };

  return (
    <form onSubmit={onSearchHandler} className="max-w-xl w-full flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
      <div className="pl-4 pr-3 py-4 text-gray-400 group-focus-within:text-indigo-600 transition">
        <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="What do you want to learn?"
        className="flex-1 py-4 text-gray-700 outline-none text-base md:text-lg placeholder:text-gray-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="mr-2 ml-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-indigo-700 hover:to-purple-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
