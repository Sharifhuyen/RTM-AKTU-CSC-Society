import React from 'react';
import { FaFacebook, FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';

const MemberCard = ({ firstName, lastName, batchNumber, departmentName, imageUrl }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg">
            {/* Member image */}
            <img
                src={imageUrl}
                alt={`${firstName} ${lastName}`}
                className="w-full h-56 object-cover rounded-t-2xl"
            />

            {/* Info and icons */}
            <div className="p-5 text-center text-gray-800">
                <h3 className="text-xl font-semibold mb-1">{firstName} {lastName}</h3>
                <p className="text-sm text-gray-600">{batchNumber}</p>
                <p className="text-sm text-gray-600 mb-4">{departmentName}</p>

                {/* Social media icons */}
                <div className="flex justify-center space-x-5 mt-3">
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-125"
                    >
                        <FaFacebook size={22} />
                    </a>
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 transition-transform hover:scale-125"
                    >
                        <FaLinkedin size={22} />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700 transition-transform hover:scale-125"
                    >
                        <FaXTwitter size={22} />
                    </a>
                    <a
                        href="https://www.github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-black transition-transform hover:scale-125"
                    >
                        <FaGithub size={22} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
