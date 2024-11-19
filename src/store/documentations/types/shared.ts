import { Student } from "@/types";

export interface CriteriaItem {
  criteriaId: number;
  criteriaName: string;
}

export interface AreaWithCriteria {
  areaId: string | number;
  areaName: string;
  criteria: CriteriaItem[];
}

export interface DocumentationState {
  documentationName: string;
  students: Student[];
  studentIds: number[];
  selectedAreasWithCriteria: AreaWithCriteria[];
  institution: {
    preschoolId: number | null;
    preschoolName: string | null;
    departmentId: number | null;
    departmentName: string | null;
  };
  teacher: {
    id: number | null;
    name: string | null;
  };
  month: {
    monthId: number | null;
    monthName: string | null;
  };
  term: {
    termId: number | null;
    termName: string | null;
  };
}
