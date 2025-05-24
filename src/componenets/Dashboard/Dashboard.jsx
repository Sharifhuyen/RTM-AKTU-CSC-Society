import { useState, useRef } from 'react';
import {
    FaBlog, FaTools, FaCalendarPlus,
    FaCalendarAlt, FaImage, FaImages, FaRegNewspaper
} from 'react-icons/fa';

import { useAuth } from '../Firebase/AuthContext';
import CreateBlog from '../pages/CreateBlog';
import ManageBlogs from '../Dashboard/ManageBlogs';
import CreateEvent from '../pages/CreateEvent';
import ManageEvent from '../Dashboard/ManageEvent';
import CreateGalleryItem from '../pages/CreateGalleryItem';
import ManageGallery from '../Dashboard/ManageGallery';
import MyBlogs from '../Dashboard/MyBlogs';

const Dashboard = () => {
    const contentRef = useRef(null);
    const { dbUser, loading } = useAuth();

    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
        if (window.innerWidth < 1024 && contentRef.current) {
            setTimeout(() => {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    if (loading || !dbUser) {
        return <div className="text-center mt-10">Loading Dashboard...</div>;
    }

    const role = dbUser.role;

    const userItems = [
        { label: 'Create Blog', component: <CreateBlog />, icon: <FaBlog /> },
        { label: 'My Blogs', component: <MyBlogs />, icon: <FaRegNewspaper /> },
    ];

    const adminExtraItems = [
        { label: 'Manage Blogs', component: <ManageBlogs />, icon: <FaTools /> },
        { label: 'Create Event', component: <CreateEvent />, icon: <FaCalendarPlus /> },
        { label: 'Manage Events', component: <ManageEvent />, icon: <FaCalendarAlt /> },
        { label: 'Create Gallery Item', component: <CreateGalleryItem />, icon: <FaImage /> },
        { label: 'Manage Gallery', component: <ManageGallery />, icon: <FaImages /> },
    ];

    const dashboardItems = role === 'admin' ? [...userItems, ...adminExtraItems] : userItems;

    console.log("dbUser from AuthContext:", dbUser);


    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 bg-blue-800 text-white shadow-md z-10">
                <div className="p-4 font-bold text-lg text-center border-b border-blue-700">Dashboard</div>
                <ul className="p-2 space-y-1">
                    {dashboardItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(index)}
                            className={`flex items-center p-3 cursor-pointer rounded-md transition ${activeIndex === index ? 'bg-blue-700 font-semibold' : 'hover:bg-blue-700'
                                }`}
                        >
                            <span className="mr-2">{item.icon}</span> {item.label}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main ref={contentRef} className="flex-1 p-4 overflow-y-auto">
                {dashboardItems[activeIndex]?.component || <div>Select an option</div>}
            </main>
        </div>
    );
};

export default Dashboard;
