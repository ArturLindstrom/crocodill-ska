import { Student, Criteria } from "@/types";
import { DocumentationState } from "./types/shared";

export type SetInstitutionPayload = {
  preschoolId: number;
  preschoolName: string;
  departmentId: number;
  departmentName: string;
};

export interface DocumentationActions {
  setDocumentationName: (name: string) => void;
  setStudents: (students: Student[]) => void;
  setStudentIds: (studentIds: number[]) => void;
  setAreaCriteria: (
    areaId: number | string,
    areaName: string,
    criteria: Criteria,
    checked: boolean
  ) => void;
  setInstitution: (institution: SetInstitutionPayload) => void;
  setTeacher: (id: number, name: string) => void;
  setMonth: (payload: { monthId: number; monthName: string }) => void;
  setTerm: (payload: { termId: number; termName: string }) => void;
  getDocumentationData: () => DocumentationState & DocumentationActions;
  resetForm: () => void;
}
