import { useCart } from '../../context/useCart';
import type { Order, CartItem } from '../../types/cart';
import './Orders.css';

export function Orders() {
    const { orders, repeatOrder, setActiveTab } = useCart();

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'preparando':
                return <span className="order-status order-status--preparing">👩‍🍳 Preparando</span>;
            case 'saiu_entrega':
                return <span className="order-status order-status--delivering">🛵 A caminho</span>;
            case 'entregue':
                return <span className="order-status order-status--delivered">✨ Entregue</span>;
            default:
                return null;
        }
    };

    return (
        <div className="orders-page">
            <div className="orders-page__header">
                <h2>Meus Pedidos</h2>
                <p>Acompanhe o status e histórico de delícias</p>
            </div>

            {orders.length === 0 ? (
                <div className="orders-empty">
                    <div className="orders-empty__icon">🧾</div>
                    <h3>Nenhum pedido recente</h3>
                    <p>Quando você pedir seus doces, poderá acompanhar tudo por aqui!</p>
                    <button
                        type="button"
                        className="orders-empty__btn"
                        onClick={() => setActiveTab('menu')}
                    >
                        Ver Cardápio
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order: Order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-card__header">
                                <div>
                                    <span className="order-card__id">#{order.id}</span>
                                    <span className="order-card__date">{order.date}</span>
                                </div>
                                {getStatusBadge(order.status)}
                            </div>

                            <div className="order-card__items">
                                {order.items.map((item: CartItem, idx: number) => (
                                    <div key={idx} className="order-card__item-row">
                                        <span className="order-card__item-qty">
                                            {item.quantity}x
                                        </span>
                                        <span className="order-card__item-name">
                                            {item.product.name}
                                        </span>
                                        <span className="order-card__item-price">
                                            R${' '}
                                            {(item.product.price * item.quantity)
                                                .toFixed(2)
                                                .replace('.', ',')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-card__footer">
                                <div className="order-card__total-wrap">
                                    <span>Total com entrega:</span>
                                    <strong>
                                        R$ {order.total.toFixed(2).replace('.', ',')}
                                    </strong>
                                </div>

                                <button
                                    type="button"
                                    className="order-card__repeat-btn"
                                    onClick={() => repeatOrder(order)}
                                >
                                    Pedir Novamente
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
