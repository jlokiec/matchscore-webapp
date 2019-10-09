import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { HOME_NAME } from '../pages/Home';
import { CATEGORIES_NAME } from '../pages/Categories';
import { REGISTER_NAME } from '../pages/Register';
import * as routing from '../constants/routing';
import { CombinedState } from '../reducers/rootReducer';
import { logout } from '../actions/user';

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
                    <Nav.Link href={routing.REGISTER_ROUTE}>{REGISTER_NAME}</Nav.Link>
                    <Nav.Link href={routing.LOGIN_ROUTE}>Zaloguj się</Nav.Link>
                </div>
            );
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
