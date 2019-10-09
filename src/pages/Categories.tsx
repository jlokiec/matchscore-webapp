import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CategoryBrowser from '../components/CategoryBrowser';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';

export const Categories: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{CATEGORIES_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <CategoryBrowser />
        </div>
    );
}

export const CATEGORIES_NAME = "Kategorie";
