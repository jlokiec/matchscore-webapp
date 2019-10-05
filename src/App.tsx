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
import LoginModal from './components/LoginModal';
import * as routing from './constants/Routing';
import { connect } from 'react-redux';
import { CombinedState } from './reducers/rootReducer';

interface CustomProps {

}

interface StateProps {
  username?: string,
  isAdmin: boolean,
  isUser: boolean,
  isGuest: boolean
}

interface DispatchProps {

}

type AppProps = StateProps & CustomProps & DispatchProps;

interface AppState {
  showLogin: boolean
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { showLogin: false };
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.displayLoginOrWelcome = this.displayLoginOrWelcome.bind(this);
  }

  handleLoginClick(event: any) {
    this.setState({ showLogin: true });
  }

  handleCloseLogin() {
    this.setState({ showLogin: false });
  }

  displayLoginOrWelcome() {
    if (!this.props.isGuest) {
      return (<Navbar.Text>{`Witaj, ${this.props.username}`}</Navbar.Text>);
    } else {
      return (
        <div className="d-flex justify-content-right">
          <Nav.Link as={Link} to={routing.REGISTER_ROUTE}>{REGISTER_NAME}</Nav.Link>
          <Button onClick={this.handleLoginClick}>Zaloguj się</Button>
        </div>
      );
    }
  }

  render() {
    return (<Container>
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
          <Route component={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
      <LoginModal show={this.state.showLogin} handleCancel={this.handleCloseLogin} />
    </Container>);
  }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
  return {
    username: states.user.username,
    isAdmin: states.user.isAdmin,
    isUser: states.user.isUser,
    isGuest: states.user.isLoggedIn
  };
}

export default connect(mapStateToProps)(App);
