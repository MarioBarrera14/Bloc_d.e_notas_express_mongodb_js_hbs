const mongoose = require('mongoose');

require('dotenv').config(); // Carga las variables de entorno de .env


const MONGODB_URI = process.env.MONGODB_URI; // Obtiene la URL de la base de datos desde las variables de entorno

// Conexión a la base de datos MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));
