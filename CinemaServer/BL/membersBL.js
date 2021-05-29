const axios = require("axios");

const getAllMembers = async () => {
    let resp = await axios.get("https://subscription-heroku.herokuapp.com/members/");
    return resp.data;
};

const getById = async (id) => {
    let resp = await axios.get(`https://subscription-heroku.herokuapp.com/members/${id}`);
    return resp.data;
};

const addNew = async (obj) => {
    let resp = await axios.post("https://subscription-heroku.herokuapp.com/members/", obj);
    return resp.data;
};

const updateById = async (id, obj) => {
    let resp = await axios.put(`https://subscription-heroku.herokuapp.com/members/${id}`, obj);
    return resp.data;
};

const deleteMemberById = async (id) => {
    let resp = await axios.delete(`https://subscription-heroku.herokuapp.com/members/${id}`);
    return resp.data;
};

module.exports = { getAllMembers, getById, addNew, updateById, deleteMemberById };
