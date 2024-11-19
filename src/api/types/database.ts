import { Database } from "@/types/supabase";

type DbTables = Database["public"]["Tables"];

export type Tables = {
  [K in keyof DbTables]: {
    Row: DbTables[K]["Row"];
    Insert: DbTables[K]["Insert"];
    Update: DbTables[K]["Update"];
  };
};

export type TableName = keyof Tables;
export type DbInsert<T extends TableName> = Tables[T]["Insert"];
export type DbRow<T extends TableName> = Tables[T]["Row"];
