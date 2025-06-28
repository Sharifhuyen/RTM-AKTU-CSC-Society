import React, { useState } from 'react';
import { useAuth } from '../Firebase/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
    const { login, resendVerification, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState(null);
    const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
    const [resendStatus, setResendStatus] = useState(null);
    const [showResetInput, setShowResetInput] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

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

    const handleResend = async () => {
        try {
            setResendStatus("Sending verification email...");
            await resendVerification(formData.email, formData.password);
            setResendStatus("Verification email sent!");
        } catch (error) {
            setResendStatus("Failed to resend. Check credentials.");
        }
    };

    const handleResetPassword = async () => {
        try {
            if (!resetEmail) {
                setStatus("Please enter your email.");
                return;
            }
            await resetPassword(resetEmail);
            setStatus("Password reset email sent.");
        } catch (error) {
            setStatus("Failed to send reset email.");
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

                    <div className="text-right text-sm">
                        <button
                            type="button"
                            onClick={() => setShowResetInput(!showResetInput)}
                            className="text-green-600 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200"
                    >
                        Login
                    </button>
                </form>

                {showResetInput && (
                    <div className="mt-4 space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        />
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition"
                        >
                            Send Reset Link
                        </button>
                    </div>
                )}

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

            {/* Unverified Modal */}
            {showUnverifiedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Email Not Verified</h2>
                        <p className="text-gray-700 mb-4">
                            Your email is not verified. Please check your inbox and click on the verification link.
                        </p>
                        <button
                            onClick={handleResend}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold mb-2"
                        >
                            Resend Verification Email
                        </button>
                        {resendStatus && <p className="text-sm text-gray-600">{resendStatus}</p>}
                        <button
                            onClick={() => setShowUnverifiedModal(false)}
                            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-xl font-semibold"
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
