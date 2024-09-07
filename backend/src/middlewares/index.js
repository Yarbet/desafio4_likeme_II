const morgan = require('morgan');
const cors = require('cors');

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173',
};

// Middlewares exportados individualmente
const logger = morgan('dev');
const corsMiddleware = cors(corsOptions);
const jsonParser = require('express').json();

module.exports = { logger, corsMiddleware, jsonParser };
