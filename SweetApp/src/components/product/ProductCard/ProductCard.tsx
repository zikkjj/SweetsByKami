import type { Product } from '../../../types/product';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
    onOpenDetail?: (product: Product) => void;
}

export function ProductCard({ product, onAdd, onOpenDetail }: ProductCardProps) {
    const formattedRating =
        Number.isInteger(product.rating)
            ? product.rating.toString()
            : product.rating.toFixed(1);

    return (
        <article
            className="product-card"
            onClick={() => onOpenDetail?.(product)}
        >
            <div className="product-card__image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                />

                {product.badge && (
                    <span
                        className={`product-card__badge product-card__badge--${
                            product.badgeColor || 'pink'
                        }`}
                    >
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="product-card__content">
                <h3 className="product-card__title">{product.name}</h3>

                <div className="product-card__rating">
                    <span className="product-card__star">★</span>
                    <strong className="product-card__rating-val">
                        {formattedRating}
                    </strong>
                    {product.reviewsCount && (
                        <span className="product-card__rating-count">
                            ({product.reviewsCount})
                        </span>
                    )}
                </div>

                <div className="product-card__footer">
                    <strong className="product-card__price">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </strong>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(product);
                        }}
                        className="product-card__add"
                        aria-label={`Adicionar ${product.name} à sacola`}
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}