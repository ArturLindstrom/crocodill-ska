import { Student } from "@/types";
import { supabase } from "../../supabaseClient";

interface StudentsResponse {
  students: Student[];
}

export const getStudentsByPreschoolId = async (
  preschoolId: number = 1
): Promise<StudentsResponse> => {
  const { data: students, error } = await supabase
    .from("students")
    .select()
    .eq("preschool_id", preschoolId);

  if (error) {
    throw error;
  }

  return {
    students: students || [],
  };
};
