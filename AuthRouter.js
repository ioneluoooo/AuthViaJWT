const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be 4-10 characters').isLength({min:4,max:10})
    // express validator, checking the username and the password
], controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, roleMiddleware(['USER']), controller.getUsers)
// setting the middlewares


module.exports = router

// In this file we are setting the router through our server and links and the methods we are using and middlewares too
