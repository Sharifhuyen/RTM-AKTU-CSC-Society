import React, { useState } from 'react';
import { useAuth } from '../Firebase/AuthContext';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaImage,
    FaBuilding,
    FaHashtag,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JoinUs = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        imageUrl: '',
        departmentName: '',
        batchNumber: '',
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        if (formData.password.length < 6 || formData.password.length > 16) {
            setStatus('❌ Password must be between 6 and 16 characters.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setStatus('❌ Password and Confirm Password do not match.');
            return;
        }

        setStatus('Registering...');
        const fullName = `${formData.firstName} ${formData.lastName}`;

        try {
            await register(formData.email, formData.password, fullName);

            const userInfo = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                imageUrl: formData.imageUrl,
                departmentName: formData.departmentName,
                batchNumber: formData.batchNumber,
                role: 'user',
            };

            const res = await fetch(
                'https://rtm-aktu-csc-society-server-side.onrender.com/users',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfo),
                }
            );

            if (!res.ok) throw new Error('Failed to save user info to DB');

            setStatus('✅ Registration successful!');
            setTimeout(() => navigate('/dashboard'), 1000); // Redirect after 1s
        } catch (error) {
            console.error('Registration error:', error);
            setStatus(`❌ Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
            <div className="bg-white p-8 rounded-3xl shadow-lg max-w-3xl w-full">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                    Join the CSC Society 🚀
                </h2>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaUser className="inline mr-2" />
                            First Name
                        </label>
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaUser className="inline mr-2" />
                            Last Name
                        </label>
                        <input
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaEnvelope className="inline mr-2" />
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaImage className="inline mr-2" />
                            Image URL
                        </label>
                        <input
                            name="imageUrl"
                            type="text"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaLock className="inline mr-2" />
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaLock className="inline mr-2" />
                            Confirm Password
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Department Name */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaBuilding className="inline mr-2" />
                            Department
                        </label>
                        <input
                            name="departmentName"
                            type="text"
                            value={formData.departmentName}
                            onChange={handleChange}
                            placeholder="e.g., Computer Science"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Batch Number */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            <FaHashtag className="inline mr-2" />
                            Batch Number
                        </label>
                        <input
                            name="batchNumber"
                            type="text"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            placeholder="e.g., 2023"
                            required
                            className="w-full border px-4 py-2 rounded-xl"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                        >
                            Register
                        </button>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="md:col-span-2 text-center text-sm text-gray-700 mt-2">
                            {status}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default JoinUs;
