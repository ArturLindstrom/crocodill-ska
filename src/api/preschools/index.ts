// api/preSchools.ts

import { supabase } from "@/api/supabaseClient";

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
