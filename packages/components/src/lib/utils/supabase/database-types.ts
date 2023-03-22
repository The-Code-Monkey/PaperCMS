export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      [x: string]: {
        Row: Record<string, string | number | null>;
        Insert: Record<string, string | number | null>;
        Update: Record<string, string | number | null>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_all_table_name: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      get_table_fields: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      get_auth_code: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
