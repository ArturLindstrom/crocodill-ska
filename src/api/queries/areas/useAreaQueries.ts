import { useQuery } from "@tanstack/react-query";
import { getAreas } from ".";

export const useGetAreas = () => {
  return useQuery({
    queryKey: ["areas", "all"],
    queryFn: getAreas,
    staleTime: Infinity,
  });
};
