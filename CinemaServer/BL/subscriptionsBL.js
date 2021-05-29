const axios = require('axios')

const getAllSubscriptions = async (movieId) => {
    let resp = await axios.get("https://subscription-heroku.herokuapp.com/subscriptions", { params: { movieId } });
    return resp.data;
};

const getById = async (id) => {
    let resp = await axios.get(`https://subscription-heroku.herokuapp.com/subscriptions/${id}`);
    return resp.data;
};

const addNew = async (obj) => {
    let resp = await axios.post("https://subscription-heroku.herokuapp.com/subscriptions", obj);
    return resp.data;
};

const updateById = async (id, obj) => {
    let resp = await axios.put(`https://subscription-heroku.herokuapp.com/subscriptions/${id}`, obj);
    return resp.data;
};

const deleteById = async (id) => {
    let resp = await axios.delete(`https://subscription-heroku.herokuapp.com/subscriptions/${id}`);
    return resp.data;
};

const getMovieById = async (id) => {
    let resp = await axios.get(`https://subscription-heroku.herokuapp.com/subscriptions/movieId/${id}`);
    return resp.data;
};

const getMemberById = async (id) => {
    let resp = await axios.get(`https://subscription-heroku.herokuapp.com/subscriptions/memberId/${id}`);
    return resp.data;
};


module.exports = { getAllSubscriptions, getById, addNew, updateById, deleteById, getMovieById, getMemberById };

