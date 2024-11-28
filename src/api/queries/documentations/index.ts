import { supabase } from "@/api/supabaseClient";
import { DocumentationWithTeacher } from "@/types";

type GetDocumentationsByTermMonthAndDepartmentProps = {
  selectedTermId: string;
  selectedMonthId: string;
  selectedDepartments: number[];
};

export const getDocumentationsByTermMonthAndDepartment = async ({
  selectedTermId,
  selectedMonthId,
  selectedDepartments,
}: GetDocumentationsByTermMonthAndDepartmentProps): Promise<
  DocumentationWithTeacher[]
> => {
  const { data, error } = await supabase
    .from("documentations")
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
  return data as DocumentationWithTeacher[];
};

type getDocumentationsByTermAndPreschoolProps = {
  termId: string;
  preschoolId: string;
};

export const getDocumentationsByPreschoolTermAndMonth = async ({
  termId,
  preschoolId,
}: getDocumentationsByTermAndPreschoolProps) => {
  const { data: documentations, error } = await supabase
    .from("documentations")
    .select("*, teachers(name), months(month_name)", { count: "exact" })
    .eq("term_id", termId)
    .eq("preschool_id", preschoolId);

  if (error) {
    console.error("Error fetching documentations:", error);
    return { documentations: null, countByMonth: null, error };
  }

  const countByMonth: { [key: string]: number } = documentations.reduce(
    (acc, doc) => {
      const monthName = doc.months?.month_name || "Unknown";
      acc[monthName] = (acc[monthName] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return { documentations, countByMonth, error: null };
};
