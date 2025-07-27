import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import { useZonesStatistics } from "../../../statistics/hooks/useZonesStatistics";
import { useZonesStatistics } from "../../statistics/hooks/useZonesStatistics";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const getRiskLevel = (count) => {
  if (count >= 10) return "Crítico";
  if (count >= 4) return "Moderado";
  return "Bajo";
};

const ZoneMap = () => {
  const { data: zonasData = [], isLoading, isError } = useZonesStatistics();

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[19.4326, -99.1332]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!isLoading &&
          !isError &&
          zonasData.map((zona, idx) => (
            <Marker key={idx} position={[zona.latitude, zona.longitude]}>
              <Popup>
                <strong>{zona.address}</strong>
                <br />
                Reportes: {zona.incident_count}
                <br />
                Estado: {getRiskLevel(zona.incident_count)}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default ZoneMap;
