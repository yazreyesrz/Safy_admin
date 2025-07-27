import { useQuery } from "@tanstack/react-query";
import { getGeneralStatistics } from "../services/statisticsService";

export const useGeneralStatistics = () => {
  return useQuery({
    queryKey: ["generalStats"],
    queryFn: getGeneralStatistics,
  });
};
