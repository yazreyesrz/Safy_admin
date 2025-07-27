import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useZonesStatistics = (page = 1, pageSize = 30) => {
  return useQuery({
    queryKey: ["zones", page],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://datamining.devquailityup.xyz/statistics/by-zone?page=${page}&page_size=${pageSize}`
      );
      return data?.statistics || [];
    },
    keepPreviousData: true,
  });
};
