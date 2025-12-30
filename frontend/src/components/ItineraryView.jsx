import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import MapComponent from './MapComponent';
import { jsPDF } from 'jspdf';
import { Download, Calendar, MapPin, Clock } from 'lucide-react';
import 'jspdf-autotable'; // Ensure this modifies jsPDF prototype

const ItineraryView = () => {
    const { id } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const res = await api.get(`/itineraries/${id}`);
                setItinerary(res.data);
            } catch (err) {
                console.error("Failed to fetch itinerary", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItinerary();
    }, [id]);

    const handleDownloadPDF = () => {
        if (!itinerary) return;
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.text(itinerary.generatedPlan.title || `Trip to ${itinerary.destination}`, 14, 20);
        
        doc.setFontSize(12);
        doc.text(`Destination: ${itinerary.destination}`, 14, 30);
        doc.text(`Date: ${new Date(itinerary.startDate).toLocaleDateString()} - ${new Date(itinerary.endDate).toLocaleDateString()}`, 14, 36);

        let yPos = 45;

        itinerary.generatedPlan.days.forEach((day, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFontSize(16);
            doc.setTextColor(40, 40, 40);
            doc.text(`Day ${day.day}: ${day.date || ''}`, 14, yPos);
            yPos += 8;

            const tableData = day.activities.map(act => [act.time, act.activity, act.description]);
            
            doc.autoTable({
                startY: yPos,
                head: [['Time', 'Activity', 'Description']],
                body: tableData,
                theme: 'grid',
                headStyles: { fillColor: [59, 130, 246] }, // Blue-500
                margin: { left: 14, right: 14 }
            });

            yPos = doc.lastAutoTable.finalY + 15;
        });

        doc.save(`Itinerary_${itinerary.destination}.pdf`);
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading itinerary...</div>;
    if (!itinerary) return <div className="text-center py-20 text-gray-500">Itinerary not found.</div>;

    const { days } = itinerary.generatedPlan;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            
            <div className="flex-1 container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 overflow-hidden h-full">
                
                {/* Left Panel: Itinerary Details */}
                <div className="lg:w-1/2 flex flex-col h-full overflow-y-auto no-scrollbar pb-10">
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.generatedPlan.title}</h1>
                                <div className="flex items-center gap-4 text-gray-600 text-sm">
                                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {itinerary.destination}</div>
                                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <button 
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
                            >
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {days.map((day) => (
                            <div key={day.day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
                                    <h3 className="font-bold text-blue-800">Day {day.day} <span className="text-blue-600 font-normal text-sm ml-2">{day.date}</span></h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    {day.activities.map((act, idx) => (
                                        <div key={idx} className="flex gap-4 relative">
                                            {/* Timeline line */}
                                            {idx !== day.activities.length - 1 && (
                                                <div className="absolute left-[2.5rem] top-8 bottom-[-1.5rem] w-0.5 bg-gray-100"></div>
                                            )}
                                            
                                            <div className="min-w-[4rem] text-sm font-medium text-gray-500 flex flex-col items-center">
                                                <span>{act.time}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900">{act.activity}</h4>
                                                    {act.location?.name && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full truncate max-w-[150px]">{act.location.name}</span>}
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed">{act.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Map */}
                <div className="lg:w-1/2 h-[500px] lg:h-auto sticky top-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                     <MapComponent activities={days} />
                </div>
            </div>
        </div>
    );
};

export default ItineraryView;
