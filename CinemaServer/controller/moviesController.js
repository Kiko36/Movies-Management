const express = require('express');
const movieBL = require('../BL/moviesBL')
const router = express.Router()

router.route('/').get(async (req, resp) => {
    let data = await movieBL.getAllMovies()
    return resp.json(data)
})

router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await movieBL.getById(id);
    return resp.json(data);
});

router.route('/').post(async (req, resp) => {
    let newMovie = req.body;
    let data = await movieBL.addNew(newMovie);
    return resp.json(data);
});

router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let data = await movieBL.updateById(id, req.body);
    return resp.json(data);
});

router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await movieBL.deleteById(id)
    return resp.json(data)
});

router.route('/movieName/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await movieBL.getMovieByName(id);
    return resp.json(data);
});


module.exports = router;