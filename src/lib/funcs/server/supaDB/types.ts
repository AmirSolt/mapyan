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
      comparison: {
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
      product: {
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
      productInfo: {
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
            foreignKeyName: "productInfo_id_fkey"
            columns: ["id"]
            referencedRelation: "product"
            referencedColumns: ["id"]
          }
        ]
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
