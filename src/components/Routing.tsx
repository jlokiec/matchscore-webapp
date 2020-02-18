import React from 'react';
import { Switch, Route } from 'react-router';
import * as routing from '../constants/routing';
import Home from '../pages/Home';
import { Categories } from '../pages/Categories';
import { Leagues } from '../pages/Leagues';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { LeagueDetails } from '../pages/LeagueDetails';
import ConfirmEmail from '../pages/ConfirmEmail';
import AdminPanel from '../pages/AdminPanel';
import AddReport from '../pages/AddReport';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';

interface CustomProps {

}

interface StateProps {
    username?: string,
    isAdmin: boolean,
    isUser: boolean,
    isLoggedIn: boolean
}

type RoutingProps = StateProps & CustomProps;

const UNAUTHORIZED = 'Nie masz uprawnień aby oglądać tę stronę';
const NOT_FOUND = 'Nie znaleziono strony';

const AppRouting: React.FC<RoutingProps> = (props: RoutingProps) => {
    return (
        <Switch>
            <Route exact path={routing.HOME_ROUTE} component={Home} />
            <Route path={routing.CATEGORIES_ROUTE} component={Categories} />
            <Route path={routing.LEAGUES_ROUTE} component={Leagues} />
            <Route path={routing.REGISTER_ROUTE} component={Register} />
            <Route path={routing.LOGIN_ROUTE} component={Login} />
            <Route path={routing.LEAGUE_DETAILS_ROUTE} component={LeagueDetails} />
            <Route path={routing.CONFIRM_EMAIL_ROUTE} component={ConfirmEmail} />
            {props.isLoggedIn && props.isUser ? <Route path={routing.ADD_REPORT_ROUTE} component={AddReport} /> : <Route component={() => <h1>{UNAUTHORIZED}</h1>} />}
            {props.isLoggedIn && props.isAdmin ? <Route path={routing.ADMIN_PANEL_ROUTE} component={AdminPanel} /> : <Route component={() => <h1>{UNAUTHORIZED}</h1>} />}
            <Route component={() => <h1>{NOT_FOUND}</h1>} />
        </Switch>
    );
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        username: states.user.username,
        isAdmin: states.user.isAdmin,
        isUser: states.user.isUser,
        isLoggedIn: states.user.isLoggedIn
    };
}

export default connect(mapStateToProps)(AppRouting);
