import { useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/product';
import type { CartItem, Order } from '../types/cart';
import { products } from '../data/products';
import { CartContext, type TabType } from './CartContext';

const INITIAL_ORDERS: Order[] = [
    {
        id: 'LD-9281',
        date: 'Hoje, 14:20',
        items: [
            { product: products[0], quantity: 1 },
            { product: products[2], quantity: 1 },
        ],
        subtotal: 131.9,
        deliveryFee: 0,
        total: 131.9,
        status: 'preparando',
        paymentMethod: 'Pix',
        address: 'Rua das Flores, 45 - Apto 102',
    },
    {
        id: 'LD-8842',
        date: 'Ontem, 16:45',
        items: [
            { product: products[1], quantity: 1 },
        ],
        subtotal: 95.0,
        deliveryFee: 8.0,
        total: 103.0,
        status: 'entregue',
        paymentMethod: 'Cartão de Crédito',
        address: 'Rua das Flores, 45 - Apto 102',
    },
];

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('ladouceur_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [orders, setOrders] = useState<Order[]>(() => {
        try {
            const saved = localStorage.getItem('ladouceur_orders');
            return saved ? JSON.parse(saved) : INITIAL_ORDERS;
        } catch {
            return INITIAL_ORDERS;
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('menu');
    const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem('ladouceur_cart', JSON.stringify(items));
        } catch {
            // ignore
        }
    }, [items]);

    useEffect(() => {
        try {
            localStorage.setItem('ladouceur_orders', JSON.stringify(orders));
        } catch {
            // ignore
        }
    }, [orders]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage((current) => (current === message ? null : current));
        }, 2500);
    };

    const addToCart = (product: Product, quantity = 1, notes?: string) => {
        setItems((prev) => {
            const existingIndex = prev.findIndex((i) => i.product.id === product.id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                    notes: notes || updated[existingIndex].notes,
                };
                return updated;
            }
            return [...prev, { product, quantity, notes }];
        });

        showToast(`"${product.name}" adicionado à sacola! 🛍️`);
    };

    const removeFromCart = (productId: number) => {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
    };

    const updateQuantity = (productId: number, newQty: number) => {
        if (newQty <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity: newQty } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const subtotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const deliveryFee = subtotal > 100 || subtotal === 0 ? 0 : 8.0;
    const total = subtotal + deliveryFee;

    const createOrder = (paymentMethod: string, address: string): Order => {
        const newOrder: Order = {
            id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: 'Agora mesmo',
            items: [...items],
            subtotal,
            deliveryFee,
            total,
            status: 'preparando',
            paymentMethod,
            address,
        };

        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
        setIsCartOpen(false);
        setActiveTab('orders');
        showToast('Pedido realizado com sucesso! 🎉👩‍🍳');
        return newOrder;
    };

    const repeatOrder = (order: Order) => {
        order.items.forEach((item) => {
            addToCart(item.product, item.quantity);
        });
        setIsCartOpen(true);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                orders,
                isCartOpen,
                activeTab,
                selectedProductForDetail,
                toastMessage,
                totalCount,
                subtotal,
                deliveryFee,
                total,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                openCart: () => setIsCartOpen(true),
                closeCart: () => setIsCartOpen(false),
                openProductDetail: (p) => setSelectedProductForDetail(p),
                closeProductDetail: () => setSelectedProductForDetail(null),
                setActiveTab,
                createOrder,
                repeatOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
