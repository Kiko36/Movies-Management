/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import manageUsers from './Admin/ManageUsers'
import MoviesHeader from './Movies/MoviesPage'
import SubscriptionsPage from './Subscriptions/SubscriptionsPage'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import AddMember from './Subscriptions/AddMember'
import addMovie from './Movies/AddMovie'
import useSound from 'use-sound';
import Promise from "../assets/sound/Promise.mp3";



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            float: ''
        },
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));



export default function RootPage(props) {

    // const [play, { stop }] = useSound(Promise);
    // const [on, setOn] = useState(false);

    const classes = useStyles();
    const [setValue] = React.useState('1');
    const user = JSON.parse(localStorage.getItem('userData'));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const history = useHistory();
    const { path } = useRouteMatch();


    const Movies = () => {
        history.push(path + "/movies")
    }
    const Subscriptions = () => {
        history.push(path + "/members")
    }
    const UserManagement = () => {
        history.push(path + "/manage/all")
    }
    const LogOut = () => {
        history.push("/")
    }




    let userManagementButton = user.permissions?.includes("Create Subscriptions") ? <Button type="button" variant="contained" color="primary" className={classes.button} onClick={UserManagement} endIcon={<Icon></Icon>}>User Management</Button> : ""
    let moviesButton = user.permissions?.includes("View Movies") ? <Button type="button" variant="contained" color="primary" className={classes.button} onClick={Movies} endIcon={<Icon></Icon>}>Movies</Button> : ""


    return (
        <div className="main">

            <div>
                <div id="logo"><h1>Welcome To My Movie Site</h1></div>
                <div id="hint"></div>
                <h2 style={{ position: "absolute", zIndex: "1", top: "5px", left: "5px", color: "whitesmoke", fontSize: "20px" }} >Welcome {user.username}</h2>
                {/* <button onClick={() => {
                    if (on) {
                        stop();
                    } else {
                        play();
                    }
                    setOn(!on);
                }}>
                    <span role="img" aria-label="trumpet">
                        🎺
                    </span>
                </button> */}

                <div className="button" >


                    {moviesButton}
                    {user.permissions?.includes("View Subscriptions") && <Button type="button" variant="contained" color="primary" className={classes.button} onClick={Subscriptions} endIcon={<Icon></Icon>}>Subscriptions</Button>}
                    {userManagementButton}
                    <Button type="button" variant="contained" color="primary" className={classes.button} onClick={LogOut} endIcon={<Icon></Icon>}>LogOut</Button>
                </div>

                <Switch>

                    <Route path={path} exact />
                    <Route path={path + `/manage`} component={manageUsers} />
                    <Route path={path + `/movies`} component={MoviesHeader} />
                    <Route path={path + `/members`} component={SubscriptionsPage} />

                    <Route path={path + `/members/add`} component={AddMember} />
                    <Route path={path + `/movies/add`} component={addMovie} />

                </Switch>
            </div>
        </div>
    )
}
