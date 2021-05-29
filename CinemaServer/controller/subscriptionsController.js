const express = require('express');
const subscriptionsBL = require('../BL/subscriptionsBL')
const router = express.Router()

router.route('/').get(async (req, resp) => {

    const movieId = req.query.movieId || null
    let data = await subscriptionsBL.getAllSubscriptions(movieId)
    return resp.json(data)
})

router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsBL.getById(id);
    return resp.json(data);
});

router.route('/').post(async (req, resp) => {
    let newSubs = req.body;
    let data = await subscriptionsBL.addNew(newSubs);
    return resp.json(data);
});

router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsBL.updateById(id, req.body);
    return resp.json(data);
});

router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsBL.deleteById(id)
    return resp.json(data)
});

router.route('/memberId/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsBL.getMemberById(id);
    return resp.json(data);
});

router.route('/movieId/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await subscriptionsBL.getMovieById(id);
    return resp.json(data);
});

module.exports = router;