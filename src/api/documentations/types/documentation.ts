import { AreaWithCriteria } from "@/store/documentations/types/shared";

export type DBDocumentationInput = {
  department_id: number;
  preschool_id: number;
  teacher_id: number;
  name: string;
  month_id: number;
  term_id: number;
  created_at?: string | null;
};

export interface DocumentationData {
  dbDoc: DBDocumentationInput;
  studentIds: number[];
  selectedAreasWithCriteria: AreaWithCriteria[];
}
