import { supabase } from "../supabaseClient";

type GetDocumentationsByTermMonthAndDepartmentProps = {
  selectedTermId: string;
  selectedMonthId: string;
  selectedDepartments: number[];
};

import { DocumentationWithTeacher } from "@/types";

// Function to fetch documentations along with teacher's data based on term, month, and departments
export const getDocumentationsByTermMonthAndDepartment = async ({
  selectedTermId,
  selectedMonthId,
  selectedDepartments,
}: GetDocumentationsByTermMonthAndDepartmentProps): Promise<
  DocumentationWithTeacher[]
> => {
  const { data, error } = await supabase
    .from("documentations") // No need to pass the type here
    .select(
      `
      *,
      teachers(name)
    `
    )
    .eq("term_id", selectedTermId)
    .eq("month_id", selectedMonthId)
    .in("department_id", selectedDepartments);

  if (error) {
    console.error("Error fetching documentations:", error);
    return [];
  }
  console.log("data", data);
  // Return the data as it includes the 'teachers' relationship directly
  return data as DocumentationWithTeacher[]; // Cast here to ensure the correct return type
};
