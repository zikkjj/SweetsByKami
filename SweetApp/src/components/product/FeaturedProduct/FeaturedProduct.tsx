import type { Product } from '../../../types/product';
import './FeaturedProduct.css';

interface FeaturedProductProps {
    product: Product;
    onAdd: (product: Product) => void;
    onOpenDetail?: (product: Product) => void;
}

export function FeaturedProduct({
    product,
    onAdd,
    onOpenDetail,
}: FeaturedProductProps) {
    if (!product) return null;

    return (
        <article
            className="featured-product"
            onClick={() => onOpenDetail?.(product)}
        >
            <div className="featured-product__image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="featured-product__image"
                />

                {product.badge && (
                    <span
                        className={`featured-product__badge featured-product__badge--${
                            product.badgeColor || 'pink'
                        }`}
                    >
                        {product.badge}
                    </span>
                )}
            </div>

            <div className="featured-product__content">
                <div className="featured-product__info">
                    <h3 className="featured-product__title">{product.name}</h3>

                    <p className="featured-product__description">
                        {product.description}
                    </p>

                    <div className="featured-product__rating">
                        <span className="featured-product__star">★</span>
                        <strong className="featured-product__rating-val">
                            {product.rating.toFixed(1)}
                        </strong>
                        {product.reviewsCount && (
                            <span className="featured-product__rating-count">
                                ({product.reviewsCount})
                            </span>
                        )}
                    </div>
                </div>

                <div className="featured-product__action">
                    <div className="featured-product__price">
                        <span className="featured-product__currency">R$</span>
                        <span className="featured-product__amount">
                            {product.price.toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="featured-product__btn-add"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(product);
                        }}
                        aria-label={`Adicionar ${product.name} à sacola`}
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    );
}
