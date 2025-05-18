import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showForgot, setShowForgot] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMsg('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters long.');
            return;
        }

        setErrorMsg('');
        alert('Login successful (simulate)');
    };

    const handleForgotPassword = () => {
        setShowForgot(true);
    };

    const handleSendResetLink = () => {
        if (!email) {
            setErrorMsg('Please enter your email to reset password.');
            return;
        }

        setErrorMsg('');
        alert(`Reset link sent to ${email} (simulate)`);
        setShowForgot(false);
    };

    const handleJoinUs = () => {
        navigate('/joinus');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200 px-4">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
                <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">Welcome Back</h2>

                {errorMsg && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm" role="alert">
                        <strong className="font-bold">Error:</strong> <span className="block sm:inline">{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <div className="text-sm text-center">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-blue-600 hover:underline mt-2"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <div className="text-sm text-center mt-6">
                        Not registered?{' '}
                        <button
                            onClick={handleJoinUs}
                            className="text-green-600 hover:underline font-medium"
                        >
                            Join Us
                        </button>
                    </div>
                </form>

                {showForgot && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold text-lg mb-2 text-gray-700">Reset Password</h3>
                        <p className="text-sm text-gray-600 mb-3">Enter your email to receive a reset link.</p>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                        <button
                            type="button"
                            onClick={handleSendResetLink}
                            className="w-full bg-gray-700 text-white py-3 rounded-xl text-base font-medium hover:bg-gray-800 transition"
                        >
                            Send Reset Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
