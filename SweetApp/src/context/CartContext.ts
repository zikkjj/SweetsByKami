import { createContext } from 'react';
import type { Product } from '../types/product';
import type { CartItem, Order } from '../types/cart';

export type TabType = 'menu' | 'orders' | 'contact' | 'profile';

export interface CartContextType {
    items: CartItem[];
    orders: Order[];
    isCartOpen: boolean;
    activeTab: TabType;
    selectedProductForDetail: Product | null;
    toastMessage: string | null;
    totalCount: number;
    subtotal: number;
    deliveryFee: number;
    total: number;
    addToCart: (product: Product, quantity?: number, notes?: string) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, newQty: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    openProductDetail: (product: Product) => void;
    closeProductDetail: () => void;
    setActiveTab: (tab: TabType) => void;
    createOrder: (paymentMethod: string, address: string) => Order;
    repeatOrder: (order: Order) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
