import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CredentialsDto } from '../models/CredentialsDto';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { login, clear } from '../actions/user';
import { ThunkDispatch } from 'redux-thunk';

interface CustomProps {

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

type LoginFormProps = StateProps & CustomProps & DispatchProps;

interface LoginFormState {
    username: string,
    password: string,
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState>{
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.enableLogin = this.enableLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLogin(event: React.FormEvent) {
        if (this.enableLogin()) {
            event.preventDefault();

            const credentials: CredentialsDto = {
                username: this.state.username,
                password: this.state.password
            };

            this.props.login(credentials);
        }
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
            <div>
                {this.loginFeedback()}
                <Form onSubmit={this.handleLogin} className="text-center">
                    <Form.Group as={Row} controlId="username">
                        <Col md="auto">
                            <Form.Label>Login:</Form.Label>
                        </Col>
                        <Col md="auto">
                            <Form.Control
                                type="input"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                autoFocus={true}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="password">
                        <Col md="auto">
                            <Form.Label>Hasło:</Form.Label>
                        </Col>
                        <Col md="auto">
                            <Form.Control
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        variant="primary"
                        disabled={!this.enableLogin()}
                        type="submit"
                    >Zaloguj się</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.user.loading,
        error: states.user.error,
        success: states.user.success
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

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(LoginForm);
