import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/AllBlogs.json")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []);

    const handleApprove = (id) => {
        console.log("Approve blog with id:", id);
        // Logic to approve
    };

    const handleDelete = (id) => {
        console.log("Delete blog with id:", id);
        // Logic to delete
    };

    const handleUpdate = (id) => {
        console.log("Update blog with id:", id);
        // Logic to update
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
                Manage Blogs
            </h1>
            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white shadow-md rounded-lg p-6 gap-4"
                    >
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                            <p className="text-sm text-blue-600 font-medium">#{blog.tag}</p>
                            <p className="text-sm text-gray-600">By {blog.authorName}</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => handleApprove(blog.id)}
                                className="text-green-600 hover:text-green-800 transition"
                            >
                                <FaCheckCircle size={20} />
                            </button>
                            <button
                                onClick={() => handleUpdate(blog.id)}
                                className="text-blue-600 hover:text-blue-800 transition"
                            >
                                <FaEdit size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(blog.id)}
                                className="text-red-600 hover:text-red-800 transition"
                            >
                                <FaTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBlogs;