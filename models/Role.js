const {Schema, model} = require('mongoose')

const Role = new Schema({
value: {type: String, unique: true, default: 'USER'},
})

module.exports = model('Role', Role) // export the model that will create as 'Role' based on Role