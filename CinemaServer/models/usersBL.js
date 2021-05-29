const user = require('./usersSchema')

const getAllUsers = () => {
    return new Promise((resolve) => {

        user.find({}, (err, userData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(userData);
            }
        });
    })
}

const getUser = (userId) => {
    return new Promise((resolve, reject) => {
        user.findById(userId, (err, userData) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(userData);
            }
        });
    })
}

const getUserByUserName = (username) => {
    return new Promise((resolve, reject) => {
        user.find({ username }, (err, userData) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(userData[0]);
            }
        });
    })
}

const addUser = (newUser) => {
    return new Promise((resolve) => {
    
        let newUsers = new user({

            username: newUser.username,
            password: newUser.password

        })

        newUsers.save((err, obj) => {
            if (err) {
                console.log(err);
            } else {
                resolve(obj)
            }
        })

    })
}

const updateUser = (userId, updatedUser) => {
    return new Promise((resolve, reject) => {
        let obj = { username: updatedUser.username, password: updatedUser.password }
        for (let key in obj) if (!obj[key]) delete obj[key];
        user.findByIdAndUpdate(userId,obj, 
            (err => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve("User Updated !!")
                }
            }))

    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        user.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("User Deleted !!")
            }
        })
    })
}

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser, getUserByUserName }