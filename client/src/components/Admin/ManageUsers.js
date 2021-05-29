import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Edit from './EditUser';
import All from './AllUsers';
import Add from './AddUser'



export default function ManageUsers() {

    const { path } = useRouteMatch();

    return (

        <div>
            
            <h1 style={{color: "white"}}>USERS</h1>

            <Switch>
                <Route path={path} exact />
                <Route path={`${path}/all`} component={All} />
                <Route path={`${path}/edit/:id`} component={Edit} />
                <Route path={`${path}/add/`} component={Add} />
            </Switch>

        </div>
    )

}


