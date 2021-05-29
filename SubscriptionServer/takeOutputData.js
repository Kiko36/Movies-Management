const takeInputData = require('./takeInputData')
require('./config/database')

const membersSchema = require('./models/membersSchema')
const moviesSchema = require('./models/moviesSchema')


const takeOutputDataMembers = () => {
    return new Promise(async (resolve, reject) => {
        const Members = await takeInputData.getAllMembers()

        Members.forEach(async (member) => {
            let newMember = membersSchema(member)
            newMember.save((err) => {
                if (err) {
                    reject(err)
                }
            })
        });
        resolve("Members added !!")
    })
}

const takeOutputDataMovies = () => {
    return new Promise(async (resolve, reject) => {
        const Movies = await takeInputData.getAllMovies()

        Movies.forEach(async (movie) => {
            let newMovie = moviesSchema(movie)
            newMovie.save((err) => {
                if (err) {
                    reject(err)
                }
            })
        });
        resolve("Movies added !!")
    })
}

// takeOutputDataMembers()
// takeOutputDataMovies().then(data => console.log(data)).catch(err => console.log("error"))
// exports.modules = { takeOutputDataMembers, takeOutputDataMovies }