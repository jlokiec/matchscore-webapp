import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import LeagueBrowser from '../components/LeagueBrowser';
import { Link, RouteComponentProps } from "react-router-dom"

interface LeagueId {
    id: string
}

interface LeagueProperties extends RouteComponentProps<LeagueId> {
    categoryName: string
}

const Leagues: React.FC<LeagueProperties> = (props: LeagueProperties) => {
    const id = parseInt(props.match.params.id);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/categories">Kategorie</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Ligi</Breadcrumb.Item>
            </Breadcrumb>
            <LeagueBrowser categoryId={id} />
        </div>
    );
}

export default Leagues;
