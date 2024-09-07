const express = require('express');
const { createTable } = require('./db/config');
const postsRoutes = require('./routes/posts');


// Importar los middlewares desde middlewares/index.js
const { logger, corsMiddleware, jsonParser } = require('./middlewares');

const app = express();

// Usar los middlewares individualmente
app.use(logger);
app.use(corsMiddleware);
app.use(jsonParser);

// Crea la tabla al iniciar el servidor


// Rutas
app.use('/posts', postsRoutes);

app.listen (3000, async () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
    await createTable();
});
