export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string | null
          name: string | null
          description: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          name?: string | null
          description?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string | null
          description?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_table_name: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
