export type Database = {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    price: number
                    category: string
                    image_url: string | null
                    stock_quantity: number
                    is_rental: boolean
                    rental_price_monthly: number | null
                    created_at: string
                }
            }
        }
    }
}
