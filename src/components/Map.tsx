import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';


interface MapProps{
    lat:number;
    lng:number;
}

export default function Map({lat,lng}:MapProps) {

    const iconTracker = L.icon({
        iconUrl: './icon-location.svg',
        iconRetinaUrl: './icon-location.svg',
        iconAnchor: null,
        popupAnchor: null,
        shadowUrl:null,
        shadowSize:null,
        shadowAnchor:null,
        iconSize: new L.Point(45,55),
        className: 'teste'
    })

    const mapboxToken = process.env.REACT_APP_MAPBOX_API_KEY 


    return (
        <MapContainer 
            center={[lat, lng]} 
            zoom={18} 
            scrollWheelZoom 
            style={{
                    height: "60vh", 
                    width: "100%" , 
                    zIndex:1
                }}>

            <TileLayer
                attribution= '© <a href="https://www.mapbox.com/feedback/">Mapbox</a>'
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
                maxZoom={18}
            />
            <Marker position={[lat, lng]}
                icon={iconTracker}
            >
                
            </Marker>
        </MapContainer>
    )
}