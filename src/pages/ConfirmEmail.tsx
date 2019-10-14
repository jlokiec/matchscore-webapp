import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { RouteComponentProps } from 'react-router-dom';
import * as routing from '../constants/routing';
import { myAxios } from '../utils/axios';
import * as api from '../constants/api';

interface RegistrationUuid {
    uuid: string
}

interface ConfirmEmailProperties extends RouteComponentProps<RegistrationUuid> {

}

interface ConfirmEmailState {
    success: boolean,
    error?: object
}

export default class ConfirmEmail extends React.Component<ConfirmEmailProperties, ConfirmEmailState> {
    constructor(props: ConfirmEmailProperties) {
        super(props);
        this.state = {
            success: false
        };
    }

    componentDidMount() {
        myAxios().get(api.CONFIRM_EMAIL, {
            params: {
                uuid: this.props.match.params.uuid
            }
        })
            .then(response => this.setState({ success: true, error: undefined }))
            .catch(error => this.setState({ success: false, error: error }))

    }

    render() {
        if (this.state.success) {
            return (
                <Alert variant="success">
                    Adres e-mail potwierdzony, możesz się teraz <Alert.Link href={routing.LOGIN_ROUTE}>zalogować</Alert.Link>.
                </Alert>
            );
        } else if (this.state.error) {
            return (<Alert variant="danger">Błąd podczas potwierdzania adresu e-mail.</Alert>);
        } else {
            return null;
        }
    }
}
