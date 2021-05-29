const mongoose = require('mongoose')

let UsersSchema = mongoose.Schema
let user = new UsersSchema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: ""
    }
    
});

module.exports = mongoose.model('User', user, 'users') 