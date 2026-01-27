import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { getToken } = useAuth();
  const { backendUrl } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`${backendUrl}/api/educator/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">Here's an overview of your teaching journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Earnings Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="text-3xl">💰</span>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm font-medium">Total Earnings</p>
              <h3 className="text-3xl font-bold">
                ${dashboardData?.totalEarnings?.toFixed(2) || '0.00'}
              </h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-green-100 text-sm">Revenue from all courses</p>
          </div>
        </div>

        {/* Total Courses Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="text-3xl">📚</span>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-sm font-medium">Total Courses</p>
              <h3 className="text-3xl font-bold">
                {dashboardData?.totalCourses || 0}
              </h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-indigo-100 text-sm">Courses published</p>
          </div>
        </div>

        {/* Total Students Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-sm font-medium">Total Students</p>
              <h3 className="text-3xl font-bold">
                {dashboardData?.enrolledStudentsData?.length || 0}
              </h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-orange-100 text-sm">Enrolled across all courses</p>
          </div>
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Enrollments</h2>
          <span className="text-sm text-gray-500">
            {dashboardData?.enrolledStudentsData?.length || 0} total students
          </span>
        </div>

        {dashboardData?.enrolledStudentsData && dashboardData.enrolledStudentsData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Course</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.enrolledStudentsData.slice(0, 10).map((enrollment, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {enrollment.student?.imageUrl ? (
                          <img
                            src={enrollment.student.imageUrl}
                            alt={enrollment.student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {enrollment.student?.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <span className="font-medium text-gray-800">
                          {enrollment.student?.name || 'Unknown Student'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-700">{enrollment.courseTitle}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 text-lg mb-2">No students enrolled yet</p>
            <p className="text-gray-400 text-sm">Students will appear here when they enroll in your courses</p>
          </div>
        )}

        {dashboardData?.enrolledStudentsData && dashboardData.enrolledStudentsData.length > 10 && (
          <div className="mt-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              View all {dashboardData.enrolledStudentsData.length} students →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
