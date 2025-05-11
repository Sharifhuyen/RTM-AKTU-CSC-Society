import React, { useState } from 'react';

const JoinUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        departmentName: '',
        batchNumber: ''
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        try {
            // Simulate successful form submission (Replace this with your backend logic)
            // await axios.post('/api/join', formData);

            setStatus('✅ Success! Your application has been submitted.');

            // Reset form data after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                imageUrl: '',
                departmentName: '',
                batchNumber: ''
            });
        } catch (err) {
            setStatus('❌ Error! Please try again later.');
        }
    };

    return (
        <section className="bg-gradient-to-br from-indigo-100 to-white py-16 px-6 md:px-20 lg:px-32">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-6 sm:mb-8">
                    Join the RTM-AKTU CSC Society
                </h2>
                <p className="text-center text-gray-600 text-base sm:text-lg mb-10">
                    Become a part of RTM Al-Kabir Technical University's most active tech community. Fill in the details below and get involved!
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your first name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your last name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email address"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Profile Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            placeholder="Enter your profile image URL"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    {/* Department Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Department Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="departmentName"
                            value={formData.departmentName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your department name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    {/* Batch Number */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Batch Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="batchNumber"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            required
                            placeholder="Enter your batch number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="lg:col-span-2 text-center mt-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                        >
                            Submit Application
                        </button>
                        {status && (
                            <p className="mt-4 text-sm text-gray-600">{status}</p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default JoinUs;
