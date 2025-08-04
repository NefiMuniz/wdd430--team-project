-- Categories
INSERT INTO categories (id, name) VALUES
  (1, 'Ceramics'),
  (2, 'Woodwork'),
  (3, 'Textiles'),
  (4, 'Jewelry');

-- Users (artisans, admin, customers)
INSERT INTO users (id, username, email, role, password) VALUES
  (1, 'mary_art', 'mary@artisan.com', 'artisan', '123456'),
  (2, 'john_wood', 'john@artisan.com', 'artisan', '123456'),
  (3, 'jack_job', 'jack@artisan.com', 'artisan', '123456'),
  (4, 'admin_user', 'admin@site.com', 'admin', '123456'),
  (5, 'jhon_rios', 'jhon@customer.com', 'customer', '123456'),
  (6, 'eric_ian', 'eric@customer.com', 'customer', '123456'),
  (7, 'marcus_palmer', 'marcus@customer.com', 'customer', '123456');

-- Artisans profiles linked to users
INSERT INTO artisans (id, user_id, name, bio) VALUES
  (1, 1, 'Mary Art', 'Expert in ceramics'),
  (2, 2, 'John Wood', 'Woodwork specialist'),
  (3, 3, 'Jack Job', 'Textiles and crafts');

-- Products for Mary (artisan_id: 1)
INSERT INTO products (name, description, price, artisan_id, category_id, created_by) VALUES
  ('Ceramic Bowl', 'Handmade bowl with unique glaze', 25.00, 1, 1, 1),
  ('Wooden Spoon Set', 'Set of 3 handcrafted wooden spoons', 15.00, 1, 2, 1),
  ('Cotton Napkins', 'Soft cotton napkins (set of 4)', 20.00, 1, 3, 1),
  ('Beaded Necklace', 'Colorful handmade necklace', 30.00, 1, 4, 1),
  ('Ceramic Mug', 'Hand-thrown ceramic mug', 18.00, 1, 1, 1);

-- Products for John (artisan_id: 2)
INSERT INTO products (name, description, price, artisan_id, category_id, created_by) VALUES
  ('Wooden Cutting Board', 'Durable and food-safe cutting board', 35.00, 2, 2, 2),
  ('Woven Placemat', 'Handwoven table placemat', 10.00, 2, 3, 2),
  ('Silver Ring', 'Minimalist silver ring', 45.00, 2, 4, 2),
  ('Ceramic Vase', 'Rustic ceramic flower vase', 40.00, 2, 1, 2),
  ('Wooden Coasters', 'Set of 4 polished coasters', 12.00, 2, 2, 2);

-- Products for Jack (artisan_id: 3)
INSERT INTO products (name, description, price, artisan_id, category_id, created_by) VALUES
  ('Macrame Wall Hanging', 'Boho macrame decor piece', 50.00, 3, 3, 3),
  ('Gold Earrings', 'Delicate handmade gold earrings', 60.00, 3, 4, 3),
  ('Ceramic Plate', 'Decorative ceramic plate', 22.00, 3, 1, 3),
  ('Wooden Jewelry Box', 'Hand-carved wooden box', 28.00, 3, 2, 3),
  ('Cotton Tote Bag', 'Embroidered cotton tote', 25.00, 3, 3, 3);
