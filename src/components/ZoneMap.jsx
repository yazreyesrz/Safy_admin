// src/components/ZoneMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const zonas = [
  {
    id: 1,
    nombre: "Col. Centro",
    estado: "Crítico",
    coords: [16.7539, -93.1169],
  },
  {
    id: 2,
    nombre: "Zona Norte",
    estado: "Moderado",
    coords: [16.7585, -93.1123],
  },
  {
    id: 3,
    nombre: "Col. Jardines",
    estado: "Bajo",
    coords: [16.75, -93.12],
  },
];

// Función para obtener color del marcador
const getMarkerColor = (estado) => {
  switch (estado) {
    case "Crítico":
      return "red";
    case "Moderado":
      return "orange";
    case "Bajo":
      return "green";
    default:
      return "blue";
  }
};

// Crear un ícono personalizado
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const ZoneMap = () => {
  return (
    <div className="mt-4">
      <h5 className="mb-3">Zonas en el mapa</h5>
      <MapContainer
        center={[16.7539, -93.1169]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {zonas.map((zona) => (
          <Marker
            key={zona.id}
            position={zona.coords}
            icon={createIcon(getMarkerColor(zona.estado))}
          >
            <Popup>
              <strong>{zona.nombre}</strong> <br />
              Estado: {zona.estado}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ZoneMap;
