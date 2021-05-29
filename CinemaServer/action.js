const setup = require('./setup')
require('./config/database')

const usersSchema = require('./models/usersSchema')


const action = () => {
    return new Promise (async( resolve, reject) => {
        const users = await setup.getAllUsers()

        users.forEach(async (user) => {
            let newUser = usersSchema(user)
            newUser.save((err) =>{
                if(err) {
                    reject(err)
                }
            })
        });
        resolve("Users Added !!")
    })
}


action();