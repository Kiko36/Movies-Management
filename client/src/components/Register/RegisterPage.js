import React, { useState, useEffect } from 'react'
import utils from '../../utils'
import { useHistory } from 'react-router-dom'
import './RegisterPage.css'

export default function RegisterPage() {

    const [username, setName] = useState('')
    const [password, setPwd] = useState('')
    const [data, setData] = useState([])
    const history = useHistory()

    useEffect(() => {

        const getAll = async () => {
            let data = await utils.getAll(); //Promise
            setData(data)
            //return data;
        }

        getAll();


        //getAll().then(data => setData(data)).catch(err => console.log(err))

    }, [])



    const SubmitForm = async (e) => {

        e.preventDefault()


        let user = data.filter(user => user.username === username)
            //If you try to access without authorization 
        if (user.length === 0) {
            alert('You are not authorized by the Admin !!!')
        }
        else if (password && user[0].password === "") {
            let id = user[0].id;
            await utils.Update(id, { password })
            alert('Your account has been Created !') //You have created an account
            history.push('/')
        }
        else if (user[0].password) {
            alert('You are already Registered')//If you try to register with the same username
            history.push('/')
        }
        else {
            alert('Must have Password')//If you try to over come the system :)
        }

    }
    const GoBack = (e) => {
        e.preventDefault()
        history.goBack('/')
    }

    return (
        <div className="container1">
            <h1 style={{ color: "white" }} >Create Account</h1>
            <form style={{ color: "white" }} onSubmit={SubmitForm}>
                <div className="Register">
                    <div className="a">
                        <div className="hr">
                            <div className="signin">
                                <div className="registerbtn:hover">
                                    <div className="registerbtn">
                                        <div className="input">
                                            User Name: <input type="text" placeholder="Enter your Name" onChange={e => setName(e.target.value)} /><br /><br />
                                        Passwords: <input type="password" placeholder="Enter your Password" onChange={e => setPwd(e.target.value)} /><br /><br />
                                            <button type="submit">Create Account</button>
                                            {/* Submit will refresh our page */}
                                            <button onClick={GoBack} style={{ display: "block" }}>Go Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
