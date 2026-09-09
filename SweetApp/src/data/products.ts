import type {Product} from './type/Product';

import boloMorango from './assets/images/bolo-de-morango.jpg';
import tortaMorango from './assets/images/bolo-morango.jpg';
import brigadeiro from './assets/images/brigadeiro.jpg';


export const products: Product[] = [
    {
        id: 1,
        name: 'Bolo de Morango',
        description: 'Bolo de morango com frutas frescas.',
        prince: 89.9,
        image: boloMorango,
        rating: 5.0,
    },
    {
        id: 2,
        name: 'Torta de morango',
        description: 'Torta de morango com frutas vermelhas.',
        price: 34.0,
        image: tortaMorango,
        rating: 4.3,
    },
    {
        id: 3,
        name: 'Brigadeiro',
        description: 'Brigadeiro feito com chocolate meio amargo.',
        price: 7.0,
        image: brigadeiro,
        rating: 4.7,
    },
];