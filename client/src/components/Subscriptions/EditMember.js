/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import utils from '../../utils';

function EditMember() {

    const [member, setMember] = useState("")
    const history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        utils.getMemberById(id)
            .then((data) => setMember(data))
            .catch(err => alert(err))
    }, [])



    const editMember = () => {
        let currentMember = { ...member }
        let obj =
        {
            name: member.name ?? currentMember.name,
            email: member.email ?? currentMember.email,
            city: member.city ?? currentMember.city
        }
        utils.updateMember(id, obj).then(() => {
            alert("Member Updated !!");
            history.goBack()
        }).catch(() => alert("Couldn't Update the Member !!"));



    }


    const cancel = () => {
        history.goBack()
    }



    return (
        <div className="goof">
            <form onSubmit={editMember} >
                <div className="card">
                    <div className="back" >
                        <div className="card:hover .content">
                            <div className="content">
                                <div className="front">
                                    <div className="add">
                                        <br /><br /><br />
                                        <h1 style={{ fontFamily: 'Ariel' }}>Edit Member</h1>
            Name: <input value={member.name} onChange={e => setMember({ ...member, name: e.target.value })} />
                                        <br />
            Email: <input value={member.email} onChange={e => setMember({ ...member, email: e.target.value })} />
                                        <br />
            City: <input value={member.city} onChange={e => setMember({ ...member, city: e.target.value })} />
                                        <br />
                                        <button onClick={() => editMember(member._id)}>Edit</button>
                                        <button onClick={cancel}>cancel</button><br /><br />
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

export default EditMember;