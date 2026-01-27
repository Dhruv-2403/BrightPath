import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const value = {
        backendUrl,
        courses,
        setCourses,
        loading,
        setLoading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
