import React from 'react';
import { FaFacebook, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';

const MemberCard = ({ firstName, lastName, batchNumber, departmentName, imageUrl }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center max-w-xs mx-auto">
            {/* Profile Image */}
            <div className="w-28 h-28 mx-auto mb-4 relative">
                <img
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover rounded-full border-4 border-indigo-100 shadow-md"
                />
            </div>

            {/* Member Info */}
            <h3 className="text-lg font-semibold text-gray-800">
                {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{departmentName}</p>
            <p className="text-sm text-gray-400">{batchNumber}</p>

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mt-5">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                >
                    <FaFacebook size={20} />
                </a>
                <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 transition duration-200"
                >
                    <FaLinkedin size={20} />
                </a>
                <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition duration-200"
                >
                    <FaXTwitter size={20} />
                </a>
                <a
                    href="https://www.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black transition duration-200"
                >
                    <FaGithub size={20} />
                </a>
            </div>
        </div>
    );
};

export default MemberCard;
