import { Preschool, Department } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getPreschoolAndDepartmentsById, getAllPreschools } from ".";

export const usePreschoolData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["preschool", id],
    queryFn: () =>
      getPreschoolAndDepartmentsById(id as string).then(({ data, error }) => {
        if (error) throw error;
        return data;
      }),
    enabled: !!id,
    staleTime: Infinity,
  });
};

export const useAllPreschools = () => {
  return useQuery({
    queryKey: ["preschools"],
    queryFn: () =>
      getAllPreschools().then(({ data, error }) => {
        if (error) throw error;
        return data as (Preschool & { departments: Department[] })[];
      }),
    staleTime: Infinity,
  });
};
