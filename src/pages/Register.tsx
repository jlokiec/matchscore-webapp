import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import RegisterForm from '../components/RegisterForm';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';

export const Register: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{REGISTER_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <RegisterForm />
        </div>
    );
}

export const REGISTER_NAME = "Rejestracja";
