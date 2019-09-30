import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as api from '../constants/Api';
import Modal from 'react-bootstrap/Modal';
import { LoginDto } from '../models/LoginDto';

interface LoginModalProps {
    show: boolean,
    handleCancel: Function
}

interface LoginModalState {
    show: boolean,
    username: string,
    password: string,
    error: boolean
}

export default class LoginModal extends React.Component<LoginModalProps, LoginModalState>{
    constructor(props: LoginModalProps) {
        super(props);
        this.state = {
            show: this.props.show,
            username: "",
            password: "",
            error: false
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
        this.setState({ show: false, username: "", password: "", error: false });
        this.props.handleCancel();
    }

    handleLogin() {
        const loginDto: LoginDto = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post(api.LOGIN, loginDto)
            .then(response => this.handleClose())
            .catch(error => {
                console.error(`Error while logging in: ${JSON.stringify(error)}`);
                this.setState({ error: true });
            });
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
        if (this.state.error) {
            return (<Alert variant="danger">Błąd podczas logowania.</Alert>);
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
