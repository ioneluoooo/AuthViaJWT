const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs') // hashing the password using bcrypt
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('./config') // the secret key 

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController { // req - request, res - response
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Register error(validation)' })
            }
            // validating the request as we did in the AuthRouter
            const { username, password } = req.body
             // destructurizatia
            const candidate = await User.findOne({ username })
            // find users that already have the username
            if (candidate) {
                return res.status(400).json({ message: 'Name error' })
                // if there are users with the same name, get an error
            }
            const hashedPassword = bcrypt.hashSync(password, 7)
            // '7' is given to hash the password 7 times in a row
            // hashed the password using bcrypt
            const userRole = await Role.findOne({ value: 'USER' })
            // giving the user a role, default : 'USER'
            const user = new User({ username, password: hashedPassword, roles: [userRole.value] })
            // creating a user
            await user.save()
            // saving the user in our database
            return res.json({ message: 'User registered' })

            // **** TRY REQUESTING THROUGH POSTMAN or through browser **** POST our URL then  Body,raw,JSON// 
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Regis error' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            // destructurizatia
            const user = await User.findOne({ username })
            // finding the username
            if (!user) {
                // if there is not a username like this registered then
                return res.status(400).json({ message: 'Did not find this username' })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            // checking if the password we are getting is in the db
            // compare our password with the hashed one in our db
            if (!validPassword) {
                // if the password is not in the database then 
                return res.status(400).json({ message: 'The password is not right' })
            }
            const token = generateAccessToken(user._id, user.roles)
            // generating the token
            // passing the id and the role to the function
            // ._id is generated automatically by mongogb and is imutable
            return res.json({ token })
            // returning the token as a response to the client

            // **** LOGIN REQUEST THROUGH POSTMAN **** to check the token //

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            {/* Creating ROLES in the database */ }
            // const userRole = new Role()
            // const adminRole = new Role({ value: 'ADMIN' })
            // await userRole.save()
            // await adminRole.save()
            // we can delete the code as the roles are stored in db
            {/* */ }
            const users = await User.find()
            res.json(users)
        } catch (error) {

        }
    }
}

module.exports = new authController()

// There we are controlling all the processes ( login, register and users list )
