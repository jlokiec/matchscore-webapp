import React from 'react';
import { Switch, Route } from 'react-router';
import * as routing from '../constants/routing';
import { Home } from '../pages/Home';
import { Categories } from '../pages/Categories';
import { Leagues } from '../pages/Leagues';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { LeagueDetails } from '../pages/LeagueDetails';

export const AppRouting: React.FC = () => {
    return (
        <Switch>
            <Route exact path={routing.HOME_ROUTE} component={Home} />
            <Route path={routing.CATEGORIES_ROUTE} component={Categories} />
            <Route path={routing.LEAGUES_ROUTE} component={Leagues} />
            <Route path={routing.REGISTER_ROUTE} component={Register} />
            <Route path={routing.LOGIN_ROUTE} component={Login} />
            <Route path={routing.LEAGUE_DETAILS_ROUTE} component={LeagueDetails} />
            <Route component={() => <h1>Page not found</h1>} />
        </Switch>
    );
}