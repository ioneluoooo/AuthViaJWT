const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    roles: [{type: String, ref:'Role'}] 
    // every role will refer to Role
    // define the roles as an array 
})

module.exports = model('User', User) // export the model that will create as 'User' based on User
// Creating users model in mongoDb