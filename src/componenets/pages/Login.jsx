import React, { useState } from 'react';
import { useAuth } from '../Firebase/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState(null);
    const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Logging in...');

        try {
            await login(formData.email, formData.password);
            setStatus(null);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            if (error.message.includes('Email not verified')) {
                setShowUnverifiedModal(true);
                setStatus(null);
            } else {
                setStatus(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-100 via-white to-green-200 px-4">
            <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200"
                    >
                        Login
                    </button>
                </form>

                {status && (
                    <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
                )}

                <div className="mt-8 border-t pt-4 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link
                            to="/joinUs"
                            className="text-green-600 font-medium hover:underline transition"
                        >
                            Join Us
                        </Link>
                    </p>
                </div>
            </div>

            {/* Unverified Email Modal */}
            {showUnverifiedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Email Not Verified</h2>
                        <p className="text-gray-700 mb-6">
                            Your email is not verified. Please check your inbox and click on the verification link before logging in.
                        </p>
                        <button
                            onClick={() => setShowUnverifiedModal(false)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-xl font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
