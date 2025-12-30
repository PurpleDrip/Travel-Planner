import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import { Calendar, MapPin, Plus, Sparkles, Loader2 } from 'lucide-react';
import { Itinerary } from '../types';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const res = await api.get<Itinerary[]>('/itineraries/list');
                setItineraries(res.data);
            } catch (err) {
                console.error("Failed to fetch itineraries", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItineraries();
    }, []);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Your Trips
                        </h1>
                        <p className="text-gray-600">Manage and explore your travel itineraries</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            to="/create"
                            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            Plan New Trip
                        </Link>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-gray-500 text-lg">Loading your trips...</p>
                    </div>
                ) : itineraries.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl mb-6">
                            <Sparkles className="w-12 h-12 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No trips yet?</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start planning your dream vacation with AI-powered itineraries
                        </p>
                        <Link
                            to="/create"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-semibold text-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Plan Your First Adventure
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {itineraries.map((trip, index) => (
                            <motion.div
                                key={trip._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/itinerary/${trip._id}`} className="block group">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 border border-gray-100 group-hover:border-indigo-200 transform group-hover:-translate-y-1">
                                        {/* Gradient header */}
                                        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-5" />

                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition line-clamp-1 flex-1">
                                                {trip.destination}
                                            </h3>
                                            <span className="text-xs font-bold px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full whitespace-nowrap ml-2">
                                                {formatDate(trip.startDate)}
                                            </span>
                                        </div>

                                        <div className="space-y-3 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2.5">
                                                <div className="p-1.5 bg-blue-50 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="font-medium">
                                                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                                </span>
                                            </div>

                                            {trip.preferences && (
                                                <div className="flex items-start gap-2.5">
                                                    <div className="p-1.5 bg-purple-50 rounded-lg mt-0.5">
                                                        <MapPin className="w-4 h-4 text-purple-600" />
                                                    </div>
                                                    <span className="line-clamp-2 flex-1">{trip.preferences}</span>
                                                </div>
                                            )}

                                            {trip.generatedPlan && (
                                                <div className="pt-3 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
                                                        <Sparkles className="w-3.5 h-3.5" />
                                                        {trip.generatedPlan.days.length} days planned
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
