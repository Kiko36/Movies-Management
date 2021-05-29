const express = require('express');
const memberBL = require('../BL/membersBL')
const router = express.Router()

router.route('/').get(async (req, resp) => {
    let data = await memberBL.getAllMembers()
    return resp.json(data)
})

router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await memberBL.getById(id);
    return resp.json(data);
});

router.route('/').post(async (req, resp) => {
    let newMember = req.body;
    let data = await memberBL.addNew(newMember);
    return resp.json(data);
});

router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let data = await memberBL.updateById(id, req.body);
    return resp.json(data);
});

router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await memberBL.deleteMemberById(id)
    return resp.json(data)
});

module.exports = router;