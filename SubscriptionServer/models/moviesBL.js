const movie = require('./moviesSchema')
const Subscriptions = require('./subscriptionsSchema')
const getAllMovies = () => {

    return new Promise((resolve) => {
        movie.find({}, (err, movieData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(movieData);
            }
        });
    })
}

const getMovie = (movieId) => {

    return new Promise((resolve, reject) => {
        movie.findById(movieId, (err, movieData) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(movieData);
            }
        });
    })
}

const addMovie = (newMovie) => {

    return new Promise((resolve) => {
        let newMovies = new movie({

            name: newMovie.name,
            genres: newMovie.genres,
            image: newMovie.image,
            premiered: newMovie.premiered
        })

        newMovies.save((err) => {
            if (err) {
                console.log(err);
            }
        })
        resolve("Movie Created !!")
    })
}

const updateMovie = (movieId, updatedData) => {

    return new Promise((resolve, reject) => {
        movie.findByIdAndUpdate(movieId,
            {
                name: updatedData.name,
                genres: updatedData.genres,
                image: updatedData.image,
                premiered: updatedData.premie

            }, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve("Updated Movie !!")
                }
            })
    })
}

const deleteMovie = (id) => {

    return new Promise((resolve, reject) => {
        movie.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                Subscriptions.updateMany({movies: {$elemMatch: {movieId: id}}},{
                       $pull: {movies: {movieId: id}}}, err => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve("Movie Deleted !!")

                        }
                    }
                )
            }
        })
    })
}

const getAllMoviesName = (name) => {

    return new Promise((resolve) => {
        movie.find({ name: name }, (err, movieData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(movieData);
            }
        });
    })
}



module.exports = { getAllMovies, getMovie, addMovie, updateMovie, deleteMovie, getAllMoviesName }