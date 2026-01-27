import React, { useState, useContext } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const AddCourse = () => {
  const { getToken } = useAuth();
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseTitle: '',
    courseDescription: '',
    coursePrice: '',
    discount: 0,
    category: '',
    level: 'Beginner',
    isPublished: false,
    courseThumbnail: null
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, courseThumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new chapter
  const addChapter = () => {
    setChapters([...chapters, {
      chapterTitle: '',
      chapterContent: []
    }]);
  };

  // Update chapter title
  const updateChapterTitle = (index, title) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].chapterTitle = title;
    setChapters(updatedChapters);
  };

  // Add lecture to chapter
  const addLecture = (chapterIndex) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].chapterContent.push({
      lectureTitle: '',
      lectureUrl: '',
      isPreviewFree: false
    });
    setChapters(updatedChapters);
  };

  // Update lecture
  const updateLecture = (chapterIndex, lectureIndex, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].chapterContent[lectureIndex][field] =
      field === 'isPreviewFree' ? value : value;
    setChapters(updatedChapters);
  };

  // Remove chapter
  const removeChapter = (index) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  // Remove lecture
  const removeLecture = (chapterIndex, lectureIndex) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].chapterContent =
      updatedChapters[chapterIndex].chapterContent.filter((_, i) => i !== lectureIndex);
    setChapters(updatedChapters);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.courseTitle || !formData.courseDescription || !formData.coursePrice) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.courseThumbnail) {
      toast.error('Please upload a course thumbnail');
      return;
    }

    if (chapters.length === 0) {
      toast.error('Please add at least one chapter');
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      // Prepare course data
      const courseData = {
        courseTitle: formData.courseTitle,
        courseDescription: formData.courseDescription,
        coursePrice: parseFloat(formData.coursePrice),
        discount: parseInt(formData.discount) || 0,
        category: formData.category,
        level: formData.level,
        isPublished: formData.isPublished,
        courseContent: chapters
      };

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('courseData', JSON.stringify(courseData));
      formDataToSend.append('image', formData.courseThumbnail);

      const response = await fetch(`${backendUrl}/api/educator/add-course`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success || data.succes) { // Note: backend has typo "succes"
        toast.success('Course added successfully!');
        navigate('/educator/my-courses');
      } else {
        toast.error(data.message || 'Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Course
            </h1>
            <p className="text-gray-600 mt-2">Fill in the details below to create your course</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  name="courseDescription"
                  value={formData.courseDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Describe your course"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    name="coursePrice"
                    value={formData.coursePrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="99.99"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Thumbnail *
                </label>
                <div className="flex items-start gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
                  />
                </div>
                {thumbnailPreview && (
                  <div className="mt-4">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-48 h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Publish course immediately
                </label>
              </div>
            </div>

            {/* Course Content */}
            <div className="space-y-6 border-t pt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Course Content</h2>
                <button
                  type="button"
                  onClick={addChapter}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
                >
                  + Add Chapter
                </button>
              </div>

              {chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <input
                      type="text"
                      value={chapter.chapterTitle}
                      onChange={(e) => updateChapterTitle(chapterIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={`Chapter ${chapterIndex + 1} Title`}
                    />
                    <button
                      type="button"
                      onClick={() => removeChapter(chapterIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="ml-4 space-y-3">
                    <button
                      type="button"
                      onClick={() => addLecture(chapterIndex)}
                      className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm"
                    >
                      + Add Lecture
                    </button>

                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className="bg-white rounded-lg p-4 space-y-3 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-3">
                            <input
                              type="text"
                              value={lecture.lectureTitle}
                              onChange={(e) => updateLecture(chapterIndex, lectureIndex, 'lectureTitle', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                              placeholder="Lecture Title"
                            />
                            <input
                              type="url"
                              value={lecture.lectureUrl}
                              onChange={(e) => updateLecture(chapterIndex, lectureIndex, 'lectureUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                              placeholder="YouTube Video URL"
                            />
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={lecture.isPreviewFree}
                                onChange={(e) => updateLecture(chapterIndex, lectureIndex, 'isPreviewFree', e.target.checked)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              <label className="ml-2 text-sm text-gray-700">
                                Free Preview
                              </label>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLecture(chapterIndex, lectureIndex)}
                            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {chapters.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No chapters added yet. Click "Add Chapter" to get started.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 border-t pt-6">
              <button
                type="button"
                onClick={() => navigate('/educator/my-courses')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Course...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
