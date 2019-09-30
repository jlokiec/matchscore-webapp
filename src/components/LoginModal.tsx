import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { CredentialsDto } from '../models/CredentialsDto';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { login, clear } from '../actions/login';
import { ThunkDispatch } from 'redux-thunk'

interface CustomProps {
    show: boolean,
    handleCancel: Function
}

interface StateProps {
    loading: boolean,
    error?: object,
    success: boolean
}

interface DispatchProps {
    login: (credentials: CredentialsDto) => void,
    clear: () => void
}

type LoginModalProps = StateProps & CustomProps & DispatchProps;

interface LoginModalState {
    show: boolean,
    username: string,
    password: string,
}

class LoginModal extends React.Component<LoginModalProps, LoginModalState>{
    constructor(props: LoginModalProps) {
        super(props);
        this.state = {
            show: this.props.show,
            username: "",
            password: ""
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.enableLogin = this.enableLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidUpdate(prevProps: LoginModalProps) {
        if (this.props.show !== prevProps.show) {
            this.setState({ show: this.props.show });
        }
    }

    handleClose() {
        this.setState({ show: false, username: "", password: "" });
        this.props.clear();
        this.props.handleCancel();
    }

    handleLogin() {
        const credentials: CredentialsDto = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(credentials);
    }

    enableLogin() {
        const usernameTrimmed = this.state.username.trim();
        const password = this.state.password;

        return usernameTrimmed.length > 0 && password.length > 0;
    }

    handleUsernameChange(event: any) {
        const username: string = event.target.value;
        this.setState({ username: username });
    }

    handlePasswordChange(event: any) {
        const password: string = event.target.value;
        this.setState({ password: password });
    }

    loginFeedback() {
        if (this.props.error) {
            return (<Alert variant="danger">Błąd podczas logowania.</Alert>);
        } else if (this.props.success) {
            return (<Alert variant="success">Zostałeś poprawnie zalogowany!</Alert>);
        }
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Zaloguj się</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {this.loginFeedback()}
                        <Form>
                            <Form.Group as={Row} controlId="username">
                                <Form.Label column sm={3}>Login:</Form.Label>
                                <Col sm={6}>
                                    <Form.Control
                                        type="input"
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="password">
                                <Form.Label column sm={3}>Hasło:</Form.Label>
                                <Col sm={6}>
                                    <Form.Control
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Anuluj</Button>
                    <Button
                        variant="primary"
                        onClick={this.handleLogin}
                        disabled={!this.enableLogin()}
                    >Zaloguj się</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.login.loading,
        error: states.login.error,
        success: states.login.success
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        login: async (credentials: CredentialsDto) => {
            await dispatch(login(credentials));
        },
        clear: () => dispatch(clear())
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(LoginModal);
