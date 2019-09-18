import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Home, HOME_NAME } from './pages/Home';
import { Categories, CATEGORIES_NAME } from './pages/Categories';
import { Leagues } from './pages/Leagues';

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">MatchScore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">{HOME_NAME}</Nav.Link>
              <Nav.Link as={Link} to="/categories">{CATEGORIES_NAME}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/leagues/:id" component={Leagues} />
          <Route component={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
