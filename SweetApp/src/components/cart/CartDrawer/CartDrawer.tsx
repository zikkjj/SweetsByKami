import { useState } from 'react';
import { useCart } from '../../../context/useCart';
import type { CartItem } from '../../../types/cart';
import './CartDrawer.css';

export function CartDrawer() {
    const {
        items,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        deliveryFee,
        total,
        createOrder,
    } = useCart();

    const [address, setAddress] = useState('Rua das Flores, 45 - Apto 102');
    const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    if (!isCartOpen) return null;

    const freeDeliveryThreshold = 100;
    const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
    const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            createOrder(paymentMethod, address);
            setIsCheckingOut(false);
        }, 600);
    };

    return (
        <div className="cart-backdrop" onClick={closeCart}>
            <aside
                className="cart-drawer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Sacola de compras"
            >
                {/* CABEÇALHO DA SACOLA */}
                <div className="cart-drawer__header">
                    <div className="cart-drawer__title-wrap">
                        <h2>Sua Sacola</h2>
                        <span className="cart-drawer__count">
                            {items.length} {items.length === 1 ? 'item' : 'itens'}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="cart-drawer__close"
                        onClick={closeCart}
                        aria-label="Fechar sacola"
                    >
                        ✕
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-drawer__empty">
                        <div className="cart-drawer__empty-icon">🧁</div>
                        <h3>Sua sacola está vazia</h3>
                        <p>Adicione nossos doces artesanais para adoçar o seu dia!</p>
                        <button
                            type="button"
                            className="cart-drawer__empty-btn"
                            onClick={closeCart}
                        >
                            Ver Cardápio
                        </button>
                    </div>
                ) : (
                    <>
                        {/* BARRA DE FRETE GRÁTIS */}
                        <div className="cart-drawer__free-shipping">
                            {amountToFreeDelivery > 0 ? (
                                <p>
                                    Faltam <strong>R$ {amountToFreeDelivery.toFixed(2).replace('.', ',')}</strong> para <strong>Frete Grátis</strong>!
                                </p>
                            ) : (
                                <p className="cart-drawer__free-shipping--congrats">
                                    🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong>!
                                </p>
                            )}
                            <div className="cart-drawer__progress-bar">
                                <div
                                    className="cart-drawer__progress-fill"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* LISTA DE ITENS */}
                        <div className="cart-drawer__items">
                            {items.map(({ product, quantity }: CartItem) => (
                                <div key={product.id} className="cart-item">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="cart-item__image"
                                    />

                                    <div className="cart-item__info">
                                        <h4 className="cart-item__name">{product.name}</h4>
                                        <span className="cart-item__unit-price">
                                            R$ {product.price.toFixed(2).replace('.', ',')}
                                        </span>

                                        <div className="cart-item__controls">
                                            <button
                                                type="button"
                                                className="cart-item__qty-btn"
                                                onClick={() =>
                                                    updateQuantity(product.id, quantity - 1)
                                                }
                                                aria-label="Diminuir quantidade"
                                            >
                                                −
                                            </button>
                                            <span className="cart-item__qty">{quantity}</span>
                                            <button
                                                type="button"
                                                className="cart-item__qty-btn"
                                                onClick={() =>
                                                    updateQuantity(product.id, quantity + 1)
                                                }
                                                aria-label="Aumentar quantidade"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-item__right">
                                        <span className="cart-item__total-price">
                                            R${' '}
                                            {(product.price * quantity)
                                                .toFixed(2)
                                                .replace('.', ',')}
                                        </span>
                                        <button
                                            type="button"
                                            className="cart-item__remove"
                                            onClick={() => removeFromCart(product.id)}
                                            aria-label={`Remover ${product.name}`}
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* DETALHES DE ENTREGA E PAGAMENTO */}
                        <div className="cart-drawer__details">
                            <div className="cart-drawer__detail-block">
                                <label htmlFor="cart-address">Endereço de Entrega</label>
                                <input
                                    id="cart-address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Seu endereço completo"
                                />
                            </div>

                            <div className="cart-drawer__detail-block">
                                <label>Forma de Pagamento</label>
                                <div className="cart-drawer__payment-options">
                                    {(['Pix', 'Cartão', 'Dinheiro'] as const).map((method) => (
                                        <button
                                            key={method}
                                            type="button"
                                            className={`cart-drawer__pay-btn ${
                                                paymentMethod === method
                                                    ? 'cart-drawer__pay-btn--active'
                                                    : ''
                                            }`}
                                            onClick={() => setPaymentMethod(method)}
                                        >
                                            {method === 'Pix' && '⚡ '}
                                            {method === 'Cartão' && '💳 '}
                                            {method === 'Dinheiro' && '💵 '}
                                            {method}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RESUMO DE VALORES */}
                        <div className="cart-drawer__summary">
                            <div className="cart-drawer__row">
                                <span>Subtotal</span>
                                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                            </div>

                            <div className="cart-drawer__row">
                                <span>Taxa de Entrega</span>
                                <span>
                                    {deliveryFee === 0 ? (
                                        <strong className="free-delivery">Grátis</strong>
                                    ) : (
                                        `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`
                                    )}
                                </span>
                            </div>

                            <div className="cart-drawer__row cart-drawer__row--total">
                                <strong>Total</strong>
                                <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
                            </div>

                            <button
                                type="button"
                                className="cart-drawer__checkout-btn"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? 'Confirmando Pedido...' : 'Confirmar e Fazer Pedido ✨'}
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
