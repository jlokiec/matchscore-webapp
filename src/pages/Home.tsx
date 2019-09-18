import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export const Home: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item active>{HOME_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Home page</h1>
        </div>
    );
}

export const HOME_NAME = "Strona główna";
