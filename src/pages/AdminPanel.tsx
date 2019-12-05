import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';
import UnratedReportsBrowser from '../components/UnratedReportsBrowser';

export const AdminPanel: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{ADMIN_PANEL_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <UnratedReportsBrowser />
        </div>
    );
}

export const ADMIN_PANEL_NAME = "Panel administracyjny";
