import type { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
    notes?: string;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: 'preparando' | 'saiu_entrega' | 'entregue';
    paymentMethod: string;
    address: string;
}
