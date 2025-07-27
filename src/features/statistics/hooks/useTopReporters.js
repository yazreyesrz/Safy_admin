import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTopReporters = async () => {
  const { data } = await axios.get(
    "https://datamining.devquailityup.xyz/statistics/top-reporters?limit=10"
  );
  return data.top_reporters;
};

export const useTopReporters = () => {
  return useQuery({
    queryKey: ["top-reporters"],
    queryFn: fetchTopReporters,
  });
};
