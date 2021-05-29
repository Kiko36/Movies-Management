/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles/';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import utils from '../../utils';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    }

}));

export default function ManageUsers(props) {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(true)
    const history = useHistory();
    const { url } = useRouteMatch();

    const handleChange = (event) => {
        setSpacing(2(event.target.value));
    };


    useEffect(() => {
        utils.getAll().then(data => setUsers(data))
    }, []);


    const deleteUser = id => {
        utils.Delete(id).then(() => {
            alert("User Deleted !");
            window.location.reload()
        }).catch(() => alert("Couldn't Delete the User"))

    }

    let items = users.map(user => {
        return <Grid item key={user.id}>
            Name: {user.firstName + " " + user.lastName}<br />
                User Name: {user.username}<br />
                Session Time Out(Minutes): {user.sessionTimeout}<br />

            <PopupState variant="popper" popupId="demo-popup-popper">
                {(popupState) => (
                    <div>
                        Permissions:
                        <Button size="small" color="primary" {...bindToggle(popupState)}>
                            Show Permissions
                    </Button>
                        <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography className={classes.typography}>{user.permissions?.join(", ")}</Typography>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </div>
                )}
            </PopupState>

            <br /><br />

            <button onClick={() => history.push("edit/" + user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
        </Grid>
    })


    return (
        <div>
            <input type="button" value="All Users" onClick={() => {
                history.push(url);
                setShowUsers(!showUsers)
            }} />
            <input type="button" value="Add" onClick={() => history.push('add')} />

            <Grid container justify="center" >
                {showUsers && items}
            </Grid>

        </div>
    )
}
