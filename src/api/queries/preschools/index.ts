// api/preSchools.ts

import { supabase } from "@/api/supabaseClient";

export const getAllPreschools = async () => {
  const { data, error } = await supabase.from("preschools").select(`
      *,
      departments (*)
    `);
  return { data, error };
};

export const getPreschoolAndDepartmentsById = async (preschoolId: string) => {
  const { data, error } = await supabase
    .from("preschools")
    .select(
      `
      *,
      teachers (
        *,
        department:departments!inner (*)
      )
    `
    )
    .eq("preschool_id", preschoolId)
    .single();

  return { data, error };
};
