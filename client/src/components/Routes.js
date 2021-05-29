import React from 'react';
import { Switch, Route } from 'react-router-dom';
import login2 from './Login/Login';
import RegisterPage from './Register/RegisterPage';
import RootPage from './RootPage';


function Routes() {

    return (
        <div>
            <Switch>
                <Route path="/" exact component={login2} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/M" component={RootPage} />
            </Switch>
        </div>
    )
}

export default Routes;