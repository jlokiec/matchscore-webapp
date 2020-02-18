import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';
import LoginForm from '../components/LoginForm';

export const Login: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{LOGIN_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex justify-content-center">
                <LoginForm />
            </div>
        </div>
    );
}

export const LOGIN_NAME = "Zaloguj";
