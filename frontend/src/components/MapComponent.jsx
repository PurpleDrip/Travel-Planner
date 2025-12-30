import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to fit bounds
const ChangeView = ({ positions }) => {
    const map = useMap();
    useEffect(() => {
        if (positions.length > 0) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [positions, map]);
    return null;
};

const MapComponent = ({ activities }) => {
    // Extract valid locations
    const markers = activities.flatMap(day => 
        day.activities
            .filter(act => act.location && act.location.lat && act.location.lng)
            .map(act => ({
                lat: act.location.lat,
                lng: act.location.lng,
                name: act.location.name,
                description: act.activity
            }))
    );

    const positions = markers.map(m => [m.lat, m.lng]);
    const center = positions.length > 0 ? positions[0] : [51.505, -0.09]; // Default: London

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-xl z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                    <Popup>
                        <strong>{marker.name}</strong><br />
                        {marker.description}
                    </Popup>
                </Marker>
            ))}
            <ChangeView positions={positions} />
        </MapContainer>
    );
};

export default MapComponent;
