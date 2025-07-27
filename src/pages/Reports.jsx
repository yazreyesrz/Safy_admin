import { FaUser, FaEnvelope, FaClipboardList } from "react-icons/fa";
import { useTopReporters } from "../features/statistics/hooks/useTopReporters";

const Reports = () => {
  const { data: reporters = [], isLoading, isError } = useTopReporters();

  return (
    <div className="container">
      <h4 className="fw-bold mb-4">Usuarios y Reportes</h4>

      <div className="card shadow-sm p-3 border-0">
        {isLoading ? (
          <p className="text-center text-muted">Cargando reporteros...</p>
        ) : isError ? (
          <p className="text-danger text-center">Error al cargar los datos.</p>
        ) : (
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>
                  <FaUser className="me-1 text-secondary" />
                  Nombre
                </th>
                <th>
                  <FaEnvelope className="me-1 text-secondary" />
                  Email
                </th>
                <th>
                  <FaClipboardList className="me-1 text-secondary" />
                  Total Reportes
                </th>
                <th>Días Activos</th>
              </tr>
            </thead>
            <tbody>
              {reporters.length > 0 ? (
                reporters.map((r) => (
                  <tr key={r.reporter_id}>
                    <td>{r.reporter_name}</td>
                    <td>{r.reporter_email}</td>
                    <td>{r.total_reports}</td>
                    <td>{r.active_days}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No hay reporteros registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;
