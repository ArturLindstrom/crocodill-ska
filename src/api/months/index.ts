import { supabase } from "../supabaseClient";

export const getAllMonths = async () => {
  const { data: months, error } = await supabase.from("months").select();
  return { months, error };
};
