const Member = require('./membersSchema')
const subscriptionBL = require('./subscriptionsBL')
const Subscription = require('./subscriptionsSchema')

const getAllMembers = () => {
    return new Promise((resolve) => {
        Member.find({}, (err, memberData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(memberData);
            }
        });
    })
}

const getMember = (memberId) => {
    return new Promise((resolve, reject) => {
        Member.findById(memberId, (err, memberData) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(memberData);
            }
        });
    })
}

const addMember = (newMember) => {
    return new Promise((resolve) => {
        let newMembers = new Member({

            name: newMember.name,
            email: newMember.email,
            city: newMember.city
        })

        newMembers.save(async (err) => {
            if (err) {
                console.log(err);
            } else {
                let obj = { memberId: newMembers._id, movies: [] }
                let resp = await subscriptionBL.addSubscription(obj)
                resolve("Member Created !!")
            }
        })

    })
}

const updateMember = (memberId, updatedData) => {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(memberId,
            {
                name: updatedData.name,
                email: updatedData.email,
                city: updatedData.city

            }, (err => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve("Member Updated !!")
                }
            }))
    })
}

const deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                Subscription.findOneAndDelete({ memberId: id }, (err) => {
                    if (err) {
                        reject(err)
                    } else {

                        resolve("Member Deleted !!")
                    }
                })
            }
        })
    })
}


module.exports = { getAllMembers, getMember, addMember, updateMember, deleteMember }