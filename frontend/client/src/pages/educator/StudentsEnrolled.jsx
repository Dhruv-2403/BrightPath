import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const StudentsEnrolled = () => {
  const { getToken } = useAuth();
  const { backendUrl } = useContext(AppContext);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  useEffect(() => {
    // Filter students based on search term
    if (searchTerm) {
      const filtered = students.filter(enrollment =>
        enrollment.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);

  const fetchEnrolledStudents = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`${backendUrl}/api/educator/enrolled-students`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setStudents(data.enrolledStudents);
        setFilteredStudents(data.enrolledStudents);
      } else {
        toast.error(data.message || 'Failed to fetch enrolled students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load enrolled students');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Enrolled Students
        </h1>
        <p className="text-gray-600">
          {students.length} {students.length === 1 ? 'student' : 'students'} enrolled across all courses
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by student name or course title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{filteredStudents.length}</span>
            <span>results</span>
          </div>
        </div>
      </div>

      {/* Students Table */}
      {filteredStudents.length > 0 ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold">#</th>
                  <th className="text-left py-4 px-6 font-semibold">Student</th>
                  <th className="text-left py-4 px-6 font-semibold">Course</th>
                  <th className="text-left py-4 px-6 font-semibold">Enrolled Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((enrollment, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-indigo-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {enrollment.student?.imageUrl ? (
                          <img
                            src={enrollment.student.imageUrl}
                            alt={enrollment.student.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg border-2 border-indigo-200">
                            {enrollment.student?.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">
                            {enrollment.student?.name || 'Unknown Student'}
                          </p>
                          {enrollment.student?.emailAddresses?.[0]?.emailAddress && (
                            <p className="text-sm text-gray-500">
                              {enrollment.student.emailAddresses[0].emailAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-800 font-medium">
                          {enrollment.courseTitle}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">
                          Active
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {enrollment.purchaseDate ? formatDate(enrollment.purchaseDate) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-8xl mb-6">👥</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {searchTerm ? 'No Results Found' : 'No Students Enrolled Yet'}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {searchTerm
              ? 'Try adjusting your search terms or filters'
              : 'Students will appear here when they enroll in your courses'
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Summary Card */}
      {students.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Enrollments</h3>
              <p className="text-indigo-100 text-sm">Across all your courses</p>
            </div>
            <div className="text-4xl font-bold">
              {students.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsEnrolled;
