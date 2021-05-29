import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import utils from '../../utils'

function AddUser() {
    let history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [sessionTimeout, setSessionTimeout] = useState(0);

    const [permissions, setPermissions] = useState([]);


    const handleForm = (e) => {
        e.preventDefault();
        let obj = {
            firstName,
            lastName,
            username,
            sessionTimeout,
            permissions
        }
        utils.Add(obj).then(() => {
            alert("User Added");
            history.goBack();
        }).catch((err) => alert("Couldn't Add the user!"));

    }

    const handlePermissions = e => {
        if (e.target.checked) {
            setPermissions([...permissions, e.target.name])
        } else {
            setPermissions(permissions.filter(p => p !== e.target.name));
        }
    }

    const cancel = () => {

        history.goBack()
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

                                        <h2>Add new User: </h2>
            First Name: <input required value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)} />
                                        <br />
            Last Name: <input required value={lastName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                        <br />
            Username: <input required value={username}
                                            onChange={(e) => setUsername(e.target.value)} />
                                        <br />
            Session Timeout: <input required value={sessionTimeout}
                                            onChange={(e) => setSessionTimeout(e.target.value)} />
                                        <br />

                                        <strong>permissions: </strong><br />
                View Subscriptions: <input type="checkbox" name="View Subscriptions" onChange={handlePermissions}
                                            checked={permissions.includes("View Subscriptions") || permissions.includes("Update Subscriptions") || permissions.includes("Create Subscriptions") || permissions.includes("Delete Subscriptions")} /><br />

                Update Subscriptions: <input type="checkbox" name="Update Subscriptions" onChange={handlePermissions} checked={permissions.includes("Update Subscriptions")} /><br />
                Create Subscriptions: <input type="checkbox" name="Create Subscriptions" onChange={handlePermissions} checked={permissions.includes("Create Subscriptions")} /><br />
                Delete Subscriptions: <input type="checkbox" name="Delete Subscriptions" onChange={handlePermissions} checked={permissions.includes("Delete Subscriptions")} /><br />
                View Movies: <input type="checkbox" name="View Movies" onChange={handlePermissions}
                                            checked={permissions.includes("View Movies") || permissions.includes("Update Movies") || permissions.includes("Create Movies") || permissions.includes("Delete Movies")} /><br />

                Update Movies: <input type="checkbox" name="Update Movies" onChange={handlePermissions} checked={permissions.includes("Update Movies")} /><br />
                Create Movies: <input type="checkbox" name="Create Movies" onChange={handlePermissions} checked={permissions.includes("Create Movies")} /><br />
                Delete Movies: <input type="checkbox" name="Delete Movies" onChange={handlePermissions} checked={permissions.includes("Delete Movies")} /><br />

                                        <br />
                                        <input type="submit" value="save" />
                                        <button onClick={cancel}>Cancel</button>
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

export default AddUser;