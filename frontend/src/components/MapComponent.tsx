import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Day, Activity } from '../types';

// Fix default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MarkerData {
    lat: number;
    lng: number;
    name: string;
    description: string;
    time: string;
}

interface ChangeViewProps {
    positions: [number, number][];
}

// Helper to fit bounds
const ChangeView: React.FC<ChangeViewProps> = ({ positions }) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [positions, map]);

    return null;
};

interface MapComponentProps {
    activities: Day[];
}

const MapComponent: React.FC<MapComponentProps> = ({ activities }) => {
    // Extract valid locations
    const markers: MarkerData[] = useMemo(() => {
        return activities.flatMap(day =>
            day.activities
                .filter((act: Activity) => act.location && act.location.lat && act.location.lng)
                .map((act: Activity) => ({
                    lat: act.location.lat,
                    lng: act.location.lng,
                    name: act.location.name,
                    description: act.activity,
                    time: act.time
                }))
        );
    }, [activities]);

    const positions: [number, number][] = useMemo(() => {
        return markers.map(m => [m.lat, m.lng] as [number, number]);
    }, [markers]);

    const center: [number, number] = positions.length > 0 ? positions[0] : [51.505, -0.09]; // Default: London

    // Create polyline for route
    const polylinePositions: [number, number][] = positions.length > 1 ? positions : [];

    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full rounded-2xl z-0"
            style={{ minHeight: '400px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Route line connecting locations */}
            {polylinePositions.length > 1 && (
                <Polyline
                    positions={polylinePositions}
                    color="#6366f1"
                    weight={3}
                    opacity={0.7}
                    dashArray="10, 10"
                />
            )}

            {/* Markers */}
            {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                    <Popup>
                        <div className="p-2">
                            <div className="font-bold text-indigo-600 mb-1">{marker.name}</div>
                            <div className="text-sm text-gray-700 mb-1">{marker.description}</div>
                            <div className="text-xs text-gray-500">{marker.time}</div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            <ChangeView positions={positions} />
        </MapContainer>
    );
};

export default MapComponent;
