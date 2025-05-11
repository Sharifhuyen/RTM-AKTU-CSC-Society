import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

const HomeSecondSection = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-6 md:px-16">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
                    RTM-AKTU CSE Student Society
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                    Welcome to the Computer Science & Engineering Student Society — a vibrant community for undergraduate students in the Department of Computer Science & Engineering. We offer a welcoming space for collaboration and connection
                    <span className="font-medium"> </span>, organize engaging events, and advocate for your academic and social interests.
                </p>
                <p className="text-md text-gray-600">
                    Stay updated on our latest happenings by following us on our social platforms!
                </p>
                <div className="mt-6 flex justify-center gap-6 text-blue-700 text-xl">
                    <button onClick={() => openInNewTab('https://facebook.com')} className="hover:text-blue-900">
                        <FaFacebookF />
                    </button>
                    <button onClick={() => openInNewTab('https://twitter.com')} className="hover:text-blue-900">
                        <FaTwitter />
                    </button>
                    <button onClick={() => openInNewTab('https://instagram.com')} className="hover:text-blue-900">
                        <FaInstagram />
                    </button>
                    <button onClick={() => openInNewTab('https://linkedin.com')} className="hover:text-blue-900">
                        <FaLinkedinIn />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeSecondSection;
