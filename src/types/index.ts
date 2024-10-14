import { Database } from "./supabase";

export type Criteria = Database["public"]["Tables"]["criteria"]["Row"];
export type Department = Database["public"]["Tables"]["departments"]["Row"];
export type Month = Database["public"]["Tables"]["months"]["Row"];
export type Preschool = Database["public"]["Tables"]["preschools"]["Row"];
export type Student = Database["public"]["Tables"]["students"]["Row"];
export type Teacher = Database["public"]["Tables"]["teachers"]["Row"];
export type Term = Database["public"]["Tables"]["terms"]["Row"];
export type Documentation =
  Database["public"]["Tables"]["documentations"]["Row"];

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
