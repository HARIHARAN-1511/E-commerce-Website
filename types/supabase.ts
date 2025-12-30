export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    category: 'computers' | 'printers' | 'scanners' | 'copiers' | 'surveillance' | 'spare-parts'
                    created_at: string
                    description: string
                    id: string
                    image_url: string
                    images: string[]
                    is_rental: boolean
                    name: string
                    price: number
                    rental_price_monthly: number | null
                    specifications: Json
                    stock_quantity: number
                }
                Insert: {
                    category: 'computers' | 'printers' | 'scanners' | 'copiers' | 'surveillance' | 'spare-parts'
                    created_at?: string
                    description: string
                    id?: string
                    image_url: string
                    images?: string[]
                    is_rental: boolean
                    name: string
                    price: number
                    rental_price_monthly?: number | null
                    specifications?: Json
                    stock_quantity: number
                }
                Update: {
                    category?: 'computers' | 'printers' | 'scanners' | 'copiers' | 'surveillance' | 'spare-parts'
                    created_at?: string
                    description?: string
                    id?: string
                    image_url?: string
                    images?: string[]
                    is_rental?: boolean
                    name?: string
                    price?: number
                    rental_price_monthly?: number | null
                    specifications?: Json
                    stock_quantity?: number
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
