import type { Product } from '../types/product';

import boloMorango from '../assets/images/bolo-de-morango.jpg';
import boloRedVelvet from '../assets/images/bolo-red-velvet.jpg';
import caixaBrigadeiros from '../assets/images/caixa-brigadeiros.jpg';
import copoFelicidade from '../assets/images/copo-felicidade.jpg';

export const products: Product[] = [
    {
        id: 1,
        name: 'Bolo de Morango',
        description: 'Pão de ló fofinho com recheio de morango...',
        price: 89.9,
        image: boloMorango,
        rating: 4.9,
        reviewsCount: 128,
        badge: 'Mais Vendido',
        badgeColor: 'pink',
        category: 'Bolos',
        isFeatured: true,
    },
    {
        id: 2,
        name: 'Bolo Red Velvet',
        description: 'Massa aveludada com recheio de cream cheese...',
        price: 95.0,
        image: boloRedVelvet,
        rating: 4.8,
        reviewsCount: 94,
        badge: 'Destaque',
        badgeColor: 'gold',
        category: 'Bolos',
    },
    {
        id: 3,
        name: 'Caixa de Brigadeiros',
        description: 'Seleção gourmet com os melhores sabores artesanais.',
        price: 42.0,
        image: caixaBrigadeiros,
        rating: 5.0,
        reviewsCount: 213,
        badge: 'Mais Vendido',
        badgeColor: 'pink',
        category: 'Brigadeiros',
    },
    {
        id: 4,
        name: 'Copo da Felicidade',
        description: 'Camadas generosas de brigadeiro belga, brownie e morango.',
        price: 28.0,
        image: copoFelicidade,
        rating: 4.9,
        reviewsCount: 87,
        badge: 'Destaque',
        badgeColor: 'gold',
        category: 'Copos da Felicidade',
    },
];