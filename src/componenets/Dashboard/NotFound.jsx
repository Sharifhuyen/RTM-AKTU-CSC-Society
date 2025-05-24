// componenets/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">Oops! Page Not Found.</p>
        <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            Go to Home
        </Link>
    </div>
);

export default NotFound;
