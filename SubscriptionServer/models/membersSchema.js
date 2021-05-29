const mongoose = require('mongoose')

let MemberSchema = mongoose.Schema
let member = new MemberSchema({

    name: String,
    email: String,
    city: String

});

module.exports = mongoose.model('members', member)