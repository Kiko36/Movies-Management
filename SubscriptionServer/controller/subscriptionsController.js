const express = require('express');
const router = express.Router();
const subscriptionsBL = require('../models/subscriptionsBL')
const membersBL = require('../models/membersBL')

router.route('/').get(async (req, resp) => {

    const movieId = req.query.movieId || null
    let currentSubscription = await subscriptionsBL.getAllSubscriptions(movieId)


    const arrayOfMembers = await Promise.all(currentSubscription.map(async (sub) => {
        const member = await membersBL.getMember(sub.memberId)
        console.log(member)
        return { ...sub._doc, memberName: member.name }
    }))



    return resp.json(arrayOfMembers)

})

router.route('/:id').get(async (req, resp) => {

    let currentId = req.params.id;
    let currentSubscription = await subscriptionsBL.getSubscription(currentId);
    return resp.json(currentSubscription);

})

router.route('/').post(async (req, resp) => {

    let newSubscription = await subscriptionsBL.addSubscription(req.body);
    return resp.json(newSubscription);

})

router.route('/:id').put(async (req, resp) => {

    let id = req.params.id
    let updatedSubscription = req.body;
    let answer = await subscriptionsBL.updateSubscription(id, updatedSubscription);
    return resp.json(answer);

})

router.route('/:id').delete(async (req, resp) => {

    let id = req.params.id;
    let answer = await subscriptionsBL.deleteSubscription(id)
    return resp.json(answer)

})

router.route('/memberId/:id').get(async (req, resp) => {

    let currentId = req.params.id;
    let currentSubscription = await subscriptionsBL.getAllSubscriptionsByMember(currentId);
    return resp.json(currentSubscription);

})

router.route('/movieId/:id').get(async (req, resp) => {

    let currentId = req.params.id;
    let currentSubscription = await subscriptionsBL.getAllSubscriptionsByMovie(currentId);
    return resp.json(currentSubscription);

})

module.exports = router;
