import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouting } from './components/Routing';
import NavbarMenu from './components/NavbarMenu';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Router>
          <NavbarMenu />
          <AppRouting />
        </Router>
      </Container>
    );
  }
}
