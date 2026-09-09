import type { Product } from '../../../type/product';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export function ProductCard({
    product,
    onAdd,
}: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-card__image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                />
            </div>

            <div className="product-card__content">
                <h3>{product.name}</h3>

                <span className="product-card__rating">
                    ★ {product.rating}
                </span>

                <div className="product-card__footer">
                    <strong>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </strong>

                    <button
                        type="button"
                        onClick={() => onAdd(product)}
                        className="product-card__add"
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}