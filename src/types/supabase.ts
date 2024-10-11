export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      areas: {
        Row: {
          area_id: number
          area_name: string
        }
        Insert: {
          area_id?: never
          area_name: string
        }
        Update: {
          area_id?: never
          area_name?: string
        }
        Relationships: []
      }
      criteria: {
        Row: {
          area_id: number
          criteria_id: number
          criteria_name: string
        }
        Insert: {
          area_id: number
          criteria_id?: never
          criteria_name: string
        }
        Update: {
          area_id?: number
          criteria_id?: never
          criteria_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "criteria_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["area_id"]
          },
        ]
      }
      departments: {
        Row: {
          department_id: number
          name: string
          preschool_id: number
        }
        Insert: {
          department_id?: number
          name: string
          preschool_id: number
        }
        Update: {
          department_id?: number
          name?: string
          preschool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "departments_preschool_id_fkey"
            columns: ["preschool_id"]
            isOneToOne: false
            referencedRelation: "preschools"
            referencedColumns: ["preschool_id"]
          },
        ]
      }
      documentation_criteria: {
        Row: {
          criteria_id: number
          documentation_id: number
        }
        Insert: {
          criteria_id: number
          documentation_id: number
        }
        Update: {
          criteria_id?: number
          documentation_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "documentation_criteria_criteria_id_fkey"
            columns: ["criteria_id"]
            isOneToOne: false
            referencedRelation: "criteria"
            referencedColumns: ["criteria_id"]
          },
          {
            foreignKeyName: "documentation_criteria_documentation_id_fkey"
            columns: ["documentation_id"]
            isOneToOne: false
            referencedRelation: "documentations"
            referencedColumns: ["documentation_id"]
          },
        ]
      }
      documentations: {
        Row: {
          created_at: string | null
          department_id: number
          documentation_id: number
          month_id: number
          name: string
          preschool_id: number
          teacher_id: number
          term_id: number
        }
        Insert: {
          created_at?: string | null
          department_id: number
          documentation_id?: never
          month_id: number
          name: string
          preschool_id: number
          teacher_id: number
          term_id: number
        }
        Update: {
          created_at?: string | null
          department_id?: number
          documentation_id?: never
          month_id?: number
          name?: string
          preschool_id?: number
          teacher_id?: number
          term_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "documentations_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
          {
            foreignKeyName: "documentations_month_id_fkey"
            columns: ["month_id"]
            isOneToOne: false
            referencedRelation: "months"
            referencedColumns: ["month_id"]
          },
          {
            foreignKeyName: "documentations_preschool_id_fkey"
            columns: ["preschool_id"]
            isOneToOne: false
            referencedRelation: "preschools"
            referencedColumns: ["preschool_id"]
          },
          {
            foreignKeyName: "documentations_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
          {
            foreignKeyName: "documentations_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "terms"
            referencedColumns: ["term_id"]
          },
        ]
      }
      months: {
        Row: {
          month_id: number
          month_name: string | null
        }
        Insert: {
          month_id?: never
          month_name?: string | null
        }
        Update: {
          month_id?: never
          month_name?: string | null
        }
        Relationships: []
      }
      preschools: {
        Row: {
          name: string
          preschool_id: number
        }
        Insert: {
          name: string
          preschool_id?: number
        }
        Update: {
          name?: string
          preschool_id?: number
        }
        Relationships: []
      }
      students: {
        Row: {
          birth_year: number | null
          documentation_id: number | null
          first_name: string
          school_id: number | null
          student_id: number
        }
        Insert: {
          birth_year?: number | null
          documentation_id?: number | null
          first_name: string
          school_id?: number | null
          student_id?: never
        }
        Update: {
          birth_year?: number | null
          documentation_id?: number | null
          first_name?: string
          school_id?: number | null
          student_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "students_documentation_id_fkey"
            columns: ["documentation_id"]
            isOneToOne: false
            referencedRelation: "documentations"
            referencedColumns: ["documentation_id"]
          },
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "preschools"
            referencedColumns: ["preschool_id"]
          },
        ]
      }
      teachers: {
        Row: {
          department_id: number
          name: string
          preschool_id: number
          teacher_id: number
        }
        Insert: {
          department_id: number
          name: string
          preschool_id: number
          teacher_id?: never
        }
        Update: {
          department_id?: number
          name?: string
          preschool_id?: number
          teacher_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "teachers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
          {
            foreignKeyName: "teachers_preschool_id_fkey"
            columns: ["preschool_id"]
            isOneToOne: false
            referencedRelation: "preschools"
            referencedColumns: ["preschool_id"]
          },
        ]
      }
      terms: {
        Row: {
          term_id: number
          term_name: string | null
        }
        Insert: {
          term_id?: never
          term_name?: string | null
        }
        Update: {
          term_id?: never
          term_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
