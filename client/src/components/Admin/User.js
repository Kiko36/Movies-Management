/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import utils from '../../utils';

function User(props) {
    const [Fname, setFname] = useState(false)
    const [Lname, setLname] = useState(false)
    const [cerateDate, setCreateDate] = useState(false)
    const [username, setUserName] = useState(false)
    const [sessionTO, setSessionTO] = useState(false)
    const [viewSubs, setViewSubs] = useState(false)
    const [createSubs, setCreateSubs] = useState(false)
    const [deleteSubs, setDeleteSubs] = useState(false)
    const [updateSubs, setUpdateSubs] = useState(false)
    const [viewMovies, setViewMovies] = useState(false)
    const [createMovies, setCreateMovies] = useState(false)
    const [deleteMovies, setDeleteMovies] = useState(false)
    const [updateMovie, setUpdateMovie] = useState(false)


    const allUsers = (e) => {
        e.preventDefault(props.id)
        utils.getAll().then(()=>allUsers).catch(err=>alert(err))
    }

    const addUsers = (e) => {
        e.preventDefault(props.id)
    }
    useEffect(() => {


    })

    return (
        <div className="container">
            <h1>Users</h1>
            <input type="button" value="All Users" onClick={()=>allUsers} />
            <input type="button" value="Add Users" onClick={addUsers} /><br /><br />
            First Name: <input type="text" onChange={e => setFname(e.target.value)} /><br />
            Last Name: <input type="text" onChange={e => setLname(e.target.value)} /><br />
            Created Date: <input type="text" onChange={e => setCreateDate(e.target.value)} /><br />
            Username: <input type="text" onChange={e => setUserName(e.target.value)} /><br />
            Session TimeOut: <input type="text" onChange={e => setSessionTO(e.target.value)} /><br />
            <strong>Permissions: </strong><br />
                View Subscriptions <input type="checkbox" onChange={e => setViewSubs(e.target.value)} /><br />
                Create Subscriptions <input type="checkbox" onChange={e => setCreateSubs(e.target.value)} /><br />
                Delete Subscriptions <input type="checkbox" onChange={e => setDeleteSubs(e.target.value)} /><br />
                Update Subscription <input type="checkbox" onChange={e => setUpdateSubs(e.target.value)} /><br />
                View Movies <input type="checkbox" onChange={e => setViewMovies(e.target.value)} /><br />
                Create Movies <input type="checkbox" onChange={e => setCreateMovies(e.target.value)} /><br />
                Delete Movies <input type="checkbox" onChange={e => setDeleteMovies(e.target.value)} /><br />
                Update Movie <input type="checkbox" onChange={e => setUpdateMovie(e.target.value)} /><br />
        </div>
    );
}

export default User;