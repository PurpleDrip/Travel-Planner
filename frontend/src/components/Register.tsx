import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { RegisterCredentials } from '../types';
import { UserPlus, Mail, Lock, User, Plane, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterCredentials>({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/register', formData);
            // Auto-login after registration
            const loginRes = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('token', loginRes.data.token);
            localStorage.setItem('user', JSON.stringify(loginRes.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 7, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 9, repeat: Infinity }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4"
                    >
                        <Plane className="w-10 h-10 text-pink-600" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-white mb-2">Join Us</h1>
                    <p className="text-pink-100">Create an account to start planning</p>
                </div>

                {/* Register Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <UserPlus className="w-5 h-5 text-pink-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="johndoe"
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition text-gray-900 placeholder-gray-400"
                                    required
                                    minLength={3}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition text-gray-900 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition text-gray-900 placeholder-gray-400"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-gray-500">Must be at least 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${loading
                                    ? 'bg-pink-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-pink-600 hover:text-pink-700 transition"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Register;
