import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as api from '../constants/Api';
import { RegisterDto } from '../models/RegisterDto';

interface RegisterFormState {
    error?: boolean,
    success?: boolean,
    username: string,
    usernameValid: boolean,
    email: string,
    emailValid: boolean,
    password: string,
    passwordValid: boolean,
    repeatPassword: string,
    repeatPasswordValid: boolean,
    firstName: string,
    firstNameValid: boolean,
    lastName: string,
    lastNameValid: boolean
}

export default class RegisterForm extends React.Component<any, RegisterFormState>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            usernameValid: false,
            email: "",
            emailValid: false,
            password: "",
            passwordValid: false,
            repeatPassword: "",
            repeatPasswordValid: false,
            firstName: "",
            firstNameValid: false,
            lastName: "",
            lastNameValid: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
    }

    registerFeedback() {
        if (this.state.success) {
            return (<Alert variant="success">Rejestracja powiodła się, sprawdź pocztę e-mail.</Alert>);
        } else if (this.state.error) {
            return (<Alert variant="danger">Błąd podczas rejestracji.</Alert>);
        }
    }

    handleSubmit(event: React.FormEvent) {
        if (this.enableSubmit()) {
            event.preventDefault()

            const registerDto: RegisterDto = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            };

            axios.post(api.REGISTER, registerDto)
                .then(response => this.setState({ success: true, error: false }))
                .catch(error => {
                    console.error(`Error while registering new user: ${JSON.stringify(error)}`);
                    this.setState({ success: false, error: true });
                });
        }
    }

    handleUsernameChange(event: any) {
        const username: string = event.target.value.trim();

        if (username && username.length >= 3 && username.length <= 32) {
            this.setState({ username: username, usernameValid: true });
        } else {
            this.setState({ username: username, usernameValid: false });
        }
    }

    usernameFeedback() {
        return (
            <Form.Control.Feedback type={this.state.usernameValid ? "valid" : "invalid"}>
                {this.state.usernameValid ? "OK" : "Nazwa użytkownika powinna mieć od 3 do 32 znaków"}
            </Form.Control.Feedback>
        );
    }

    handleEmailChange(event: any) {
        const email: string = event.target.value;

        const emailMatchesRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (email.length >= 5 && email.length <= 32 && emailMatchesRegex) {
            this.setState({ email: email, emailValid: true });
        } else {
            this.setState({ email: email, emailValid: false });
        }
    }

    emailFeedback() {
        return (
            <Form.Control.Feedback type={this.state.emailValid ? "valid" : "invalid"}>
                {this.state.emailValid ? "OK" : "E-mail powinien mieć od 5 do 32 znaków i spełniać format example@domain.com"}
            </Form.Control.Feedback>
        );
    }

    handleFirstNameChange(event: any) {
        const firstName: string = event.target.value;

        if (firstName.length >= 3 && firstName.length <= 32) {
            this.setState({ firstName: firstName, firstNameValid: true });
        } else {
            this.setState({ firstName: firstName, firstNameValid: false });
        }
    }

    firstNameFeedback() {
        return (
            <Form.Control.Feedback type={this.state.firstNameValid ? "valid" : "invalid"}>
                {this.state.firstNameValid ? "OK" : "Imię powinno mieć od 3 do 32 znaków"}
            </Form.Control.Feedback>
        );
    }

    handleLastNameChange(event: any) {
        const lastName: string = event.target.value;

        if (lastName.length >= 3 && lastName.length <= 32) {
            this.setState({ lastName: lastName, lastNameValid: true });
        } else {
            this.setState({ lastName: lastName, lastNameValid: false });
        }
    }

    lastNameFeedback() {
        return (
            <Form.Control.Feedback type={this.state.lastNameValid ? "valid" : "invalid"}>
                {this.state.lastNameValid ? "OK" : "Nazwisko powinno mieć od 3 do 32 znaków"}
            </Form.Control.Feedback>
        );
    }

    handlePasswordChange(event: any) {
        const password: string = event.target.value;

        if (password.length >= 8 && password.length <= 32) {
            this.setState({ password: password, passwordValid: true });
        } else {
            this.setState({ password: password, passwordValid: false });
        }
    }

    passwordFeedback() {
        return (
            <Form.Control.Feedback type={this.state.passwordValid ? "valid" : "invalid"}>
                {this.state.passwordValid ? "OK" : "Hasło powinno mieć od 8 do 32 znaków"}
            </Form.Control.Feedback>
        );
    }

    handleRepeatPasswordChange(event: any) {
        const repeatPassword: string = event.target.value;

        if (repeatPassword && repeatPassword === this.state.password) {
            this.setState({ repeatPassword: repeatPassword, repeatPasswordValid: true });
        } else {
            this.setState({ repeatPassword: repeatPassword, repeatPasswordValid: false });
        }
    }

    repeatPasswordFeedback() {
        return (
            <Form.Control.Feedback type={this.state.repeatPasswordValid ? "valid" : "invalid"}>
                {this.state.repeatPasswordValid ? "OK" : "Wpisz hasło jeszcze raz"}
            </Form.Control.Feedback>
        );
    }

    enableSubmit(): boolean {
        return this.state.usernameValid && this.state.emailValid && this.state.firstNameValid && this.state.lastNameValid && this.state.passwordValid && this.state.repeatPasswordValid;
    }

    render() {
        return (
            <div>
                {this.registerFeedback()}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="username">
                        <Form.Label column sm={2}>Nazwa użytkownika:</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="input"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                isValid={this.state.usernameValid}
                                isInvalid={!this.state.usernameValid}
                            />
                            {this.usernameFeedback()}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="email">
                        <Form.Label column sm={2}>E-mail:</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                isValid={this.state.emailValid}
                                isInvalid={!this.state.emailValid}
                            />
                            {this.emailFeedback()}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="firstName">
                        <Form.Label column sm={2}>Imię:</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="input"
                                value={this.state.firstName}
                                onChange={this.handleFirstNameChange}
                                isValid={this.state.firstNameValid}
                                isInvalid={!this.state.firstNameValid}
                            />
                            {this.firstNameFeedback()}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="lastName">
                        <Form.Label column sm={2}>Nazwisko:</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="input"
                                value={this.state.lastName}
                                onChange={this.handleLastNameChange}
                                isValid={this.state.lastNameValid}
                                isInvalid={!this.state.lastNameValid}
                            />
                            {this.lastNameFeedback()}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="password">
                        <Form.Label column sm={2}>Hasło:</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                isValid={this.state.passwordValid}
                                isInvalid={!this.state.passwordValid}
                            />
                            {this.passwordFeedback()}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="repeatPassword">
                        <Form.Label column sm={2}>Powtórz hasło:</Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="password"
                                value={this.state.repeatPassword}
                                onChange={this.handleRepeatPasswordChange}
                                isValid={this.state.repeatPasswordValid}
                                isInvalid={!this.state.repeatPasswordValid}
                                disabled={!this.state.passwordValid}
                            />
                            {this.repeatPasswordFeedback()}
                        </Col>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!this.enableSubmit()}
                        >Zarejestruj się</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
