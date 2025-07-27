import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRiskAnalysis = async () => {
  const res = await axios.get(
    "https://datamining.devquailityup.xyz/statistics/risk-analysis"
  );
  return res.data?.severity_analysis ?? [];
};

export const useRiskAnalysis = () => {
  return useQuery({
    queryKey: ["risk-analysis"],
    queryFn: fetchRiskAnalysis,
  });
};
