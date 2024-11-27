import { useQuery } from "@tanstack/react-query";
import { getStudentsByPreschoolId } from "./index";

export const useStudentsQuery = (preschoolId: number = 1) => {
  return useQuery({
    queryKey: ["students", preschoolId],
    queryFn: () => getStudentsByPreschoolId(preschoolId),
    staleTime: Infinity,
  });
};
