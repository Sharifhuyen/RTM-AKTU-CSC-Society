import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [toast, setToast] = useState(null); // for showing alerts
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/blogs")
            .then((res) => res.json())
            .then((data) => {
                const updated = data.map(blog => ({
                    ...blog,
                    status: blog.status || "Pending"
                }));
                setBlogs(updated);
            })
            .catch((err) => {
                console.error("Error fetching blogs:", err);
                showToast("Failed to fetch blogs.", "error");
            });
    }, []);

    const showToast = (message, type = "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: id }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            setBlogs(prev =>
                prev.map(blog =>
                    blog._id === id ? { ...blog, status: "Approved" } : blog
                )
            );

            if (selectedBlog?._id === id) {
                setSelectedBlog({ ...selectedBlog, status: "Approved" });
            }

            showToast("Blog approved successfully.", "success");

        } catch (error) {
            console.error("Error approving blog:", error);
            showToast("Failed to approve the blog. Please try again.", "error");
        }
    };

    const handleDelete = (id) => {
        setBlogs(prev => prev.filter(blog => blog._id !== id));
        if (selectedBlog?._id === id) setSelectedBlog(null);
    };

    const handleUpdate = (id) => {
        navigate(`/edit-blog/${id}`);
    };

    const handleViewDetails = (blog) => {
        setSelectedBlog(blog);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 relative">

            {/* Toast Alert */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 w-fit px-4 py-3 rounded shadow-lg text-white transition-all duration-500 ${toast.type === "error" ? "bg-red-600" : "bg-green-600"
                    }`}>
                    {toast.message}
                </div>
            )}

            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
                Manage Blogs
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Blog List */}
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-l-4 border-blue-600"
                            onClick={() => handleViewDetails(blog)}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-blue-600 font-medium">#{blog.tag}</p>
                                    <p className="text-sm text-gray-600">By {blog.authorName}</p>
                                    <span
                                        className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full font-semibold ${blog.status === "Approved"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {blog.status}
                                    </span>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleApprove(blog._id);
                                        }}
                                        className="text-green-600 hover:text-green-800"
                                        title="Approve"
                                    >
                                        <FaCheckCircle size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdate(blog._id);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(blog._id);
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Blog Details */}
                <div className="bg-white p-5 rounded-lg shadow-md min-h-[200px] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">
                        Blog Details
                    </h2>

                    {selectedBlog ? (
                        <div>
                            {selectedBlog.imageURL && (
                                <img
                                    src={selectedBlog.imageURL}
                                    alt={selectedBlog.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h3 className="text-2xl font-bold mb-2">{selectedBlog.title}</h3>
                            <p className="text-gray-700 mb-1">Author: {selectedBlog.authorName}</p>
                            <p className="text-gray-500 text-sm mb-4">Category: {selectedBlog.tag}</p>
                            <div
                                className="prose prose-sm max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                            ></div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Select a blog to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;
