const express = require('express');
const { getPosts, addPost, deletePost, likePost } = require('../controllers/postsControllers');

const router = express.Router();

// Definir las rutas
router.get('/', getPosts);
router.post('/', addPost); 
router.delete('/:id', deletePost);
router.put('/like/:id', likePost);

module.exports = router;
