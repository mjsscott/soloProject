import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons
/* L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
}); */

const MapComponent = ({ pets }) => {

    // Generate random offsets to avoid marker overlap for pets with the same location
    const getRandomOffset = () => (Math.random() - 0.5) * 0.001;

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%', marginTop: '20px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pets.map((pet) => (
                <Marker
                    key={pet._id}
                    position={[
                        pet.location.lat + getRandomOffset(),
                        pet.location.lng + getRandomOffset()
                    ]}
                >
                    <Popup>
                        <h3>{pet.name}</h3>
                        <p>Age: {pet.age}</p>
                        <p>Shelter: {pet.shelterName || 'No Shelter Name'}</p>
                        <Link to={`/pets/${pet._id}`}>View Details</Link>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;