const jwt = require('jsonwebtoken')
const {secret} = require('../config')
module.exports = function (req,res,next) {
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
        const decodedData = jwt.verify(token, secret)
        // there lays users id and his role
        // contains the payload
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'User is not registerd'})
    }
}