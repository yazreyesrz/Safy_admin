// src/pages/Dashboard.jsx
import React from "react";
import { FaExclamationTriangle, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const reportData = {
    labels: ["Jul 10", "Jul 11", "Jul 12", "Jul 13"],
    datasets: [
      {
        label: "Reportes",
        data: [5, 6, 12, 10],
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const userData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May"],
    datasets: [
      {
        label: "Usuarios",
        data: [10, 18, 35, 48, 56],
        backgroundColor: "#28a745",
      },
    ],
  };

  const incidentData = {
    labels: ["Asaltos/Robos", "Acoso Callejero", "Secuestro", "Peleas"],
    datasets: [
      {
        label: "Incidentes",
        data: [12, 5, 2, 6],
        backgroundColor: ["#dc3545", "#ffc107", "#6610f2", "#20c997"],
      },
    ],
  };

  return (
    <div className="container">
      <h4 className="mb-4">Panel General</h4>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <FaExclamationTriangle size={28} className="mb-2 text-danger" />
            <h6>Reportes hoy</h6>
            <h4>12</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <FaUsers size={28} className="mb-2 text-success" />
            <h6>Usuarios activos</h6>
            <h4>58</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <FaMapMarkedAlt size={28} className="mb-2 text-primary" />
            <h6>Zonas en riesgo</h6>
            <h4>9</h4>
          </div>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Evolución de reportes</h6>
            <Line data={reportData} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Crecimiento de usuarios</h6>
            <Bar data={userData} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Distribución de incidentes</h6>
            <Pie data={incidentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
