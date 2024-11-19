import { Database } from "./supabase";

// Basic table types
export type Criteria = Database["public"]["Tables"]["criteria"]["Row"];
export type Department = Database["public"]["Tables"]["departments"]["Row"];
export type Month = {
  month_id: number;
  month_name: string;
  term_id: number;
};
export type Preschool = Database["public"]["Tables"]["preschools"]["Row"];
export type Student = Database["public"]["Tables"]["students"]["Row"];
export type Teacher = Database["public"]["Tables"]["teachers"]["Row"];
export type Term = {
  term_id: number;
  term_name: string | null;
  month_term: {
    months: {
      month_id: number;
      month_name: string | null;
    } | null;
  }[];
};
export type Documentation =
  Database["public"]["Tables"]["documentations"]["Row"];
export type Area = Database["public"]["Tables"]["areas"]["Row"];

// Junction table types
export type DocumentationStudent =
  Database["public"]["Tables"]["documentation_student"]["Row"];
export type DocumentationCriteria =
  Database["public"]["Tables"]["documentation_criteria"]["Row"];

// Extended types
export type PreschoolLoader = {
  preschool: Preschool;
  departments: Department[];
  terms: Term[];
  months: Month[];
  documentations: DocumentationWithTeacher[];
};

export interface DocumentationWithTeacher extends Documentation {
  teachers: {
    name: string;
  } | null;
}
