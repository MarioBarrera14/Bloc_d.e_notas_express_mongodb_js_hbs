const usersCtrl = {}
const passport = require('passport')
const User = require('../models/User')
usersCtrl.renderSignunpForm = (req, res) => {
  res.render('users/signup')
}

usersCtrl.signup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden' });
  }
  if (password.length < 4) {
    errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
  }
  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email, password, confirm_password });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'El email ya está en uso');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Usted se registro con exito.");
      res.redirect('/users/signin');
    }
  }
}

usersCtrl.renderSigninpForm = (req, res) => {
  res.render('users/signin')
}

usersCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true
})

usersCtrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error_msg', 'Error al cerrar sesión');
      return res.redirect('/'); // Redirige a donde quieras en caso de error
    }
    req.flash('success_msg', 'Tu sesión fue cerrada');
    res.redirect('/users/signin');
  });
};

module.exports = usersCtrl;