import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import utils from '../../utils'

function EditUser() {
    let history = useHistory();
    let { id } = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [sessionTimeout, setSessionTimeout] = useState(0);
    const [createdDate, setCreatedDate] = useState("");

    const [permissions, setPermissions] = useState([]);


    useEffect(() =>
        utils.getById(id).then(data => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setUsername(data.username);
            setCreatedDate(new Date(data.createdDate).toLocaleDateString());
            setPermissions(data.permissions);
            setSessionTimeout(data.sessionTimeout);

        }), [id]);

    const handleForm = (e) => {
        e.preventDefault();
        let obj = {
            firstName,
            lastName,
            username,
            sessionTimeout,
            permissions
        }
        utils.Update(id, obj).then(() => {
            alert("User Updated");
            history.goBack();
        }).catch((err) => alert("Couldn't updated the user!"));

    }

    const handlePermissions = e => {
        if (e.target.checked) {
            setPermissions([...permissions, e.target.name])
        } else {
            setPermissions(permissions.filter(p => p !== e.target.name));
        }
    }

    return (
        <div className="goof">
            <form onSubmit={handleForm} >
                <div className="card">
                    <div className="back" >
                        <div className="card:hover .content">
                            <div className="content">
                                <div className="front">
                                    <div className="add">

                                        <h2>Edit User: </h2>
            First Name: <input value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)} />
                                        <br />
            Last Name: <input value={lastName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                        <br />
            Username: <input value={username}
                                            onChange={(e) => setUsername(e.target.value)} />
                                        <br />
            Session Timeout: <input value={sessionTimeout}
                                            onChange={(e) => setSessionTimeout(e.target.value)} />
                                        <br />
            Created Date: {createdDate}
                                        <br />

                                        <strong>permissions: </strong><br />
                View Subscriptions: <input type="checkbox" name="View Subscriptions" onChange={handlePermissions}
                                            checked={permissions.includes("View Subscriptions") || permissions.includes("Update Subscriptions") || permissions.includes("Create Subscriptions") || permissions.includes("Delete Subscriptions")} /> <br />

                Update Subscriptions: <input type="checkbox" name="Update Subscriptions" onChange={handlePermissions} checked={permissions.includes("Update Subscriptions")} />  <br />
                Create Subscriptions: <input type="checkbox" name="Create Subscriptions" onChange={handlePermissions} checked={permissions.includes("Create Subscriptions")} /> <br />
                Delete Subscriptions: <input type="checkbox" name="Delete Subscriptions" onChange={handlePermissions} checked={permissions.includes("Delete Subscriptions")} /> <br />
                View Movies: <input type="checkbox" name="View Movies" onChange={handlePermissions}
                                            checked={permissions.includes("View Movies") || permissions.includes("Update Movies") || permissions.includes("Create Movies") || permissions.includes("Delete Movies")} /> <br />

                Update Movies: <input type="checkbox" name="Update Movies" onChange={handlePermissions} checked={permissions.includes("Update Movies")} />  <br />
                Create Movies: <input type="checkbox" name="Create Movies" onChange={handlePermissions} checked={permissions.includes("Create Movies")} /> <br />
                Delete Movies: <input type="checkbox" name="Delete Movies" onChange={handlePermissions} checked={permissions.includes("Delete Movies")} /> <br />

                                        <br />
                                        <input type="submit" />
                                        <button onClick={(e) => { e.preventDefault(); history.goBack() }}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditUser;