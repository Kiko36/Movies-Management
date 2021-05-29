import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import utils from '../../utils';

export default function AddMember() {
    const history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")


    const saveMember = (e) => {
        e.preventDefault()

        let obj =
        {
            name,
            email,
            city
        }

        utils.addMember(obj).then(() => {
            alert("Member Added !!");
            history.push("/M/members");
        }).catch((err) => alert(err));

    }

    const cancel = () => {

        history.goBack()
    }



    return (
        <div className="goof">
            <form onSubmit={saveMember} >
                <div className="card">
                    <div className="back" >
                        <div className="card:hover .content">
                            <div className="content">
                                <div className="front">
                                    <div className="add">
                                        <h1 style={{ fontFamily: 'Ariel' }}>Add New Member</h1>
                                        Name: <input required onChange={e => setName(e.target.value)} /><br />
                                        <br />
                                        Email: <input required onChange={e => setEmail(e.target.value)} /><br />
                                        <br />
                                        City: <input required onChange={e => setCity(e.target.value)} />
                                        <br /><br />
                                        <input type="submit" value="save" />
                                        <input type="button" value="cancel" onClick={cancel} />
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
