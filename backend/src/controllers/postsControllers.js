const { pool, insertPost } = require('../db/config');

// Obtener todos los posts
const getPosts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener posts' });
    }
};

// Agregar un nuevo post
const addPost = async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    try {
        const result = await insertPost(titulo, img, descripcion);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el post' });
    }
};

// Eliminar un post por ID
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json({ message: 'Post eliminado', post: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
};

// Dar "me gusta" a un post (incrementar un campo `likes`)
const likePost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }
        res.json({ message: 'Like agregado', post: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar like al post' });
    }
};

module.exports = { getPosts, addPost, deletePost, likePost };
