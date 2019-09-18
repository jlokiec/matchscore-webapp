import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CategoryBrowser from '../components/CategoryBrowser';
import { HOME_NAME } from './Home';

export const Categories: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">{HOME_NAME}</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>{CATEGORIES_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <CategoryBrowser />
        </div>
    );
}

export const CATEGORIES_NAME = "Kategorie";
