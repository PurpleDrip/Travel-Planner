import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import { Plane, Loader2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { CreateItineraryRequest, Itinerary } from '../types';
import { motion } from 'framer-motion';

const CreateTrip: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateItineraryRequest>({
        destination: '',
        startDate: '',
        endDate: '',
        preferences: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post<Itinerary>('/itineraries/generate', formData);
            navigate(`/itinerary/${res.data._id}`);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to generate itinerary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl mb-6"
                        >
                            <Plane className="w-10 h-10 text-white" />
                        </motion.div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            Plan Your Dream Trip
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Let AI create a personalized itinerary just for you
                        </p>
                    </div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
                    >
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-7">
                            {/* Destination */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                    <MapPin className="w-4 h-4 text-indigo-600" />
                                    Destination
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder="e.g., Paris, Tokyo, New York, Bali..."
                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 placeholder-gray-400 font-medium"
                                    required
                                />
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                        <Calendar className="w-4 h-4 text-indigo-600" />
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        min={today}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                        <Calendar className="w-4 h-4 text-indigo-600" />
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        min={formData.startDate || today}
                                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Preferences */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                    <Sparkles className="w-4 h-4 text-indigo-600" />
                                    Preferences & Interests
                                    <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                                </label>
                                <textarea
                                    name="preferences"
                                    value={formData.preferences}
                                    onChange={handleChange}
                                    placeholder="Tell us what you love! E.g., Historic sites, Vegan food, Hiking, Art Museums, Photography, Local cuisine, Adventure sports..."
                                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition h-36 resize-none text-gray-900 placeholder-gray-400"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    💡 The more details you provide, the better your personalized itinerary will be!
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl text-lg ${loading
                                        ? 'bg-indigo-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl transform hover:-translate-y-0.5'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Crafting your perfect itinerary...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-6 h-6" />
                                        Generate AI Itinerary
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Info Box */}
                        <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                            <p className="text-sm text-gray-700">
                                <span className="font-bold text-indigo-600">✨ Powered by AI:</span> Our advanced AI will analyze your preferences and create a detailed day-by-day itinerary with activities, locations, and timing suggestions.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateTrip;
