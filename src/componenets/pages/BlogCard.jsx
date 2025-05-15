import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const staticDate = 'May 15, 2025';

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img src={blog.imageURL} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-1">By: {blog.authorName}</p>
                <p className="text-gray-500 text-sm mb-4">Published on: {staticDate}</p>
                <Link to={`/blog/${blog.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                        Learn More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;