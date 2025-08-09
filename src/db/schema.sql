CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE public.artisans (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES public.users(id),
  name TEXT,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  artisan_id INT REFERENCES public.artisans(id),
  category_id INT REFERENCES public.categories(id),
  name TEXT,
  description TEXT,
  price DECIMAL,
  image_url TEXT,
  created_by INT REFERENCES public.users(id),
  last_edited_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false
);

CREATE TABLE public.reviews (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES public.products(id),
  user_id INT REFERENCES public.users(id),
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  is_deleted BOOLEAN DEFAULT false
);
