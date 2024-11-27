import { useQuery } from "@tanstack/react-query";
import { getCriteriasByAreaId } from ".";

export const useGetCriteriasByAreaId = (areaId: number | null) => {
  return useQuery({
    queryKey: ["criterias", areaId],
    queryFn: () => getCriteriasByAreaId(areaId),
    enabled: !!areaId,
    staleTime: Infinity,
  });
};
