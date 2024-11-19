import { useQuery } from "@tanstack/react-query";
import { getTeachersByPreschoolId } from ".";

export const useTeachersQuery = (preschoolId: number = 2) => {
  return useQuery({
    queryKey: ["students", preschoolId],
    queryFn: () => getTeachersByPreschoolId(preschoolId),
  });
};
