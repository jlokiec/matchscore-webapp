import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import RegisterForm from '../components/RegisterForm';
import { Link } from "react-router-dom"
import { HOME_NAME } from './Home';
import * as routing from '../constants/Routing';

export const Register: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to={routing.HOME_ROUTE}>{HOME_NAME}</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>{REGISTER_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <RegisterForm />
        </div>
    );
}

export const REGISTER_NAME = "Rejestracja";
