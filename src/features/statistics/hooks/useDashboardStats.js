import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStats = async () => {
  const { data } = await axios.get(
    "https://datamining.devquailityup.xyz/statistics/overview"
  );
  const overview = data?.overview;

  return {
    reportsToday: overview.total_reports,
    activeUsers: overview.total_users,
    zonesAtRisk: overview.total_zones,
  };
};

export const useDashboardStats = () =>
  useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });
