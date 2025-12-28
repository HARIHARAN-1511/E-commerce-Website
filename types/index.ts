export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'computers' | 'printers' | 'scanners' | 'copiers' | 'surveillance' | 'spare-parts';
    image_url: string;
    images?: string[];
    stock_quantity: number;
    specifications?: Record<string, string>;
    is_rental: boolean;
    rental_price_monthly?: number;
    created_at: string;
}

export interface CartItem extends Product {
    quantity: number;
}
