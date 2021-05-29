import axios from 'axios';

const getAll = async () => {

    let resp = await axios.get('https://cinema-heroku.herokuapp.com/users')
    let data = resp.data

    return data
}
const getAllMembers = async () => {

    let resp = await axios.get('https://cinema-heroku.herokuapp.com/members')
    let data = resp.data

    return data
}

const getAllMovies = async () => {

    let resp = await axios.get('https://cinema-heroku.herokuapp.com/movies')
    let data = resp.data

    return data
}

const getById = async (id) => {

    let resp = await axios.get(`https://cinema-heroku.herokuapp.com/users/${id}`)
    let data = resp.data

    return data
}
const getMemberById = async (id) => {

    let resp = await axios.get(`https://cinema-heroku.herokuapp.com/members/${id}`)
    let data = resp.data

    return data
}

const getMovieById = async (id) => {

    let resp = await axios.get(`https://cinema-heroku.herokuapp.com/movies/${id}`)
    let data = resp.data

    return data
}

const Add = async (obj) => {

    let resp = await axios.post('https://cinema-heroku.herokuapp.com/users', obj)
    let data = resp.data

    return data
}
const AddSubscription = async (obj) => {

    let resp = await axios.post('https://cinema-heroku.herokuapp.com/subscriptions', obj)
    let data = resp.data

    return data
}

const addMember = async (obj) => {

    let resp = await axios.post('https://cinema-heroku.herokuapp.com/members', obj)
    let data = resp.data

    return data
}

const addMovie = async (obj) => {

    let resp = await axios.post('https://cinema-heroku.herokuapp.com/movies', obj)
    let data = resp.data

    return data
}


const updateMovie = async (id, obj) => {

    let resp = await axios.put(`https://cinema-heroku.herokuapp.com/movies/${id}`, obj)
    let data = resp.data;

    return data
}
const updateMember = async (id, obj) => {

    let resp = await axios.put(`https://cinema-heroku.herokuapp.com/members/${id}`, obj)
    let data = resp.data;

    return data
}

const login = async (obj) => {

    let resp = await axios.post('https://cinema-heroku.herokuapp.com/users/login', obj)
    let data = resp.data

    return data;
}

const Update = async (id, obj) => {

    let resp = await axios.put(`https://cinema-heroku.herokuapp.com/users/${id}`, obj)
    let data = resp.data

    return data
}

const Delete = async (id) => {

    let resp = await axios.delete(`https://cinema-heroku.herokuapp.com/users/${id}`)
    let data = resp.data

    return data
}
const deleteMemberById = async (id) => {

    let resp = await axios.delete(`https://cinema-heroku.herokuapp.com/members/${id}`)
    let data = resp.data

    return data
}

const deleteMovie = async (id) => {

    let resp = await axios.delete(`https://cinema-heroku.herokuapp.com/movies/${id}`)
    let data = resp.data

    return data
}

const getSubsForMovie = async (movieId) => {

    let resp = await axios.get(`https://cinema-heroku.herokuapp.com/subscriptions?movieId=${movieId}`)
    let data = resp.data

    return data
}

const getMovieByName = async (movieId) => {

    let resp = await axios.get(`https://cinema-heroku.herokuapp.com/movies/movieName/${movieId}`)
    let data = resp.data

    return data
}

const getSubsByMemberId = async (memberId) => {

    let resp = await axios.get(`https://cinema-heroku.herokuapp.com/subscriptions/memberId/${memberId}`)
    let data = resp.data

    return data
}

const getAllSubs = async () => {

    const { data } = await axios.get("https://cinema-heroku.herokuapp.com/subscriptions")

    return data
}


const UpdateSubscription = async (id, obj) => {

    let resp = await axios.put(`https://cinema-heroku.herokuapp.com/subscriptions/${id}`, obj)
    let data = resp.data

    return data
}


const actions = { getAllSubs, UpdateSubscription, getSubsByMemberId, getSubsForMovie, getAll, getById, Add, Update, Delete, AddSubscription, getAllMembers, getMemberById, addMember, updateMember, deleteMemberById, getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, login, getMovieByName }
export default actions