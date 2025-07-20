import { useState } from "react";
import {
  FaExclamationTriangle,
  FaSearch,
  FaMapMarkerAlt,
  FaUser,
  FaUserSecret,
  FaSkullCrossbones,
  FaUsers,
} from "react-icons/fa";

const Reports = () => {
  const [selectedType, setSelectedType] = useState("Todos");

  const reports = [
    {
      fecha: "2025-07-12",
      usuario: "María L.",
      ubicacion: "Col. Centro",
      tipo: "Asaltos/Robos",
      descripcion: "Un sujeto armado robó a una persona.",
    },
    {
      fecha: "2025-07-11",
      usuario: "Anónimo",
      ubicacion: "Zona Norte",
      tipo: "Peleas de Pandillas",
      descripcion: "Conflicto entre jóvenes afuera de un bar.",
    },
    {
      fecha: "2025-07-10",
      usuario: "Carlos T.",
      ubicacion: "Col. Jardines",
      tipo: "Secuestro",
      descripcion: "Se reportó un intento de secuestro.",
    },
    {
      fecha: "2025-07-09",
      usuario: "Anónimo",
      ubicacion: "Av. Universidad",
      tipo: "Acoso Callejero",
      descripcion: "Persona siguió a una joven de forma sospechosa.",
    },
  ];

  const incidentes = [
    "Todos",
    "Acoso Callejero",
    "Asaltos/Robos",
    "Secuestro",
    "Peleas de Pandillas",
  ];

  const getBadgeColor = (tipo) => {
    switch (tipo) {
      case "Acoso Callejero":
        return "bg-warning text-dark";
      case "Asaltos/Robos":
        return "bg-danger";
      case "Secuestro":
        return "bg-dark";
      case "Peleas de Pandillas":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const getIcon = (tipo) => {
    switch (tipo) {
      case "Acoso Callejero":
        return <FaUserSecret className="me-1" />;
      case "Asaltos/Robos":
        return <FaExclamationTriangle className="me-1" />;
      case "Secuestro":
        return <FaSkullCrossbones className="me-1" />;
      case "Peleas de Pandillas":
        return <FaUsers className="me-1" />;
      default:
        return <FaUser className="me-1" />;
    }
  };

  const filteredReports =
    selectedType === "Todos"
      ? reports
      : reports.filter((r) => r.tipo === selectedType);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold">Reportes recientes</h4>

        <div className="d-flex align-items-center gap-2">
          <FaSearch className="text-muted" />
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ maxWidth: "220px" }}
          >
            {incidentes.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card shadow-sm p-3 border-0">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>
                <FaMapMarkerAlt className="me-1 text-secondary" />
                Ubicación
              </th>
              <th>Incidente</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index}>
                <td>{report.fecha}</td>
                <td>{report.usuario}</td>
                <td>{report.ubicacion}</td>
                <td>
                  <span className={`badge ${getBadgeColor(report.tipo)} fs-6`}>
                    {getIcon(report.tipo)} {report.tipo}
                  </span>
                </td>
                <td>{report.descripcion}</td>
              </tr>
            ))}
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay reportes para este tipo de incidente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
