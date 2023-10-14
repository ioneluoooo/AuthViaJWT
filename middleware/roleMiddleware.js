const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function (req, res, next) {
    return function (req, res, next) {
        if(req.method === 'OPTIONS'){
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1]
            // split like (' ') not ('') bcuz ('' splits into individual characters) 
            // getting the token from the request header
            // authorization is a common header used for sending tokens like JWT
            if(!token) {
                return res.status(400).json({message: 'User is not registerd'})
            }
           const {roles: userRoles} = jwt.verify(token, secret)
           // verifing the token
           // and assumes that the JWT payload contains a 'roles' property
           let hasRole = false
           // initialize a variable, it may be false or true
           userRoles.forEach(role => {
            // iterating through the roles extracted from the user's JWT token
            if(roles.includes(role)) {
                hasRole = true
              // if the roles array contains the current 'role' from the user's token
            }
           });
           if(!hasRole) {
            return res.status(403).json({message: 'Only admins can use this option'})
           }
            
            next()
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: 'User is not registerd'})
        }
    }
}