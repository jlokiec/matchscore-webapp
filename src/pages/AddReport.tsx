import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';

export const AddReport: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{ADD_REPORT_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Dodawanie relacji</h1>
        </div>
    );
}

export const ADD_REPORT_NAME = "Dodaj relację";
