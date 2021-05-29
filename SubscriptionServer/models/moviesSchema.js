const mongoose = require('mongoose')

let MovieSchema = mongoose.Schema
let movie = new MovieSchema({

    name: String,
    genres: [],
    image: String,
    premiered: Date

})

module.exports = mongoose.model('movie', movie)