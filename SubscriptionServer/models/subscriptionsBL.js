const Subscription = require('./subscriptionsSchema')
const mongoose = require('mongoose');

const getAllSubscriptions = (movieId) => {
    return new Promise((resolve) => {
        const find = movieId && mongoose.Types.ObjectId.isValid(movieId) ? { "movies.movieId": new mongoose.Types.ObjectId(movieId) } : {}
        Subscription.find(find, (err, subscriptionData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(subscriptionData);
            }
        });
    })
}

const getAllSubscriptionsByMember = (memberId) => {
    return new Promise((resolve) => {
        Subscription.find({memberId: memberId}, (err, subscriptionData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(subscriptionData);
            }
        });
    })
}


const getAllSubscriptionsByMovie = (movieId) => {
    return new Promise((resolve) => {
        Subscription.find({"movies.movieId": movieId}, (err, subscriptionData) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(subscriptionData);
            }
        });
    })
}


const getSubscription = (subscriptionId) => {
    return new Promise((resolve, reject) => {
        Subscription.findById(subscriptionId, (err, subscriptionData) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscriptionData);
            }
        });
    })
}

const addSubscription = (newSubscription) => {
    return new Promise((resolve) => {

        let subscription = new Subscription({

            memberId: mongoose.Types.ObjectId(newSubscription.memberId),
            movies: newSubscription.movies
        })

        subscription.save((err) => {
            if (err) {
                console.log(err);
            }
        })
        resolve("Subscription Created !!")
    })
}

const updateSubscription = (subscriptionId, updatedSubscription) => {
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndUpdate(subscriptionId,
            {
                memberId: updatedSubscription.memberId,
                movies: updatedSubscription.movies

            }, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve("Updated Subscription !!")
                }
            })
    })
}

const deleteSubscription = (id) => {
    return new Promise((resolve, reject) => {
        Subscription.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("Subscription Deleted !!")
            }
        })
    })
}

module.exports = { getAllSubscriptions, getSubscription, addSubscription, updateSubscription, deleteSubscription, getAllSubscriptionsByMember, getAllSubscriptionsByMovie }