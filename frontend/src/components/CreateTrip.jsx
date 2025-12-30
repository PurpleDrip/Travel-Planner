import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import { Plane, Loader } from 'lucide-react';

const CreateTrip = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        preferences: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await api.post('/itineraries/generate', formData);
            navigate(`/itinerary/${res.data._id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate itinerary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                            <Plane className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Plan a New Trip</h1>
                    </div>
                    
                    {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                            <input 
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                placeholder="e.g., Paris, Tokyo, New York"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                required 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input 
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input 
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferences & Interests</label>
                            <textarea 
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleChange}
                                placeholder="e.g., Historic sites, Vegan food, Hiking, Art Museums..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition h-32 resize-none"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-4 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition shadow-lg
                                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl translate-y-0 hover:-translate-y-0.5'}`}
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Generating your dream trip...
                                </>
                            ) : (
                                'Generate Itinerary'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTrip;
