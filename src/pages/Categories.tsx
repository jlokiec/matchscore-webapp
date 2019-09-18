import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CategoryBrowser from '../components/CategoryBrowser';

const Categories: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Kategorie</Breadcrumb.Item>
            </Breadcrumb>
            <CategoryBrowser />
        </div>
    );
}

export default Categories;
