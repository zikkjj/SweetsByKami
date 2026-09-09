import { useState } from 'react';

import { Header } from '../../components/layout/Header/Header';
import { BottomNavigation } from '../../components/layout/BottomNavigation/BottomNavigation';
import { FeaturedProduct } from '../../components/product/FeaturedProduct/FeaturedProduct';
import { ProductCard } from '../../components/product/ProductCard/ProductCard';
import { CartDrawer } from '../../components/cart/CartDrawer/CartDrawer';
import { ProductDetailModal } from '../../components/product/ProductDetailModal/ProductDetailModal';

import { Orders } from '../Orders/Orders';
import { Contact } from '../Contact/Contact';
import { Profile } from '../Profile/Profile';

import { products } from '../../data/products';
import { useCart } from '../../context/useCart';

import './Menu.css';

const categories = [
    'Todos',
    'Bolos',
    'Brigadeiros',
    'Copos da Felicidade',
];

export function Menu() {
    const {
        totalCount,
        openCart,
        addToCart,
        openProductDetail,
        toastMessage,
        activeTab,
    } = useCart();

    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    const featuredProduct =
        products.find((p) => p.isFeatured) || products[0];

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === 'Todos' ||
            product.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch =
            searchQuery.trim() === '' ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const gridProducts =
        selectedCategory === 'Todos' && searchQuery.trim() === ''
            ? filteredProducts.filter((p) => p.id !== featuredProduct.id)
            : filteredProducts;

    return (
        <div className="menu-wrapper">
            <div className="menu">
                {/* DYNAMIC ISLAND NA MOLDURA MOBILE */}
                <div className="menu__notch">
                    <div className="menu__dynamic-island">
                        <span className="menu__camera-lens"></span>
                    </div>
                </div>

                {/* TOAST DE FEEDBACK FLUTUANTE */}
                {toastMessage && (
                    <div className="toast-notification" role="status">
                        {toastMessage}
                    </div>
                )}

                {/* CABEÇALHO */}
                <Header
                    cartCount={totalCount}
                    onCartClick={openCart}
                />

                {/* CONTEÚDO DINÂMICO CONFORME ABA SELECIONADA */}
                {activeTab === 'menu' && (
                    <main className="menu__content">
                        {/* BUSCA */}
                        <div className="search">
                            <svg
                                className="search__icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>

                            <input
                                type="text"
                                placeholder="Buscar doces..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    className="search__clear"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Limpar busca"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* CATEGORIAS */}
                        <div className="categories" role="tablist">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    role="tab"
                                    aria-selected={selectedCategory === category}
                                    className={
                                        selectedCategory === category
                                            ? 'category category--active'
                                            : 'category'
                                    }
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* DESTAQUE DO DIA */}
                        {selectedCategory === 'Todos' && searchQuery.trim() === '' && (
                            <section className="menu__section">
                                <h2 className="section-title">DESTAQUE DO DIA</h2>
                                <FeaturedProduct
                                    product={featuredProduct}
                                    onAdd={addToCart}
                                    onOpenDetail={openProductDetail}
                                />
                            </section>
                        )}

                        {/* CARDÁPIO COMPLETO */}
                        <section className="menu__section">
                            <h2 className="section-title">
                                {selectedCategory === 'Todos' && searchQuery.trim() === ''
                                    ? 'CARDÁPIO COMPLETO'
                                    : `PRODUTOS (${gridProducts.length})`}
                            </h2>

                            {gridProducts.length > 0 ? (
                                <div className="product-grid">
                                    {gridProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAdd={addToCart}
                                            onOpenDetail={openProductDetail}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="menu__empty">
                                    <p>Nenhum doce encontrado para sua busca.</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedCategory('Todos');
                                            setSearchQuery('');
                                        }}
                                    >
                                        Limpar filtros
                                    </button>
                                </div>
                            )}
                        </section>
                    </main>
                )}

                {activeTab === 'orders' && <Orders />}
                {activeTab === 'contact' && <Contact />}
                {activeTab === 'profile' && <Profile />}

                {/* MODAL DE DETALHES DO PRODUTO */}
                <ProductDetailModal />

                {/* DRAWER DA SACOLA DE COMPRAS */}
                <CartDrawer />

                {/* BARRA INFERIOR FIXA */}
                <BottomNavigation />
            </div>
        </div>
    );
}