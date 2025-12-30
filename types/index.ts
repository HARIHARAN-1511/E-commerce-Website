export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'computers' | 'printers' | 'scanners' | 'copiers' | 'surveillance' | 'spare-parts';
    image_url: string;
    images?: string[] | null;
    stock_quantity: number;
    specifications?: any;
    is_rental: boolean;
    rental_price_monthly?: number | null;
    created_at: string;
}

export interface CartItem extends Product {
    quantity: number;
}
