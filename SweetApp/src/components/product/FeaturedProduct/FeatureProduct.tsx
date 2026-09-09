import type { Product } from '../../../type/product';
import './FeaturedProduct.css';

interface FeaturedProductProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export function FeaturedProduct({
    product,
    onAdd,
}: FeaturedProductProps) {
    return (
        <article className="featured-product">
            <div className="featured-product__image-container">

                <img
                    src={product.image}
                    alt={product.name}
                    className="featured-product__image"
                />

                <span className="featured-product__badge">
                    Mais Vendido
                </span>
            </div>

            <div className="featured-product__content">

                <div className="featured-product__info">
                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <span className="featured-product__rating">
                        ★ {product.rating}
                    </span>
                </div>

                <div className="featured-product__price">
                    <strong>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </strong>

                    <button
                        type="button"
                        onClick={() => onAdd(product)}
                    >
                        +
                    </button>
                </div>

            </div>
        </article>
    );
}