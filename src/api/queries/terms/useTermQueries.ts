import { useQuery } from "@tanstack/react-query";
import { getTermsWithMonths } from ".";

export const useGetTermsWithMonths = () => {
  return useQuery({
    queryKey: ["terms", "all"],
    queryFn: getTermsWithMonths,
    staleTime: Infinity,
  });
};
