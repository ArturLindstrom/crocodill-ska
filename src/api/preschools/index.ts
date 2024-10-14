// api/preSchools.ts

import { supabase } from "@/api/supabaseClient";
import { getAllMonths } from "../months";
import { getAllTerms } from "../terms";
import { useQuery } from "@tanstack/react-query";
import { getDocumentationsByPreschoolTermAndMonth } from "../documentations";

export const getAllPreschools = async () => {
  const { data, error } = await supabase.from("preschools").select();
  return { data, error }; // Return both data and error
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
  const { terms } = await getAllTerms();
  const { months } = await getAllMonths();

  if (!terms || terms.length === 0) {
    throw new Error("No terms found");
  }

  const { documentations, countByMonth } =
    await getDocumentationsByPreschoolTermAndMonth({
      termId: terms[0].term_id.toString(),
      preschoolId: id,
    });

  return {
    preschool,
    departments,
    terms,
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
