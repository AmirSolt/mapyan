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
          body: string | null
          created_at: string | null
          features: string[] | null
          id: number
          key: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          features?: string[] | null
          id?: number
          key: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          features?: string[] | null
          id?: number
          key?: string
        }
        Relationships: []
      }
      product_infos: {
        Row: {
          created_at: string | null
          desc: string
          id: number
          key: string
        }
        Insert: {
          created_at?: string | null
          desc: string
          id?: number
          key: string
        }
        Update: {
          created_at?: string | null
          desc?: string
          id?: number
          key?: string
        }
        Relationships: []
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
