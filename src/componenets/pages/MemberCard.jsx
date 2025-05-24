import React from 'react';
import { FaFacebook, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';

const MemberCard = ({ firstName, lastName, batchNumber, departmentName, imageUrl }) => {
    return (
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 p-8 text-center w-80 mx-auto">
            {/* Profile Image */}
            <div className="w-32 h-32 mx-auto mb-5 relative">
                <img
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover rounded-full border-4 border-indigo-200 shadow-inner transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Member Info */}
            <h3 className="text-2xl font-bold text-gray-800 tracking-wide">
                {firstName} {lastName}
            </h3>
            <p className="text-base text-indigo-600 mt-1 font-medium">{departmentName}</p>
            <p className="text-sm text-gray-500 font-light">{batchNumber}</p>

            {/* Divider */}
            <div className="my-5 border-t border-dashed border-gray-300"></div>

            {/* Social Icons */}
            <div className="flex justify-center gap-5 mt-3">
                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:scale-110 hover:text-blue-800 transition-all duration-200"
                >
                    <FaFacebook size={22} />
                </a>
                <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:scale-110 hover:text-blue-900 transition-all duration-200"
                >
                    <FaLinkedin size={22} />
                </a>
                <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:scale-110 hover:text-black transition-all duration-200"
                >
                    <FaXTwitter size={22} />
                </a>
                <a
                    href="https://www.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:scale-110 hover:text-black transition-all duration-200"
                >
                    <FaGithub size={22} />
                </a>
            </div>
        </div>
    );
};

export default MemberCard;
