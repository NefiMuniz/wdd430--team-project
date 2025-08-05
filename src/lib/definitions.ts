export type Artisan = {
    name: string;
    bio: string;
    imageUrl: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    artisan_id: number;
    category_id: number;
    created_by: number;
};