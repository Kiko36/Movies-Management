import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom'
import SubscriptionsWatched from './SubscriptionsWatched'
import { useLocation } from 'react-router-dom'
import utils from '../../utils';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'date-fns';
import Box from '@material-ui/core/Box';


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




function AllMembers() {

    const classes = useStyles();
    const history = useHistory();
    const { path } = useRouteMatch();
    const [members, setMembers] = useState([])
    const [expanded, setExpanded] = useState("");
    const [movies, setMovies] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [selectedDate, setSelectedDate] = useState();
    const [selectedMovie, setSelectedMovie] = useState();
    const [selectedMovieName, setSelectedMovieName] = useState('');
    const [showNew, setShowNew] = useState(false);


    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const memberId = params.get('memberId') ?? ""
    const user = JSON.parse(localStorage.getItem('userData'));

    const handleExpandClick = (memberId) => {
        if (memberId === expanded) {
            setExpanded("");
        } else {

            setExpanded(memberId);
        }
    };

    useEffect(() => {
        utils.getAllMembers()
            .then(data => setMembers(data))
    }, [])

    useEffect(() => {
        utils.getAllMovies()
            .then(data => setMovies(data))
    }, [])

    useEffect(() => {
        const getSubs = async () => {
            const subs = await utils.getAllSubs();
            setSubscriptions(subs);
        }
        getSubs();
    }, [])

    const editMember = (id) => {

        history.push(path + '/edit/' + id)

    }

    const deleteMember = (id) => {
        utils.deleteMemberById(id).then(() => {
            alert("Member Deleted !!");
            setMembers(members.filter(m => m._id !== id))
        }).catch(() => alert("Couldn't Delete the Member !!"));

    }

    const handleOptions = async (e) => {
        let movieN = await utils.getMovieByName(e.target.value)
        let movieId = movieN[0]._id
        setSelectedMovie(movieId)
        setSelectedMovieName(e.target.value)
        console.log(movieId);
    }

    const subscribeMember = async (id) => {

        let subscription = await utils.getSubsByMemberId(id)

        if (subscription.length) {

            let moviesArr = subscription[0]?.movies
            let newSubsMovie = { movieId: selectedMovie, date: selectedDate, name: selectedMovieName }
            moviesArr.push(newSubsMovie)
            let obj = {
                memberId: id, movies: moviesArr
            }
            await utils.UpdateSubscription(subscription[0]._id, obj)
            alert("Subscribed!")
            window.location.reload()
        }
        else {

            let obj = {
                memberId: id, movies: [{ movieId: selectedMovie, date: selectedDate, name: selectedMovieName }]
            }
            await utils.AddSubscription(obj)
            alert("Subscribed!")
            window.location.reload()

        }

    }


    let filteredArr = members.filter(member => member._id.includes(memberId))
    let items = filteredArr.map((member) => {
        let unWatchedMovies = [...movies];
        let sub = subscriptions.find(s => s.memberId === member._id)
        if (sub) {
            sub.movies.forEach(m => {
                let index = unWatchedMovies.findIndex(movie => movie._id === m.movieId)
                if (index !== -1) {
                    unWatchedMovies.splice(index, 1)
                }
            })
        }
        let options = unWatchedMovies.map((movie, index) => <option key={index} value={movie.name}> {movie.name}</option>);




        return (
            <Box key={member._id} display='flex' flexDirection='row' justifyContent="center" border={1} >


                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <strong><h2><Avatar aria-label="recipe" className={classes.avatar}
                                style={{ width: "140px", height: "75px", backgroundColor: "black" }}>{member.name}
                            </Avatar></h2></strong>

                        }
                    />
                    <CardActions disableSpacing>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded === member._id,
                            })}
                            onClick={() => handleExpandClick(member._id)}
                            aria-expanded={expanded === member._id}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded === member._id} timeout="auto" unmountOnExit  >
                        <CardContent>
                            <Typography paragraph>
                                Email: {member.email}<br />
                                City: {member.city}<br />
                            </Typography>
                            <Typography>
                                {user.permissions?.includes("Update Subscriptions") && <Button onClick={() => editMember(member._id)}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<EditIcon />}>Edit</Button> }

                                {user.permissions?.includes("Delete Subscriptions") && <Button onClick={() => deleteMember(member._id)}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    width="25px"
                                    endIcon={<DeleteIcon />}>Delete</Button>}<br />
                                <br />

                                {user.permissions?.includes("Create Subscriptions") && <Button variant="contained" onClick={() => setShowNew(!showNew)}> Subscribe to a new Movie </Button> }
                                <br /> <br />
                                <Box display={showNew ? "block" : "none"} >

                                    <select onChange={(e) => handleOptions(e)} >
                                        <option >Pick a New Movie</option>
                                        {options}
                                    </select>
                                    <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
                                    <br />
                                    <button onClick={() => subscribeMember(member._id)} > Subscribe </button>

                                </Box>
                                <br />
                                <SubscriptionsWatched memberId={member._id} />

                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        )

    })


    return (
        <div>



            <Box display='grid' gridGap={20} gridTemplateColumns='1fr 1fr 1fr 1fr'>
                {items}
            </Box>


        </div>
    );
}

export default AllMembers;