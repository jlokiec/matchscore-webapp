import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import LeagueBrowser from '../components/LeagueBrowser';
import { Link, RouteComponentProps } from 'react-router-dom';
import { HOME_NAME } from './Home';
import { CATEGORIES_NAME } from './Categories';
import * as routing from '../constants/routing';

interface LeagueId {
    id: string
}

interface LeagueProperties extends RouteComponentProps<LeagueId> {
    categoryName: string
}

export const Leagues: React.FC<LeagueProperties> = (props: LeagueProperties) => {
    const id = parseInt(props.match.params.id);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to={routing.HOME_ROUTE}>{HOME_NAME}</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to={routing.CATEGORIES_ROUTE}>{CATEGORIES_NAME}</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>{LEAGUES_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <LeagueBrowser categoryId={id} />
        </div>
    );
}

export const LEAGUES_NAME = "Ligi";
