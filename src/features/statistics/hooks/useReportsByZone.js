import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://datamining.devquailityup.xyz";

export const useReportsByZone = () => {
  return useQuery({
    queryKey: ["reportsByZone"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/statistics/by-zone`);
      return response.data;
    },
  });
};
