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

  if (terms && terms.length > 0) {
    const firstTermId = terms[0].term_id;
    const { data: documentations, error: docError } = await supabase
      .from("documentations")
      .select("*, teachers(name)")
      .eq("term_id", firstTermId);

    if (docError) {
      console.error("Error fetching documentations:", docError);
      return { terms, documentations: null, error: docError };
    }
    console.log("terms", terms);
    console.log("documentations", documentations);

    return { terms, documentations, error: null };
  }

  return { terms, documentations: null, error: null };
};
