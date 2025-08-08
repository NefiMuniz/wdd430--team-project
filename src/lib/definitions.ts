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
    image_url: string;
    artisan_id: number;
    category_id: number;
    created_by: number;
};

/* export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string; //'artisan', 'admin', 'customer'
}; */

export type Review = {
    id: number;
    product_id: number;
    user_id: number;
    rating: number; // 1 to 5
    comment: string;
    created_at: Date;
};

export type Category = {
    id: number;
    name: string;
    description: string;
};

export type ProductField = {
    id: number;
    name: number;
};