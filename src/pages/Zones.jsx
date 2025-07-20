import { useState } from "react";
import ZoneMap from "../components/ZoneMap";
import {
  FaMapMarkedAlt,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";

const zonasData = [
  { id: 1, nombre: "Col. Centro", estado: "Crítico", reportes: 12 },
  { id: 2, nombre: "Zona Norte", estado: "Moderado", reportes: 5 },
  { id: 3, nombre: "Col. Jardines", estado: "Bajo", reportes: 2 },
  { id: 4, nombre: "Zona Sur", estado: "Crítico", reportes: 9 },
  { id: 5, nombre: "Barrio San Roque", estado: "Moderado", reportes: 4 },
];

const getBadge = (estado) => {
  switch (estado) {
    case "Crítico":
      return "danger";
    case "Moderado":
      return "warning";
    case "Bajo":
      return "success";
    default:
      return "secondary";
  }
};

const Zones = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const zonasFiltradas = zonasData.filter((zona) => {
    const coincideNombre = zona.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "Todos" || zona.estado === filtroEstado;

    return coincideNombre && coincideEstado;
  });

  return (
    <div className="container">
      <h4 className="mb-4 d-flex align-items-center gap-2">
        Zonas identificadas
      </h4>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre de zona"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Crítico">Crítico</option>
            <option value="Moderado">Moderado</option>
            <option value="Bajo">Bajo</option>
          </select>
        </div>
      </div>

      <div className="card p-3 shadow-sm mb-4">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Zona</th>
              <th>Estado</th>
              <th>Reportes</th>
            </tr>
          </thead>
          <tbody>
            {zonasFiltradas.length > 0 ? (
              zonasFiltradas.map((zona) => (
                <tr key={zona.id}>
                  <td>{zona.nombre}</td>
                  <td>
                    <span className={`badge bg-${getBadge(zona.estado)}`}>
                      {zona.estado}
                    </span>
                  </td>
                  <td>{zona.reportes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  <FaExclamationTriangle className="me-2 text-warning" />
                  No se encontraron zonas con ese criterio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ZoneMap />
    </div>
  );
};

export default Zones;
