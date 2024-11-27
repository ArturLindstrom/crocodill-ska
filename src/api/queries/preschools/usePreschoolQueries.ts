import { Preschool, Department } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getPreschoolAndDepartmentsById, getAllPreschools } from ".";
import { getDocumentationsByPreschoolTermAndMonth } from "../documentations";
import { getTermsWithMonths } from "../terms";

export const preschoolLoader = async (id: string) => {
  const { preschool, departments } = await getPreschoolAndDepartmentsById(id);
  const { data: termsData } = await getTermsWithMonths();

  if (!termsData || termsData.length === 0) {
    throw new Error("No terms found");
  }

  // Extract unique months from termsData
  const months = termsData
    .flatMap((term) => term.month_term)
    .map((mt) => mt.months)
    .filter((month): month is NonNullable<typeof month> => month !== null);

  const { documentations, countByMonth } =
    await getDocumentationsByPreschoolTermAndMonth({
      termId: termsData[0].term_id.toString(),
      preschoolId: id,
    });

  return {
    preschool,
    departments,
    terms: termsData,
    months,
    documentations,
    countByMonth,
  };
};

export const usePreschoolData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["preschoolData", id],
    queryFn: () => preschoolLoader(id as string),
    enabled: !!id,
    staleTime: Infinity,
  });
};

export const useAllPreschools = () => {
  return useQuery({
    queryKey: ["preschools"],
    queryFn: async () => {
      const { data, error } = await getAllPreschools();
      if (error) throw error;
      return data as (Preschool & { departments: Department[] })[];
    },
    staleTime: Infinity,
  });
};
