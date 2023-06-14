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
      product: {
        Row: {
          brand: string | null
          cheapest_price: number | null
          created_at: string | null
          id: number
          image_url: string
          key: string
          rating: number | null
          rating_total: number | null
          title: string
        }
        Insert: {
          brand?: string | null
          cheapest_price?: number | null
          created_at?: string | null
          id?: number
          image_url: string
          key: string
          rating?: number | null
          rating_total?: number | null
          title: string
        }
        Update: {
          brand?: string | null
          cheapest_price?: number | null
          created_at?: string | null
          id?: number
          image_url?: string
          key?: string
          rating?: number | null
          rating_total?: number | null
          title?: string
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
      sellers: {
        Row: {
          created_at: string | null
          id: number
          name: string
          price: number | null
          product_id: number | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          price?: number | null
          product_id?: number | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          price?: number | null
          product_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sellers_product_id_fkey"
            columns: ["product_id"]
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
