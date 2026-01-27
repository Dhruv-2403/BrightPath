import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const currency = import.meta.env.VITE_CURRENCY || '$';

    // Function to calculate average rating
    const calculateRating = (course) => {
        if (!course.courseRatings || course.courseRatings.length === 0) return 0;
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
        return Math.floor(totalRating / course.courseRatings.length);
    };

    // Function to fetch all courses
    const fetchAllCourses = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/course/all`);
            if (data.success) {
                setAllCourses(data.courses);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const value = {
        backendUrl,
        allCourses,
        setAllCourses,
        loading,
        setLoading,
        currency,
        calculateRating,
        fetchAllCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
