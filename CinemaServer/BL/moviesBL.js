const axios = require("axios");

const getAllMovies = async () => {
    let resp = await axios.get("https://subscription-heroku.herokuapp.com/movies");
    return resp.data;
};

const getById = async (id) => {
    let resp = await axios.get(`https://subscription-heroku.herokuapp.com/movies/${id}`);
    return resp.data;
};

const addNew = async (obj) => {
    let resp = await axios.post("https://subscription-heroku.herokuapp.com/movies", obj);
    return resp.data;
};

const updateById = async (id, obj) => {
    let resp = await axios.put(`https://subscription-heroku.herokuapp.com/movies/${id}`, obj);
    return resp.data;
};

const deleteById = async (id) => {
    let resp = await axios.delete(`https://subscription-heroku.herokuapp.com/movies/${id}`);
    return resp.data;
};

const getMovieByName = async (id) => {
    let resp = await axios.get(`https://subscription-heroku.herokuapp.com/movies/movieName/${id}`);
    return resp.data;
};




module.exports = { getAllMovies, getById, addNew, updateById, deleteById, getMovieByName };
