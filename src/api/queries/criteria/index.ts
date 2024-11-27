import { supabase } from "@/api/supabaseClient";

export const getCriteriasByAreaId = async (areaId: number | null) => {
  if (!areaId) return [];

  const { data, error } = await supabase
    .from("criteria")
    .select("*")
    .eq("area_id", areaId);

  if (error) {
    console.error("Error fetching criterias:", error);
    return [];
  }

  return data;
};
