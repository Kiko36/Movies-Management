const express = require('express');
const router = express.Router();
const membersBL = require('../models/membersBL')

router.route('/').get(async (req, resp) => {

    let data = await membersBL.getAllMembers()
    return resp.json(data)

})

router.route('/:id').get(async (req, resp) => {

    let currentId = req.params.id;
    let currentMember = await membersBL.getMember(currentId);
    return resp.json(currentMember);

})

router.route('/').post(async (req, resp) => {

    let newMember = await membersBL.addMember(req.body);
    return resp.json(newMember);

})

router.route('/:id').put(async (req, resp) => {

    let id = req.params.id
    console.log(id)
    let updatedData = req.body;
    let answer = await membersBL.updateMember(id, updatedData);
    return resp.json(answer);

})

router.route('/:id').delete(async (req, resp) => {

    let id = req.params.id;
    let answer = await membersBL.deleteMember(id)
    return resp.json(answer)

})

module.exports = router;
