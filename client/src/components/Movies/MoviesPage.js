import React, { useState } from 'react';
import { useRouteMatch, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AddMovie from './AddMovie';
import AllMovies from './AllMovies';
import EditMovie from './EditMovie';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Pagination from '../Pagination'


function MoviesPage () {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const location = useLocation()
    const { path } = useRouteMatch();
    const params = new URLSearchParams(location.search)
    // eslint-disable-next-line no-unused-vars
    const movieName = params.get('movieName')
    const user = JSON.parse(localStorage.getItem('userData'));

    const [currentPage, setCurrentPage] = useState(1)

    const handleChange = (page) => {
        setCurrentPage(page);
    }
    
    return (
        <div>
            <h1 style={{ fontFamily: 'Ariel' }}>Welcome to Movies Browser</h1><br />
            <Pagination changePage={handleChange}/>
            <Switch>
                <Route path={path} exact  >
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand onClick={() => history.push(path)} >All Movies</Navbar.Brand>
                        { user.permissions?.includes("Create Movies") &&  <Navbar.Brand onClick={() => history.push(path + "/add")}>Add Movie</Navbar.Brand> }
                         <Nav className="mr-auto">
                        </Nav>
                        <FormControl style={{ width: "68%" }} type="search" placeholder="Search" value={searchValue || ''} className="mr-sm-2" onChange={e => setSearchValue(e.target.value)} />
                        <Button variant="outline-primary">Search</Button>
                    </Navbar>
                    <AllMovies  currentPage={currentPage} findValue={searchValue ?? ""} />
                </Route>
                <Route path={path + "/add"} exact component={AddMovie} />
                <Route path={path + "/edit/:id"} component={EditMovie} />
            </Switch>
        </div>


    )
}

export default MoviesPage