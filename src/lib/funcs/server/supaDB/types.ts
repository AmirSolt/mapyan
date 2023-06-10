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
      comparisons: {
        Row: {
          body: string
          created_at: string | null
          features: string[]
          id: number
          key: string
        }
        Insert: {
          body: string
          created_at?: string | null
          features: string[]
          id?: number
          key: string
        }
        Update: {
          body?: string
          created_at?: string | null
          features?: string[]
          id?: number
          key?: string
        }
        Relationships: []
      }
      product_infos: {
        Row: {
          created_at: string | null
          description: string
          id: number
          key: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          key: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          key?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_infos_id_fkey"
            columns: ["id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand: string | null
          created_at: string | null
          id: number
          image_url: string
          key: string
          price: number | null
          rating: number | null
          title: string
          url: string | null
        }
        Insert: {
          brand?: string | null
          created_at?: string | null
          id?: number
          image_url: string
          key: string
          price?: number | null
          rating?: number | null
          title: string
          url?: string | null
        }
        Update: {
          brand?: string | null
          created_at?: string | null
          id?: number
          image_url?: string
          key?: string
          price?: number | null
          rating?: number | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_comparison_page_data: {
        Args: {
          comparisonkey: string
          asins: string[]
        }
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
