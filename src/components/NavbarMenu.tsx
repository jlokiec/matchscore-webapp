import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { HOME_NAME } from '../pages/Home';
import { CATEGORIES_NAME } from '../pages/Categories';
import { REGISTER_NAME } from '../pages/Register';
import { ADMIN_PANEL_NAME } from '../pages/AdminPanel';
import * as routing from '../constants/routing';
import { CombinedState } from '../reducers/rootReducer';
import { logout } from '../actions/user';
import { ADD_REPORT_NAME } from '../pages/AddReport';

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

type NavbarMenuProps = StateProps & CustomProps & DispatchProps;

class NavbarMenu extends React.Component<NavbarMenuProps, {}> {
    constructor(props: NavbarMenuProps) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.displayLoginOrWelcome = this.displayLoginOrWelcome.bind(this);
        this.displayAdminPanel = this.displayAdminPanel.bind(this);
        this.displayAddReportLink = this.displayAddReportLink.bind(this);
    }

    handleLogout(event: any) {
        this.props.logout();
    }

    displayLoginOrWelcome() {
        if (this.props.isLoggedIn) {
            return (
                <div className="d-flex justify-content-right">
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col sm="auto">
                                <Nav.Item>
                                    <Navbar.Text>{`Witaj, ${this.props.username}`}</Navbar.Text>
                                </Nav.Item>
                            </Col>
                            <Col sm="auto">
                                <Button onClick={this.handleLogout} href={routing.HOME_ROUTE}>Wyloguj się</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return (
                <div className="d-flex justify-content-right">
                    <Nav.Link href={routing.REGISTER_ROUTE}>{REGISTER_NAME}</Nav.Link>
                    <Nav.Link href={routing.LOGIN_ROUTE}>Zaloguj się</Nav.Link>
                </div>
            );
        }
    }

    displayAdminPanel() {
        if (this.props.isLoggedIn && this.props.isAdmin) {
            return <Nav.Link href={routing.ADMIN_PANEL_ROUTE}>{ADMIN_PANEL_NAME}</Nav.Link>
        }
    }

    displayAddReportLink() {
        if (this.props.isLoggedIn && this.props.isUser) {
            return <Nav.Link href={routing.ADD_REPORT_ROUTE}>{ADD_REPORT_NAME}</Nav.Link>
        }
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href={routing.HOME_ROUTE}>MatchScore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={routing.HOME_ROUTE}>{HOME_NAME}</Nav.Link>
                        <Nav.Link href={routing.CATEGORIES_ROUTE}>{CATEGORIES_NAME}</Nav.Link>
                        {this.displayAddReportLink()}
                        {this.displayAdminPanel()}
                    </Nav>
                    {this.displayLoginOrWelcome()}
                </Navbar.Collapse>
            </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMenu);
