import React, { useState } from 'react';
import { useAuth } from '../Firebase/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaImage, FaBuilding, FaHashtag } from 'react-icons/fa';

const JoinUs = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        imageUrl: '',
        departmentName: '',
        batchNumber: ''
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Registering...');

        const fullName = `${formData.firstName} ${formData.lastName}`;

        try {
            await register(formData.email, formData.password, fullName);

            const userInfo = {
                ...formData,
                role: 'user'
            };

            await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            });

            setStatus('✅ Registration successful!');
        } catch (error) {
            console.error('Registration error:', error);
            setStatus(`❌ Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Join Us</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaUser className="inline mr-2" />First Name</label>
                    <input
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaUser className="inline mr-2" />Last Name</label>
                    <input
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaEnvelope className="inline mr-2" />Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaLock className="inline mr-2" />Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter a secure password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaImage className="inline mr-2" />Image URL</label>
                    <input
                        name="imageUrl"
                        placeholder="Link to your profile image"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Department Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaBuilding className="inline mr-2" />Department Name</label>
                    <input
                        name="departmentName"
                        placeholder="e.g., Computer Science"
                        value={formData.departmentName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Batch Number */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700"><FaHashtag className="inline mr-2" />Batch Number</label>
                    <input
                        name="batchNumber"
                        placeholder="e.g., 2023"
                        value={formData.batchNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Submit Button (Full Width) */}
                <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Register
                    </button>
                </div>
            </form>

            {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
        </div>
    );
};

export default JoinUs;
