import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Home, HOME_NAME } from './pages/Home';
import { Categories, CATEGORIES_NAME } from './pages/Categories';
import { Leagues } from './pages/Leagues';
import { Register, REGISTER_NAME } from './pages/Register';
import { Login } from './pages/Login';
import * as routing from './constants/routing';
import { connect } from 'react-redux';
import { CombinedState } from './reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { logout } from './actions/user';

interface CustomProps {

}

interface StateProps {
  username?: string,
  isAdmin: boolean,
  isUser: boolean,
  isLoggedIn: boolean
}

interface DispatchProps {
  logout: () => void
}

type AppProps = StateProps & CustomProps & DispatchProps;

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.displayLoginOrWelcome = this.displayLoginOrWelcome.bind(this);
  }

  handleLogout(event: any) {
    this.props.logout();
  }

  displayLoginOrWelcome() {
    if (this.props.isLoggedIn) {
      return (
        <div className="d-flex justify-content-right">
          <Nav.Item>
            <Navbar.Text>{`Witaj, ${this.props.username}`}</Navbar.Text>
          </Nav.Item>
          <Button onClick={this.handleLogout}>Wyloguj się</Button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-right">
          <Nav.Link as={Link} to={routing.REGISTER_ROUTE}>{REGISTER_NAME}</Nav.Link>
          <Button href={routing.LOGIN_ROUTE}>Zaloguj się</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">MatchScore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to={routing.HOME_ROUTE}>{HOME_NAME}</Nav.Link>
                <Nav.Link as={Link} to={routing.CATEGORIES_ROUTE}>{CATEGORIES_NAME}</Nav.Link>
              </Nav>
              {this.displayLoginOrWelcome()}
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path={routing.HOME_ROUTE} component={Home} />
            <Route path={routing.CATEGORIES_ROUTE} component={Categories} />
            <Route path={routing.LEAGUES_ROUTE} component={Leagues} />
            <Route path={routing.REGISTER_ROUTE} component={Register} />
            <Route path={routing.LOGIN_ROUTE} component={Login} />
            <Route component={() => <h1>Page not found</h1>} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
  return {
    username: states.user.username,
    isAdmin: states.user.isAdmin,
    isUser: states.user.isUser,
    isLoggedIn: states.user.isLoggedIn
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
  return {
    logout: async () => {
      await dispatch(logout());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
