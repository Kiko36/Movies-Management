const axios = require('axios');

const getAllUsers = () => {
    return new Promise (async(resolve) => {
        let req = await axios.get("https://jsonplaceholder.typicode.com/users");
        let allUsers = req.data

        let databaseUsers = allUsers.map(user => {
            return {

                firstName: user.firstName,
                lastName: user.lastName,
                createdDate: user.createdDate,
                sessionTimeout: user.sessionTimeout
    
            }
        })
        resolve(databaseUsers) 
    });
}
module.export = { getAllUsers }