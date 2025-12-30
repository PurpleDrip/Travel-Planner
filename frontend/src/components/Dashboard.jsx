import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from './Navbar';
import { Calendar, MapPin } from 'lucide-react';

const Dashboard = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const res = await api.get('/itineraries/list');
                setItineraries(res.data);
            } catch (err) {
                console.error("Failed to fetch itineraries", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItineraries();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Trips</h1>
                
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading trips...</div>
                ) : itineraries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <h3 className="text-xl font-medium text-gray-700 mb-4">No trips yet?</h3>
                        <Link to="/create" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                            Plan Your First Adventure
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {itineraries.map((trip) => (
                            <Link key={trip._id} to={`/itinerary/${trip._id}`} className="block group">
                                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition truncate">{trip.destination}</h3>
                                        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                            {new Date(trip.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span className="truncate">{trip.preferences || 'No preferences'}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
