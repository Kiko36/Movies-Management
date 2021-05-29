const jsonfile = require('jsonfile')
const file = "./data/users.json"

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(file)
            .then(obj => resolve(obj))
            .catch(error => reject(error))

    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {

        jsonfile.readFile(file)
            .then(obj => resolve(obj.filter(user => user.id === id)[0]))
            .catch(error => reject(error))

    })
}

const addUser = (newData, id) => {
    return new Promise(async (resolve, reject) => {

        let data = await jsonfile.readFile(file)
        let obj = {
            id: id,
            firstName: newData.firstName ?? "",
            lastName: newData.lastName ?? "",
            createdDate: newData.createdDate ?? "",
            sessionTimeout: newData.sessionTimeout ?? ""

        }
        data.push(obj)

        jsonfile.writeFile(file, data)
            .then(() => resolve(obj))
            .catch(err => reject(err))
    })

}

const updateUser = (id, updatedUser) => {
    return new Promise(async (resolve, reject) => {


        let data = await jsonfile.readFile(file);
        let index = data.findIndex(user => user.id == id);
        let currentPer = data[index];
        let obj = {
            id: id,
            firstName: updatedUser.firstName ? updatedUser.firstName : currentPer.firstName,
            lastName: updatedUser.lastName ? updatedUser.lastName : currentPer.lastName,
            createdDate: updatedUser.createdDate ? updatedUser.createdDate : currentPer.createdDate,
            sessionTimeout: updatedUser.sessionTimeout ? updatedUser.sessionTimeout : currentPer.sessionTimeout
        }

        data.splice(index, 1, obj);

        jsonfile.writeFile(file, data)
            .then(() => resolve("Updated"))
            .catch(err => reject(err))

    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {

        let data = await jsonfile.readFile(file)
        let arr = data.filter(currentPer => currentPer.id !== id);

        jsonfile.writeFile(file, arr)
            .then(() => resolve("deleted"))
            .catch(err => reject(err))

    })
}


module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser }
