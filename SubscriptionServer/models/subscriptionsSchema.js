const mongoose = require('mongoose')

let SubscriptionSchema = mongoose.Schema
let subscription = new SubscriptionSchema({

    memberId: mongoose.Types.ObjectId,
    movies: [{ movieId: mongoose.Types.ObjectId, date: Date, name: String }]

})

module.exports = mongoose.model('subscriptions', subscription)