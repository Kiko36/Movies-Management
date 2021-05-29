const axios = require('axios');

const getAllMembers = () => {
    return new Promise(async (resolve) => {
        let req = await axios.get("https://jsonplaceholder.typicode.com/users");
        let allMembers = req.data

        let databaseMembers = allMembers.map(member => {
            return {
                name: member.name,
                email: member.email,
                city: member.address.city
            }
        })
        resolve(databaseMembers)
    });
}

const getAllMovies = () => {
    return new Promise(async (resolve) => {
        let request = await axios.get("https://api.tvmaze.com/shows");
        let allMovies = request.data

        let databaseMovies = allMovies.map(movie => {
            return {
                name: movie.name,
                genres: movie.genres,
                image: movie.image.medium,
                premiered: movie.premiered
            }
        })
        resolve(databaseMovies)
    });
}

// getAllMembers()
// getAllMovies()

module.exports = { getAllMembers, getAllMovies }