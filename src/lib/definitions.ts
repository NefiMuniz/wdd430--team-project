export type Artisan = {
    id: number;
    name: string;
    bio: string;
    profile_image_url: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    artisan_id: number;
    category_id: number;
    created_by: number;
    image_url: string | null;
};