// api/preSchools.ts

import { supabase } from "@/api/supabaseClient";
import { getTermsWithMonths } from "../terms";
import { useQuery } from "@tanstack/react-query";
import { getDocumentationsByPreschoolTermAndMonth } from "../documentations/queries";
import { Department, Preschool } from "@/types";

export const getAllPreschools = async () => {
  const { data, error } = await supabase.from("preschools").select(`
      *,
      departments (*)
    `);
  return { data, error };
};

export const getPreschoolAndDepartmentsById = async (preschoolId: string) => {
  const { data: preschool, error: preschoolError } = await supabase
    .from("preschools")
    .select()
    .eq("preschool_id", preschoolId)
    .single();

  const { data: departments, error: departmentsError } = await supabase
    .from("departments")
    .select()
    .eq("preschool_id", preschoolId);

  return { preschool, departments, preschoolError, departmentsError };
};

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
  });
};
