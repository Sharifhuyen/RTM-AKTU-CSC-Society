import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/AllBlogs.json")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []);

    const handleView = (id) => {
        console.log("View blog with id:", id);
        // Logic to view the blog details
    };

    const handleEdit = (id) => {
        console.log("Edit blog with id:", id);
        // Logic to edit the blog
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
                My Blogs
            </h1>
            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white shadow-md rounded-lg p-6 gap-4"
                    >
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                            <p className="text-sm text-purple-600 font-medium">#{blog.tag}</p>
                            <p className="text-sm text-gray-600">By {blog.authorName}</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => handleView(blog.id)}
                                className="text-green-600 hover:text-green-800 transition"
                            >
                                <FaEye size={20} />
                            </button>
                            <button
                                onClick={() => handleEdit(blog.id)}
                                className="text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaEdit size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBlogs;
