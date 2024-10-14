import { supabase } from "@/api/supabaseClient";

export const getAllTerms = async () => {
  const { data: terms, error } = await supabase
    .from("terms")
    .select()
    .order("term_id", { ascending: true });

  if (error) {
    console.error("Error fetching terms:", error);
    return { terms: null, error };
  }

  return { terms, error: null };
};
