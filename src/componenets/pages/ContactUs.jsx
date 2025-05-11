import React, { useState } from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

export default function ContactUs() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            form.reset(); // Clear the form
            setIsSubmitted(true); // Show modal
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="px-4 py-16 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
                Contact Us RTM-AKTU CSC Society
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Left Panel */}
                <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
                    <img
                        src="/contact.jpg"
                        alt="Contact RTM AKTU CSC"
                        className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
                    />

                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">📍 Address</h3>
                            <p className="text-gray-600">CSC Office, Main Campus, RTM-AKTU, TB Gate, Sylhet, Bangladesh.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">📧 Email</h3>
                            <p className="text-gray-600">csc@rtmaktu.edu.bd</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">📞 Phone</h3>
                            <p className="text-gray-600">+880 1234 567890</p>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4 text-xl text-blue-600">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="hover:text-blue-800 transition" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="hover:text-blue-400 transition" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-pink-500 transition" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="hover:text-blue-700 transition" />
                        </a>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-xl p-8 space-y-6"
                >
                    <input type="hidden" name="access_key" value="26667bc2-6e76-411b-87c5-e7eb871105b0" />

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* ✅ Modal */}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center space-y-4">
                        <h3 className="text-xl font-semibold text-green-600">✅ Message Sent!</h3>
                        <p className="text-gray-700">Thank you for contacting us. We'll get back to you shortly.</p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
