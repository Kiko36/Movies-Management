/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import utils from '../../utils'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import SubscriptionsWatched from './SubscriptionsWatched'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));




function MovieItem(props) {
    const classes = useStyles();
    const history = useHistory()
    const [showSubs, setShowSubs] = useState(false)
    const user = JSON.parse(localStorage.getItem('userData'));


    const deleteMovie = (id) => {
        
        utils.deleteMovie(id).then(() => {
            alert("Movie Deleted !!");
            window.location.reload()
        }).catch(() => alert("Couldn't Delete the Movie !!"));

    }
    const editMovie = (id) => {

        history.push('/M/movies/edit/' + id)

    }


    return (

        <Box key={props.movie._id} display='flex' flexDirection='column' justifyContent="center" border={1} >
            <h2><strong>{props.movie.name} {new Date(props.movie.premiered).getFullYear()}</strong></h2>

            <img src={props.movie.image}></img>
            <strong>{props.movie.genres?.join(", ")}</strong><br />

           { user.permissions?.includes("View Subscriptions") && <Button onClick={() => setShowSubs(!showSubs)}
                variant="contained"
                color="primary"
                className={classes.button}
                width="25px">
                Show Subs
                    </Button> }

            { user.permissions?.includes("Delete Movies") && <Button onClick={() => deleteMovie(props.movie._id)}
                variant="contained"
                color="secondary"
                className={classes.button}
                width="25px"
                endIcon={<DeleteIcon />}>Delete
                    </Button>
                    }

            {user.permissions?.includes("Update Movies") && <Button onClick={() => editMovie(props.movie._id)}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<EditIcon />}>Edit
                    </Button>}


            {showSubs && <SubscriptionsWatched movieId={props.movie._id} />}

        </Box>
    )
}


export default MovieItem;