const express = require('express');
const router = express.Router();
const usersBL = require('../models/usersBL')
const permissionBL = require('../models/permissionBL')
const userJsonBL = require('../models/userJsonBL')



router.route('/').get(async (req, resp) => {
    let usersFromDB = await usersBL.getAllUsers()
    let usersPermissionsFromFile = await permissionBL.getAllPermissions()
    let usersFromFile = await userJsonBL.getAllUsers()



    const users = usersFromDB.map((user) => {

        console.log(user)
        const userPermissions = usersPermissionsFromFile.find(user2 => {

            if (user._id.toString() === user2.id) {

                return true
            }
            return false
        })


        const userFromFile = usersFromFile.find(user3 => {
            if (user._id.toString() === user3.id) {
                return true
            }
            return false

        })

        return {
            id: user._id,
            username: user.username,
            password: user.password,
            permissions: userPermissions ? userPermissions.permissions : [],
            firstName: userFromFile ? userFromFile.firstName : '',
            lastName: userFromFile ? userFromFile.lastName : '',
            createdDate: userFromFile ? userFromFile.createdDate : '',
            sessionTimeout: userFromFile ? userFromFile.sessionTimeout : '',
        }

    })
    return resp.json(users)

})

router.route('/:id').get(async (req, resp) => {

    try {
        let currentId = req.params.id;
        let currentUser = await usersBL.getUser(currentId);
        let data2 = await permissionBL.getPermissionsById(currentId)
        let data3 = await userJsonBL.getUserById(currentId);


        let obj = {

            id: currentId,
            username: currentUser.username,
            password: currentUser.password,
            permissions: data2.permissions,
            firstName: data3.firstName,
            lastName: data3.lastName,
            createdDate: data3.createdDate,
            sessionTimeout: data3.sessionTimeout
        }
        return resp.json(obj);
    }
    catch {

        return resp.json('invalid ID');
    }

})

router.route('/').post(async (req, resp) => {
    let newUser = await usersBL.addUser(req.body);
    let newPermission = await permissionBL.addPermissions(req.body, newUser._id);
    let data3 = await userJsonBL.addUser(req.body, newUser._id);

    let obj = {
        id: newUser._id,
        username: newUser.username,
        password: newUser.password,
        permissions: newPermission.permissions,
        firstName: data3.firstName,
        lastName: data3.lastName,
        createdDate: data3.createdDate,
        sessionTimeout: data3.sessionTimeout
    }
    return resp.json(obj);
})

router.route('/:id').put(async (req, resp) => {

    let id = req.params.id
    let updatedUser = req.body;
    await usersBL.updateUser(id, updatedUser);
    await permissionBL.updatePermissions(id, updatedUser);
    await userJsonBL.updateUser(id, updatedUser);
    return resp.json({ obj: "updated" });
})

router.route('/:id').delete(async (req, resp) => {

    let id = req.params.id;
    let answer = await usersBL.deleteUser(id)
    await permissionBL.deletePermissions(id)
    await userJsonBL.deleteUser(id)
    return resp.json(answer)

})

router.route('/login').post(async (req, resp) => {

    let username = req.body.username;
    let password = req.body.password;
    try {
        
        let currentUser = await usersBL.getUserByUserName(username);
        if (currentUser.password == password && currentUser.password.length > 0) {
            let permissions = await permissionBL.getPermissionsById(currentUser._id.toString());
            let userData = await userJsonBL.getUserById(currentUser._id.toString());
            return resp.json({...currentUser._doc, permissions: permissions.permissions, userData: userData});
        }
        return resp.json("Invalid Password")

    }
    catch (err) {
        return resp.sendStatus(500)
    }

})

module.exports = router;
