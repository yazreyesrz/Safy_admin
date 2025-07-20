// src/components/ReportTable.jsx
const sampleReports = [
  {
    id: 1,
    date: "2025-07-12",
    user: "María L.",
    location: "Col. Centro",
    incident: "Asalto",
    description: "Un sujeto armado robó a una persona.",
    status: "Resuelto",
  },
  {
    id: 2,
    date: "2025-07-11",
    user: "Anónimo",
    location: "Zona Norte",
    incident: "Pelea",
    description: "Conflicto entre jóvenes afuera de un bar.",
    status: "En revisión",
  },
  {
    id: 3,
    date: "2025-07-10",
    user: "Carlos T.",
    location: "Col. Jardines",
    incident: "Secuestro",
    description: "Se reportó un intento de secuestro.",
    status: "Pendiente",
  },
];

const statusClasses = {
  Resuelto: "badge bg-success",
  "En revisión": "badge bg-primary",
  Pendiente: "badge bg-warning text-dark",
};

const ReportTable = () => {
  return (
    <div className="card p-4">
      <h4>Reportes recientes</h4>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Ubicación</th>
              <th>Incidente</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {sampleReports.map((report) => (
              <tr key={report.id}>
                <td>{report.date}</td>
                <td>{report.user}</td>
                <td>{report.location}</td>
                <td>{report.incident}</td>
                <td>{report.description}</td>
                <td>
                  <span className={statusClasses[report.status]}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
