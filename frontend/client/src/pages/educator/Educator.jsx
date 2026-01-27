import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { UserButton, useUser } from '@clerk/clerk-react';

const Educator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/educator/educator', icon: '📊' },
    { name: 'Add Course', path: '/educator/add-courses', icon: '➕' },
    { name: 'My Courses', path: '/educator/my-courses', icon: '📚' },
    { name: 'Students Enrolled', path: '/educator/students-enrolled', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-600 to-purple-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-indigo-700">
            <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>
              BrightPath
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-white text-indigo-700 shadow-lg'
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Back to Main Site */}
          <div className="p-4 border-t border-white/20">
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>🏠</span>
              <span>Back to Main Site</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">
              Educator Portal
            </h2>

            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">{user?.fullName || 'Educator'}</p>
                <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Educator;
