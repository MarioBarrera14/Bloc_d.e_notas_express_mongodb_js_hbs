const { Router } = require('express')
const router = Router()

const {
    renderSigninpForm,
    renderSignunpForm, logout,
    signup, signin,} = require('../controllers/users.controller')


router.get('/users/signup', renderSignunpForm)

router.post('/users/signup', signup)

router.get('/users/signin', renderSigninpForm)

router.post('/users/signin', signin)

router.get("/users/logout", logout);

module.exports = router