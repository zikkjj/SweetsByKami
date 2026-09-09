import { useState } from 'react';

import { Header } from '../../components/layout/Header/Header';
import { FeaturedProduct } from '../../components/product/FeaturedProduct/FeaturedProduct';
import { ProductCard } from '../../components/product/ProductCard/ProductCard';

import { products } from '../../data/products';

import type { Product } from '../../type/product';

import './Menu.css';

const categories = [
    'Todos',
    'Bolos',
    'Brigadeiros',
    'Copos da Felicidade',
];

export function Menu() {
    const [selectedCategory, setSelectedCategory] =
        useState('Todos');

    function handleAddProduct(product: Product) {
        console.log('Produto adicionado:', product);
    }

    const featuredProduct = products[0];

    const filteredProducts = products.filter(
        (product) => {
            if (selectedCategory === 'Todos') {
                return true;
            }

            return product.name
                .toLowerCase()
                .includes(
                    selectedCategory.toLowerCase()
                );
        }
    );

    return (
        <div className="menu">

            <Header />

            <main className="menu__content">

                {/* BUSCA */}
                <div className="search">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Buscar doces..."
                    />
                </div>

                {/* CATEGORIAS */}
                <div className="categories">

                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={
                                selectedCategory === category
                                    ? 'category category--active'
                                    : 'category'
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >
                            {category}
                        </button>
                    ))}

                </div>

                {/* DESTAQUE */}
                <section>
                    <h2 className="section-title">
                        DESTAQUE DO DIA
                    </h2>

                    <FeaturedProduct
                        product={featuredProduct}
                        onAdd={handleAddProduct}
                    />
                </section>

                {/* CARDÁPIO */}
                <section>
                    <h2 className="section-title">
                        CARDÁPIO COMPLETO
                    </h2>

                    <div className="product-grid">

                        {filteredProducts
                            .slice(1)
                            .map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={handleAddProduct}
                                />
                            ))}

                    </div>
                </section>

            </main>

        </div>
    );
}