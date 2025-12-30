import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Map, PlusCircle } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <Map className="w-8 h-8" />
                TravelPlanner
            </Link>
            <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
                <Link to="/create" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
                    <PlusCircle className="w-5 h-5" />
                    New Trip
                </Link>
                <button 
                    onClick={handleLogout} 
                    className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
