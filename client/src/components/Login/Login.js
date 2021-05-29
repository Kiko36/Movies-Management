/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import './Login.css';
import utils from '../../utils'
import { useHistory, Link } from 'react-router-dom'

export default function Login() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            let data = await utils.login({ username, password })
            if (data.username && data.password) {
                if (username.length > 0 && password.length > 0) {
                    let minutes = data.userData.sessionTimeout
                    //saving user to localStorage:
                    localStorage.setItem('userData', JSON.stringify(data))

                    history.push('/M')
                    const interval = setInterval(() => {
                        alert('Your session is over')
                        history.push('/')
                        clearInterval(interval)
                    }, 1000 * 60 * minutes)
                }
            }
        }

        catch (e) {

            alert('Invalid Data')
            console.log(e)
        }
    }

    return (


        <div className="login">
            <div className="container">
                <div className="login-container-wrapper clearfix" style={{ fontSize: "45px" }} ><strong>Welcome Please Login</strong></div>
                <div className="logo"><i className="fa fa-sign-in"></i>
                </div>
                <div className="welcome"></div>
                <div onSubmit={handleSubmit} className="form-horizontal login-form">
                    <form onSubmit={handleSubmit} action="" method="">
                        <div className="form-group relative">
                            <input
                                id="login_username"
                                //autocomplete="off"
                                className="form-control input-lg"
                                type="text"
                                placeholder="Username"
                                required
                                onChange={e => setUserName(e.target.value)} />
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="form-group relative">
                            <input
                                id="login_password"
                                className="form-control input-lg"
                                type="password"
                                placeholder="Password"
                                required
                                onChange={e => setPassword(e.target.value)} />
                            <i className="fa fa-lock"></i>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg btn-block"
                            >Login</button><br />
                            <br />
                            <strong style={{ color: "white" }}>New User : <Link to="/register">Register Account</Link></strong>
                        </div>
                        <div className="checkbox pull-left"><label>
                        </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
