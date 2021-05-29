import React from 'react'
import { useRouteMatch, useHistory, Route, Switch } from 'react-router-dom';
import AllMembers from './AllMembers';
import AddMember from './AddMember';
import EditMember from './EditMember';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        maxWidth: 345,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        avatar: {
            backgroundColor: red[500],
        },
    }
}));


function SubscriptionPage() {

    const classes = useStyles();
    const { path } = useRouteMatch();
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('userData'));



    const handleButton = () => {
        history.push(path + '/add')
    }

    return (

        <div>


            <Switch>
                <Route path={path} exact >
                    <h1 style={{ fontFamily: 'Ariel' }} >All Members</h1>
                    <Box mb={2}>

                        {user.permissions?.includes("View Subscriptions") && <Button variant="contained" color="primary" onClick={() => history.push("/M/members")} className={classes.margin} > 
                            All Members
                        </Button> }

                        {user.permissions?.includes("Create Subscriptions") && <Button variant="contained" color="primary" onClick={handleButton} className={classes.margin} >
                            Add Member
                        </Button> }

                    </Box>
                    <AllMembers />
                </Route>
                <Route path={path + "/add"} component={AddMember} />
                <Route path={path + "/edit/:id"} component={EditMember} />
            </Switch>
        </div>


    )
}

export default SubscriptionPage
