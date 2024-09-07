require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
console.log(process.env)

// Crear la tabla
const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(25) NOT NULL,
                img VARCHAR(1000),
                descripcion VARCHAR(255),
                likes INT DEFAULT 0
            );
        `);
        console.log('Tabla creada o ya existe.');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    }
};

// Inserta datos en la tabla
const insertPost = async (titulo, img, descripcion) => {
    try {
        return await pool.query(`
            INSERT INTO posts (titulo, img, descripcion)
            VALUES ($1, $2, $3) RETURNING *;
        `, [titulo, img, descripcion]);
    } catch (error) {
        console.error('Error al insertar el post:', error);
    }
};

module.exports = {
    pool,
    createTable,
    insertPost
};