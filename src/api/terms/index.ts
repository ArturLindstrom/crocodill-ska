import { supabase } from "../supabaseClient";

export const getTermsWithMonths = async () => {
  const { data, error } = await supabase
    .from("terms")
    .select(
      `
      *,
      month_term!inner (
        months (*)
      )
    `
    )
    .order("term_id", { ascending: true });

  return {
    data,
    error,
  };
};
