-- Create Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('computers', 'printers', 'scanners', 'copiers', 'surveillance', 'spare-parts')),
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  specifications JSONB,
  is_rental BOOLEAN DEFAULT FALSE,
  rental_price_monthly DECIMAL(12, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Insert sample data
INSERT INTO products (name, description, price, category, image_url, is_rental, rental_price_monthly)
VALUES 
('HP LaserJet Pro', 'High-speed laser printer for office use.', 450.00, 'printers', '/hp-printer.jpg', true, 45.00),
('Dell XPS 15', 'Powerful laptop for creative professionals.', 1800.00, 'computers', '/dell-xps.jpg', true, 200.00),
('Epson Scanner', 'High-resolution document scanner.', 300.00, 'scanners', '/epson-scanner.jpg', true, 30.00);
