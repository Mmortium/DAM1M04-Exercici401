DROP DATABASE IF EXISTS minierp_db;
CREATE DATABASE minierp_db;
USE minierp_db;

-- 1. ESTRUCTURA
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    total DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE sale_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT,
    product_id INT,
    qty INT,
    unit_price DECIMAL(10,2),
    line_total DECIMAL(10,2),
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 2. DATOS DE PRODUCTOS
INSERT INTO products (id, name, category, price, stock, active) VALUES
(1, 'Pomes de Girona', 'Alimentació', 2.50, 50, 1),
(2, 'Llet Sencera 1L', 'Alimentació', 1.20, 100, 1),
(3, 'Ratolí Wireless', 'Tecnologia', 15.99, 4, 1),
(4, 'Teclat Mecànic', 'Tecnologia', 45.00, 12, 1),
(5, 'Monitor 24 polzades', 'Tecnologia', 120.50, 8, 1),
(6, 'Formatge de Cabra', 'Alimentació', 8.40, 20, 1),
(7, 'Oli d''Oliva Verge', 'Alimentació', 9.50, 15, 1),
(8, 'Auriculars Bluetooth', 'Tecnologia', 29.90, 2, 1);

-- 3. DATOS DE CLIENTES
INSERT INTO customers (id, name, email, phone) VALUES
(1, 'Joan Garcia', 'joan@email.com', '600111222'),
(2, 'Maria Soler', 'maria@email.com', '611222333'),
(3, 'Pere Pons', 'ppons@email.com', '622333444');

-- 4. DATOS DE VENTAS (Con IDs fijos para evitar errores)
INSERT INTO sales (id, customer_id, payment_method, total) VALUES
(1, 1, 'Targeta', 43.10),
(2, 2, 'Efectiu', 15.99),
(3, 3, 'Bizum', 120.50);

-- 5. DETALLES DE VENTAS
INSERT INTO sale_items (sale_id, product_id, qty, unit_price, line_total) VALUES
(1, 1, 2, 2.50, 5.00),
(1, 7, 4, 9.50, 38.00),
(2, 3, 1, 15.99, 15.99),
(3, 5, 1, 120.50, 120.50);