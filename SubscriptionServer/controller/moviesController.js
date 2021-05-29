const express = require('express');
const router = express.Router();
const moviesBL = require('../models/moviesBL')

router.route('/').get(async (req, resp) => {

    let data = await moviesBL.getAllMovies()
    return resp.json(data)

})

router.route('/:id').get(async (req, resp) => {

    let currentId = req.params.id;
    let currentMovie = await moviesBL.getMovie(currentId);
    return resp.json(currentMovie);
})

router.route('/').post(async (req, resp) => {

    let newMovie = await moviesBL.addMovie(req.body)
    return resp.json(newMovie);

})

router.route('/:id').put(async (req, resp) => {

    let id = req.params.id
    let updatedData = req.body;
    let answer = await moviesBL.updateMovie(id, updatedData);
    return resp.json(answer);

})

router.route('/:id').delete(async (req, resp) => {

    let id = req.params.id;
    let answer = await moviesBL.deleteMovie(id)
    return resp.json(answer)

})

router.route('/movieName/:id').get(async (req, resp) => {

    let currentId = req.params.id;
    let currentMovie = await moviesBL.getAllMoviesName(currentId);
    return resp.json(currentMovie);

})

module.exports = router;
