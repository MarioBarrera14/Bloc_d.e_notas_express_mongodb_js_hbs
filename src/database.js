const mongoose = require('mongoose');

require('dotenv').config(); // Carga las variables de entorno de .env


// Cadena de conexión a MongoDB
const uri = 'mongodb+srv://mario22:txbQlJTdn2mOWlMM@cluster0.6u7xir8.mongodb.net/?retryWrites=true&w=majority';

// Conexión a la base de datos
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err.message);
  });