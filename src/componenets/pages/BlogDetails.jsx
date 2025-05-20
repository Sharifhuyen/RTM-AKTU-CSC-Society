import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => {
                const found = data.find(b => b._id === id);
                setBlog(found);
            });
    }, [id]);

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <img
                src={blog.imageURL}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-gray-700 mb-1">Author: {blog.authorName}</p>
            <p className="text-gray-500 text-sm mb-4">Category: {blog.tag}</p>

            <div
                className="rich-content text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
        </div>
    );
};

export default BlogDetails;
