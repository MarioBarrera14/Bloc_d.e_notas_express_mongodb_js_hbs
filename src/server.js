const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session');
const flash = require('connect-flash');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const passport = require('passport')
const app = express();
require('./config/passport')


//Midlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'tu_clave_secreta_aqui',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});


app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

app.use(express.static(path.join(__dirname, 'public')))
//configuracion
app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)

}));

app.set('view engine', 'hbs'); // Utiliza app.set() para configurar el motor de vistas

// Middleware para manejar errores 404
app.use((req, res, next) => {
  res.status(404).render('partials/error404'); // Renderiza la vista 'error404.hbs'
});


module.exports = app;