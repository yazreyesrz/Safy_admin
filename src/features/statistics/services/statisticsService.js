import axios from "axios";

export const getDashboardStats = async () => {
  const response = await axios.get(
    "https://datamining.devquailityup.xyz/statistics/overview"
  );
  const overview = response.data?.overview;

  return {
    reportsToday: overview.total_reports || 0,
    activeUsers: overview.total_users || 0,
    zonesAtRisk: overview.total_zones || 0,
    reportsEvolution: [], // aún no disponibles
    userGrowth: [], // aún no disponibles
    incidentDistribution: [], // aún no disponibles
  };
};
