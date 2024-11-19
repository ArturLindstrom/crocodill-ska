import { useQuery } from "@tanstack/react-query";
import { getAreas, getCriteriasByAreaId } from "./index";

export const useGetAreas = () => {
  return useQuery({
    queryKey: ["areas", "all"],
    queryFn: getAreas,
    staleTime: Infinity,
  });
};

export const useGetCriteriasByAreaId = (areaId: number | null) => {
  return useQuery({
    queryKey: ["criterias", areaId],
    queryFn: () => getCriteriasByAreaId(areaId),
    enabled: !!areaId,
    staleTime: Infinity,
  });
};
