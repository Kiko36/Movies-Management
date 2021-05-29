const jsonfile = require('jsonfile')
const file = "./data/permissions.json"

const getAllPermissions = () => {
    return new Promise((resolve, reject) => {

        jsonfile.readFile(file)
            .then(obj => resolve(obj))
            .catch(error => reject(error))
    })
}

const getPermissionsById = (id) => {
    return new Promise((resolve, reject) => {

        jsonfile.readFile(file)
            .then(obj => resolve(obj.filter(permission => permission.id === id)[0]))
            .catch(error => reject(error))
    })
}

const addPermissions = (newData, id) => {
    return new Promise(async (resolve, reject) => {

        let data = await jsonfile.readFile(file)
        let obj = { id: id, permissions: newData.permissions ?? []}
        data.push(obj)

        jsonfile.writeFile(file, data)
            .then(() => resolve(obj))
            .catch(err => reject(err))
    })

}

const updatePermissions = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {


        let data = await jsonfile.readFile(file);
        let index = data.findIndex(user => user.id == id);
        let currentPer = data[index];
        let obj = {
            id: id,
            permissions: updatedData.permissions ? updatedData.permissions : currentPer.permissions,

        }

        data.splice(index, 1, obj);

        jsonfile.writeFile(file, data)
            .then(() => resolve("Updated"))
            .catch(err => reject(err))

    })
}
const deletePermissions = (id) => {
    return new Promise(async (resolve, reject) => {

        let data = await jsonfile.readFile(file)
        let arr = data.filter(currentPer => currentPer.id !== id);

        jsonfile.writeFile(file, arr)
            .then(() => resolve("deleted"))
            .catch(err => reject(err))

    })
}


module.exports = { getAllPermissions, getPermissionsById, addPermissions, updatePermissions, deletePermissions }
