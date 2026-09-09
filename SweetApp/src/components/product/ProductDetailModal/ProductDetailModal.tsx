import { useState } from 'react';
import { useCart } from '../../../context/useCart';
import './ProductDetailModal.css';

export function ProductDetailModal() {
    const { selectedProductForDetail, closeProductDetail, addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    if (!selectedProductForDetail) return null;

    const product = selectedProductForDetail;
    const totalPrice = product.price * quantity;

    const handleAdd = () => {
        addToCart(product, quantity, notes.trim() || undefined);
        closeProductDetail();
        setQuantity(1);
        setNotes('');
    };

    return (
        <div className="product-modal-backdrop" onClick={closeProductDetail}>
            <div
                className="product-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label={`Detalhes de ${product.name}`}
            >
                <div className="product-modal__image-wrapper">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-modal__image"
                    />

                    <button
                        type="button"
                        className="product-modal__close"
                        onClick={closeProductDetail}
                        aria-label="Fechar modal"
                    >
                        ✕
                    </button>

                    {product.badge && (
                        <span
                            className={`product-modal__badge product-modal__badge--${
                                product.badgeColor || 'pink'
                            }`}
                        >
                            {product.badge}
                        </span>
                    )}
                </div>

                <div className="product-modal__content">
                    <div className="product-modal__category">{product.category}</div>
                    <h2 className="product-modal__title">{product.name}</h2>

                    <div className="product-modal__rating-row">
                        <span className="product-modal__star">★</span>
                        <strong>{product.rating.toFixed(1)}</strong>
                        {product.reviewsCount && (
                            <span className="product-modal__reviews">
                                ({product.reviewsCount} avaliações de clientes)
                            </span>
                        )}
                    </div>

                    <p className="product-modal__description">{product.description}</p>

                    <div className="product-modal__tags">
                        <span className="product-modal__tag">🍓 Ingredientes Frescos</span>
                        <span className="product-modal__tag">👩‍🍳 Feito à Mão</span>
                        <span className="product-modal__tag">🎀 Embalagem Especial</span>
                    </div>

                    <div className="product-modal__notes">
                        <label htmlFor="modal-notes">Alguma observação?</label>
                        <input
                            id="modal-notes"
                            type="text"
                            placeholder="Ex: pouco açúcar, escrever nome no cartão..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="product-modal__footer">
                        <div className="product-modal__qty-selector">
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <span>{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className="product-modal__add-btn"
                            onClick={handleAdd}
                        >
                            Adicionar • R$ {totalPrice.toFixed(2).replace('.', ',')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
