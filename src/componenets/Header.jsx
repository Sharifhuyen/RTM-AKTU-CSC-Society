import { useState } from "react";
import { Link } from "react-router-dom";
import RTMAKTULogo from "../assets/RTMAKTULogo.png";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Events", path: "/events" },
        { name: "Members", path: "/members" },
        { name: "Gallery", path: "/gallery" },
        { name: "Blog", path: "/allBlogs" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-white shadow-md static top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo + Brand */}
                    <div className="flex items-center">
                        <img
                            className="h-8 w-8 mr-2"
                            src={RTMAKTULogo}
                            alt="Logo"
                        />
                        <span className="text-xl font-bold text-gray-800">RTM-AKTU CSE Society</span>
                    </div>

                    {/* Middle: Navigation Items - Hidden on small screens */}
                    <div className="hidden lg:flex lg:space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-gray-700 hover:text-blue-600 transition duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Login & Join Us */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="flex items-center text-gray-700 hover:text-blue-600 transition duration-200"
                        >
                            <FaSignInAlt className="mr-1" />
                            Login
                        </Link>
                        <Link
                            to="/joinus"
                            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200"
                        >
                            <FaUserPlus className="mr-1" />
                            Join Us
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white px-4 pb-4 pt-2 shadow-lg">
                    <div className="flex flex-col space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-gray-700 hover:text-blue-600 transition duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="flex items-center text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaSignInAlt className="mr-1" />
                            Login
                        </Link>
                        <Link
                            to="/joinus"
                            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaUserPlus className="mr-1" />
                            Join Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
