import { supabase } from "@/api/supabaseClient";

export const getAreas = async () => {
  const { data, error } = await supabase.from("areas").select("*");

  if (error) {
    console.error("Error fetching areas:", error);
    return [];
  }

  return data;
};
