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

interface AppState {
  showLogin: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { showLogin: false };
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(event: any) {
    this.setState({ showLogin: true });
  }

  handleCloseLogin() {
    this.setState({ showLogin: false });
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
              <Nav.Link as={Link} to={routing.REGISTER_ROUTE}>{REGISTER_NAME}</Nav.Link>
            </Nav>
            <div className="d-flex justify-content-right">
              <Button onClick={this.handleLoginClick}>Zaloguj</Button>
            </div>
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

export default connect()(App);
