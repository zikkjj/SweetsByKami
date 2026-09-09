export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviewsCount?: number;
    image: string;
    badge?: string;
    badgeColor?: 'pink' | 'gold';
    category: string;
    isFeatured?: boolean;
}