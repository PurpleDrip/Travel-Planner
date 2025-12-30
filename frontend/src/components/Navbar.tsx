import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const userStr = localStorage.getItem('user');
    const user: User | null = userStr ? JSON.parse(userStr) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Travel Planner
                            </h1>
                            <p className="text-xs text-gray-500">AI-Powered Itineraries</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="p-1.5 bg-indigo-100 rounded-lg">
                                    <UserIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition font-medium border border-red-200"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
