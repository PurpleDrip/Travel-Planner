import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import MapComponent from './MapComponent';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, Calendar, MapPin, Loader2, ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { Itinerary, Day } from '../types';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';
import 'leaflet/dist/leaflet.css';

// Extend jsPDF type for autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
        lastAutoTable: { finalY: number };
    }
}

const ItineraryView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItinerary = async () => {
            console.log('Fetching itinerary with ID:', id);
            try {
                const res = await api.get<Itinerary>(`/itineraries/${id}`);
                console.log('Itinerary data received:', res.data);
                setItinerary(res.data);
            } catch (err) {
                console.error("Failed to fetch itinerary", err);
                if (err instanceof AxiosError) {
                    console.error("Error details:", err.response?.data);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchItinerary();
    }, [id]);

    const handleDownloadPDF = () => {
        console.log('PDF Export button clicked');

        if (!itinerary) {
            console.error('No itinerary data available');
            alert('No itinerary data available to export');
            return;
        }

        if (!itinerary.generatedPlan) {
            console.error('No generated plan available');
            alert('No generated plan available to export');
            return;
        }

        try {
            console.log('Starting PDF generation...', itinerary);
            const doc = new jsPDF();

            // Title
            doc.setFontSize(22);
            doc.setTextColor(79, 70, 229); // Indigo
            const title = itinerary.generatedPlan.title || `Trip to ${itinerary.destination}`;
            doc.text(title, 14, 20);
            console.log('Added title:', title);

            // Metadata
            doc.setFontSize(11);
            doc.setTextColor(100, 100, 100);
            doc.text(`Destination: ${itinerary.destination}`, 14, 32);
            doc.text(`Dates: ${formatDate(itinerary.startDate)} - ${formatDate(itinerary.endDate)}`, 14, 38);

            if (itinerary.preferences) {
                doc.text(`Preferences: ${itinerary.preferences}`, 14, 44);
            }

            let yPos = itinerary.preferences ? 55 : 48;

            // Process each day
            console.log('Processing days:', itinerary.generatedPlan.days.length);
            itinerary.generatedPlan.days.forEach((day, index) => {
                console.log(`Processing day ${index + 1}:`, day);

                if (yPos > 260) {
                    doc.addPage();
                    yPos = 20;
                }

                // Day header
                doc.setFontSize(14);
                doc.setTextColor(59, 130, 246); // Blue
                doc.text(`Day ${day.day}: ${day.date || ''}`, 14, yPos);
                yPos += 8;

                // Activities table
                const tableData = day.activities.map(act => [
                    act.time || 'N/A',
                    act.activity || 'N/A',
                    act.description || 'N/A',
                    act.location?.name || 'N/A'
                ]);

                console.log(`Day ${day.day} table data:`, tableData);

                autoTable(doc, {
                    startY: yPos,
                    head: [['Time', 'Activity', 'Description', 'Location']],
                    body: tableData,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [99, 102, 241], // Indigo
                        textColor: 255,
                        fontStyle: 'bold'
                    },
                    margin: { left: 14, right: 14 },
                    styles: {
                        fontSize: 9,
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: { cellWidth: 25 },
                        1: { cellWidth: 40 },
                        2: { cellWidth: 70 },
                        3: { cellWidth: 45 }
                    }
                });

                yPos = (doc as any).lastAutoTable.finalY + 12;
            });

            // Footer
            const pageCount = doc.getNumberOfPages();
            console.log('Adding footer to', pageCount, 'pages');
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Generated by Travel Planner AI - Page ${i} of ${pageCount}`,
                    doc.internal.pageSize.getWidth() / 2,
                    doc.internal.pageSize.getHeight() - 10,
                    { align: 'center' }
                );
            }

            const filename = `${itinerary.destination.replace(/[^a-z0-9]/gi, '_')}_Itinerary.pdf`;
            console.log('Saving PDF as:', filename);
            doc.save(filename);
            console.log('PDF saved successfully!');

            // Show success message
            alert('PDF downloaded successfully!');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center py-32">
                    <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                    <p className="text-gray-600 text-lg">Loading your itinerary...</p>
                </div>
            </div>
        );
    }

    if (!itinerary || !itinerary.generatedPlan) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <Navbar />
                <div className="text-center py-32">
                    <p className="text-gray-500 text-xl">Itinerary not found.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const { days } = itinerary.generatedPlan;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

                {/* Left Panel: Itinerary Details */}
                <div className="lg:w-1/2 flex flex-col overflow-y-auto pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6 border border-gray-100"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition mb-6 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </button>

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                    {itinerary.generatedPlan.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                    <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg">
                                        <MapPin className="w-4 h-4 text-indigo-600" />
                                        <span className="font-medium">{itinerary.destination}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm">{formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}</span>
                                    </div>
                                </div>
                                {itinerary.preferences && (
                                    <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="w-4 h-4 text-purple-600" />
                                            <span className="text-sm font-semibold text-purple-900">Your Preferences</span>
                                        </div>
                                        <p className="text-sm text-purple-700">{itinerary.preferences}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleDownloadPDF}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-bold"
                        >
                            <Download className="w-5 h-5" />
                            Export as PDF
                        </button>
                    </motion.div>

                    {/* Days */}
                    <div className="space-y-6">
                        {days.map((day: Day, dayIndex: number) => (
                            <motion.div
                                key={day.day}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: dayIndex * 0.1 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                                    <h3 className="font-bold text-white text-lg">
                                        Day {day.day}
                                        <span className="text-indigo-100 font-normal text-sm ml-3">{day.date}</span>
                                    </h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    {day.activities.map((act, idx) => (
                                        <div key={idx} className="flex gap-4 relative group">
                                            {/* Timeline line */}
                                            {idx !== day.activities.length - 1 && (
                                                <div className="absolute left-[3.25rem] top-10 bottom-[-1.5rem] w-0.5 bg-gradient-to-b from-indigo-200 to-purple-200" />
                                            )}

                                            <div className="min-w-[5rem] text-sm font-bold text-indigo-600 flex flex-col items-center">
                                                <div className="p-2 bg-indigo-50 rounded-lg border-2 border-indigo-200 group-hover:border-indigo-400 transition">
                                                    <Clock className="w-4 h-4" />
                                                </div>
                                                <span className="mt-2">{act.time}</span>
                                            </div>

                                            <div className="flex-1 pb-2">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-bold text-gray-900 text-lg">{act.activity}</h4>
                                                    {act.location?.name && (
                                                        <span className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold whitespace-nowrap ml-2">
                                                            {act.location.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{act.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Map */}
                <div className="lg:w-1/2 h-[500px] lg:h-auto lg:sticky lg:top-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="h-full">
                        <MapComponent activities={days} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryView;
