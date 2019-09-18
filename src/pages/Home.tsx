import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Home: React.FC = () => {
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Home page</h1>
        </div>
    );
}

export default Home;
