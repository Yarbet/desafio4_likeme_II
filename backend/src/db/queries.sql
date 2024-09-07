-- Active: 1721019939146@@127.0.0.1@5432@likeme_2
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    img VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT DEFAULT 0
);