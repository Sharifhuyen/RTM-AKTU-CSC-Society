import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [tagFilter, setTagFilter] = useState('');

    useEffect(() => {
        fetch('/AllBlogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    const filteredBlogs = tagFilter
        ? blogs.filter(blog => blog.tag.toLowerCase() === tagFilter.toLowerCase())
        : blogs;

    const uniqueTags = [...new Set(blogs.map(blog => blog.tag))];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {uniqueTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setTagFilter(tag)}
                        className={`px-3 py-1 rounded-full text-white ${tagFilter === tag ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-600 transition`}
                    >
                        {tag}
                    </button>
                ))}
                <button
                    onClick={() => setTagFilter('')}
                    className="px-3 py-1 rounded-full bg-gray-400 text-white hover:bg-gray-600 transition"
                >
                    Clear Filter
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map(blog => (
                    <div key={blog.id} className="animate-fadeIn">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBlogs;