import { useState } from "react";
import {
  FaMapMarkedAlt,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useZonesStatistics } from "../features/statistics/hooks/useZonesStatistics";

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

const getRiskLevel = (count) => {
  if (count >= 10) return "Crítico";
  if (count >= 4) return "Moderado";
  return "Bajo";
};

const Zones = () => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [paginaActual, setPaginaActual] = useState(1);
  const pageSize = 15;

  const {
    data: zonasData = [],
    isLoading,
    isError,
  } = useZonesStatistics(paginaActual, pageSize);

  const zonasProcesadas = zonasData.map((z, index) => ({
    id: index + 1 + (paginaActual - 1) * pageSize,
    nombre: z.address,
    estado: getRiskLevel(z.incident_count),
    reportes: z.incident_count,
  }));

  const zonasFiltradas = zonasProcesadas.filter((zona) => {
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
        <FaMapMarkedAlt className="me-2" />
        Zonas identificadas
      </h4>

      {/* Filtros */}
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

      {/* Tabla */}
      <div className="card p-3 shadow-sm mb-4">
        {isLoading ? (
          <p className="text-muted text-center">Cargando zonas...</p>
        ) : isError ? (
          <p className="text-danger text-center">Error al cargar zonas.</p>
        ) : (
          <>
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

            {/* Paginación mejorada */}
            <nav className="d-flex justify-content-center mt-3">
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

export default Zones;
