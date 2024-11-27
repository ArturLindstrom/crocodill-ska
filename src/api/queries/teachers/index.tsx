// Initialize Supabase client

import { supabase } from "../../supabaseClient";

export const getTeachersByPreschoolId = async (preschoolId: number) => {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("preschool_id", preschoolId);

  if (error) {
    console.error("Error fetching teachers:", error);
    return null;
  }

  return data;
};
