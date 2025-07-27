import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchIncidentDistribution = async () => {
  const res = await axios.get(
    "https://datamining.devquailityup.xyz/statistics/by-incident-type"
  );

  const grouped = {
    "Acoso Callejero": 0,
    "Asaltos/Robos": 0,
    Secuestro: 0,
    "Peleas de Pandillas": 0,
    Otros: 0,
  };

  for (const item of res.data?.statistics ?? []) {
    const map = {
      SUSPICIOUS_ACTIVITY: "Acoso Callejero",
      ROBBERY_ASSAULT: "Asaltos/Robos",
      KIDNAPPING: "Secuestro",
      GANG_VIOLENCE: "Peleas de Pandillas",
    };
    const name = map[item.incident_type] ?? "Otros";
    grouped[name] += item.total_reports;
  }

  return Object.entries(grouped).map(([label, count]) => ({ label, count }));
};

export const useIncidentDistribution = () => {
  return useQuery({
    queryKey: ["incident-distribution"],
    queryFn: fetchIncidentDistribution,
  });
};
