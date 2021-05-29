import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import utils from '../../utils'
import Box from '@material-ui/core/Box';
import MovieItem from './MovieItem'

const AllMovies = (props) => {

    const moviesPerPage = 10;

    const [allMovies, setAllMovies] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const movieName = params.get('movieName') ?? props.findValue

    useEffect(() => {

        setSearchValue(movieName)

    }, [movieName]) // Loop



    useEffect(() => {
        utils.getAllMovies().then((data) => {
            setAllMovies(data)
            localStorage.setItem("pagesCount", Math.ceil(data.length / moviesPerPage) ?? 1)
        }).catch((err) => alert(err))

    }, []) //--> componentDidMount

    //Life cycle methods (Class components and how hooks make it easy)

    let arr = allMovies.filter(m => m.name.toLowerCase().includes(searchValue.toLowerCase()))

    let items = arr.map((movie) => {
        return (

            <MovieItem movie={movie} />
        )
    })

    return (
        <div >

            <Box p={2} mt={2} display='grid' gridGap={20} gridTemplateColumns='1fr 1fr 1fr 1fr'>
                {items.slice((props.currentPage - 1) * moviesPerPage, props.currentPage * moviesPerPage)}
            </Box>
        </div>
    );
}

export default AllMovies;

