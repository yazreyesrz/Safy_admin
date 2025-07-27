import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useZonesStatistics } from "../features/statistics/hooks/useZonesStatistics";

// Crear íconos de colores personalizados
const iconRed = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const iconYellow = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const iconGreen = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const getRiskLevel = (count) => {
  if (count >= 10) return "Crítico";
  if (count >= 4) return "Moderado";
  return "Bajo";
};

const getMarkerIcon = (estado) => {
  switch (estado) {
    case "Crítico":
      return iconRed;
    case "Moderado":
      return iconYellow;
    case "Bajo":
      return iconGreen;
    default:
      return iconGreen;
  }
};

const Users = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const pageSize = 15;

  const {
    data: zonasData = [],
    isLoading,
    isError,
  } = useZonesStatistics(paginaActual, pageSize);

  return (
    <div className="container">
      <h4 className="mb-4 d-flex align-items-center gap-2">
        <FaMapMarkedAlt className="me-2" />
        Mapa de zonas con reportes
      </h4>

      <div className="card p-3 shadow-sm">
        {isLoading ? (
          <p className="text-center text-muted">Cargando zonas en el mapa...</p>
        ) : isError ? (
          <p className="text-center text-danger">Error al cargar zonas.</p>
        ) : (
          <>
            <div style={{ height: "500px", width: "100%" }}>
              <MapContainer
                center={[16.7536, -93.1156]} // Tuxtla Gutiérrez
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {zonasData.map((zona, idx) => {
                  const estado = getRiskLevel(zona.incident_count);
                  return (
                    <Marker
                      key={idx}
                      position={[zona.latitude, zona.longitude]}
                      icon={getMarkerIcon(estado)}
                    >
                      <Popup>
                        <strong>{zona.address}</strong>
                        <br />
                        Reportes: {zona.incident_count}
                        <br />
                        Estado: {estado}
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>

            {/* Paginación visual */}
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li
                  className={`page-item ${
                    paginaActual === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPaginaActual((prev) => prev - 1)}
                    disabled={paginaActual === 1}
                  >
                    Anterior
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link">Página {paginaActual}</span>
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setPaginaActual((prev) => prev + 1)}
                  >
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
