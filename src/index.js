const app = require('./server')
require('./database')

// Iniciar servidor
app.listen(app.get('PORT'), () => {
  console.log('Servidor escuchando en el puerto', app.get('PORT'));
});
