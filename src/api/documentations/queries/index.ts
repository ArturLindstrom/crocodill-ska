import { useQuery } from "@tanstack/react-query";

type GetDocumentationsByTermMonthAndDepartmentProps = {
  selectedTermId: string;
  selectedMonthId: string;
  selectedDepartments: number[];
};

import { DocumentationWithTeacher } from "@/types";
import { supabase } from "../../supabaseClient";

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

type getDocumentationsByTermAndPreschoolProps = {
  termId: string; // ID of the selected term
  preschoolId: string; // ID of the selected preschool
};

export const getDocumentationsByPreschoolTermAndMonth = async ({
  termId,
  preschoolId,
}: getDocumentationsByTermAndPreschoolProps) => {
  const { data: documentations, error } = await supabase
    .from("documentations")
    .select("*, teachers(name), months(month_name)", { count: "exact" }) // Joining with months table
    .eq("term_id", termId) // Filter by term_id
    .eq("preschool_id", preschoolId); // Filter by preschool_id

  if (error) {
    console.error("Error fetching documentations:", error);
    return { documentations: null, countByMonth: null, error };
  }

  // Count documentations by month name
  const countByMonth: { [key: string]: number } = documentations.reduce(
    (acc, doc) => {
      // Check if `months` and `month_name` exist before accessing
      const monthName = doc.months?.month_name || "Unknown";
      acc[monthName] = (acc[monthName] || 0) + 1; // Increment count for the month
      return acc;
    },
    {} as { [key: string]: number }
  );

  return { documentations, countByMonth, error: null };
};

export const getAreas = async () => {
  const { data, error } = await supabase.from("areas").select("*");

  if (error) {
    console.error("Error fetching areas:", error);
    return [];
  }

  return data;
};

export const useGetAreas = () => {
  return useQuery({
    queryKey: ["areas", "all"],
    queryFn: getAreas,
    staleTime: Infinity,
  });
};

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

export const useGetCriteriasByAreaId = (areaId: number | null) => {
  return useQuery({
    queryKey: ["criterias", areaId],
    queryFn: () => getCriteriasByAreaId(areaId),
    enabled: !!areaId, // Only fetch when areaId is truthy
    staleTime: Infinity,
  });
};