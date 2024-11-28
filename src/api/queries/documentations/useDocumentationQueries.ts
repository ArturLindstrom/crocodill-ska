import { useQuery } from "@tanstack/react-query";
import {
  getDocumentationsByTermMonthAndDepartment,
  getDocumentationsByPreschoolTermAndMonth,
} from "./index";

export const useDocumentationsByTermMonthAndDepartment = (
  selectedTermId: string,
  selectedMonthId: string,
  selectedDepartments: number[]
) => {
  return useQuery({
    queryKey: [
      "documentations",
      selectedTermId,
      selectedMonthId,
      selectedDepartments,
    ],
    queryFn: () =>
      getDocumentationsByTermMonthAndDepartment({
        selectedTermId,
        selectedMonthId,
        selectedDepartments,
      }),
    enabled: Boolean(
      selectedTermId && selectedMonthId && selectedDepartments.length
    ),
  });
};

export const useDocumentationsByPreschoolTermAndMonth = (
  termId: string,
  preschoolId: string
) => {
  return useQuery({
    queryKey: ["documentations", "preschool", termId, preschoolId],
    queryFn: () =>
      getDocumentationsByPreschoolTermAndMonth({
        termId,
        preschoolId,
      }),
    enabled: Boolean(termId && preschoolId),
  });
};
