import React from "react";
import { useGeneralStatistics } from "../hooks/useGeneralStatistics";

function Overview() {
  const { data, isLoading, error } = useGeneralStatistics();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div>
      <h2>Resumen General</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Overview;
