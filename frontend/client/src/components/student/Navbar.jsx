import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
    const { navigate } = useContext(AppContext);
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const browserNavigate = useNavigate();

    const isEducatorRoute = location.pathname.includes('/educator');

    return (
        <nav className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <h1
                    className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
                    onClick={() => browserNavigate('/')}
                >
                    BrightPath
                </h1>
                <div className="hidden md:flex items-center gap-6 ml-8">
                    <Link to="/course-list" className="text-gray-600 hover:text-indigo-600 font-medium transition">All Courses</Link>
                </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-10">
                <div className="hidden md:flex items-center gap-5">
                    {user && (
                        <>
                            <button
                                onClick={() => browserNavigate('/educator')}
                                className="text-gray-600 hover:text-indigo-600 font-medium transition"
                            >
                                {user.publicMetadata?.role === 'educator' ? 'Educator Dashboard' : 'Become Educator'}
                            </button>
                            <Link to="/my-enrollments" className="text-gray-600 hover:text-indigo-600 font-medium transition">My Enrollments</Link>
                        </>
                    )}
                </div>

                {user ? (
                    <div className="flex items-center gap-3">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <button
                        onClick={() => openSignIn()}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Create Account
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;