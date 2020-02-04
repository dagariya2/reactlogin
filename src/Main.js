import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import Dashboard from './Components/Dashboard/dashboard';


const Main = () => (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/dashboard' component={Dashboard}/>
        </Switch>
)

export default Main;