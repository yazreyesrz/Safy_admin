import React from "react";
import { FaExclamationTriangle, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { useRiskAnalysis } from "../features/statistics/hooks/useRiskAnalysis";
import { useIncidentDistribution } from "../features/statistics/hooks/useIncidentDistribution";
import { useDashboardStats } from "../features/statistics/hooks/useDashboardStats";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const {
    data: riskData = [],
    isLoading: loadingRisk,
    isError: errorRisk,
  } = useRiskAnalysis();

  const {
    data: incidentDistribution = [],
    isLoading: loadingInc,
    isError: errorInc,
  } = useIncidentDistribution();

  const {
    data: stats,
    isLoading: loadingStats,
    isError: errorStats,
  } = useDashboardStats();

  const isLoading = loadingRisk || loadingInc || loadingStats;
  const isError = errorRisk || errorInc || errorStats;

  if (isLoading) return <p className="text-center">Cargando estadísticas...</p>;
  if (isError)
    return (
      <p className="text-danger text-center">Error al cargar estadísticas.</p>
    );

  const reportsToday = incidentDistribution.reduce(
    (acc, i) => acc + i.count,
    0
  );

  const severityColors = {
    1: "#28a745", // verde
    2: "#85c940", // verde claro
    3: "#ffc107", // amarillo
    4: "#fd7e14", // naranja
    5: "#dc3545", // rojo
  };

  const riskBarData = {
    labels: riskData.map((r) => `Severidad ${r.severity}`),
    datasets: [
      {
        label: "Incidentes",
        data: riskData.map((r) => r.total_incidents),
        backgroundColor: riskData.map(
          (r) => severityColors[r.severity] || "#007bff"
        ),
      },
    ],
  };

  const incidentData = {
    labels: incidentDistribution.map((i) => i.label),
    datasets: [
      {
        label: "Incidentes",
        data: incidentDistribution.map((i) => i.count),
        backgroundColor: [
          "#dc3545", // Acoso Callejero
          "#ffc107", // Asaltos/Robos
          "#6610f2", // Secuestro
          "#20c997", // Peleas de Pandillas
          "#6c757d", // Otros
        ],
      },
    ],
  };

  return (
    <div className="container">
      <h4 className="mb-4">Panel General</h4>

      {/* TARJETAS SUPERIORES */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <FaExclamationTriangle size={28} className="mb-2 text-danger" />
            <h6>Reportes totales</h6>
            <h4>{reportsToday}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <FaUsers size={28} className="mb-2 text-success" />
            <h6>Usuarios registrados</h6>
            <h4>{stats?.activeUsers ?? "-"}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <FaMapMarkedAlt size={28} className="mb-2 text-primary" />
            <h6>Zonas de riesgo</h6>
            <h4>{stats?.zonesAtRisk ?? "-"}</h4>
          </div>
        </div>
      </div>

      {/* GRÁFICAS */}
      <div className="row gy-4">
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="card p-3 shadow-sm w-100" style={{ height: "420px" }}>
            <h6 className="mb-3">Severidad de incidentes</h6>
            {riskData.length > 0 ? (
              <Bar
                data={riskBarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                }}
              />
            ) : (
              <p className="text-muted text-center">No hay datos aún.</p>
            )}
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-stretch">
          <div
            className="card p-3 shadow-sm w-100"
            style={{
              height: "420px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <h6 className="mb-3">Distribución de incidentes</h6>
            {incidentDistribution.length > 0 ? (
              <div style={{ height: "100%", position: "relative" }}>
                <Pie
                  data={incidentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            ) : (
              <p className="text-muted text-center">No hay datos aún.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
