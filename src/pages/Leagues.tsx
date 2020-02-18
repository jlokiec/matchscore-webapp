import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import LeagueBrowser from '../components/LeagueBrowser';
import { RouteComponentProps } from 'react-router-dom';
import { HOME_NAME } from './Home';
import { CATEGORIES_NAME } from './Categories';
import * as routing from '../constants/routing';

interface LeagueCategoryId {
    id: string
}

interface LeagueProperties extends RouteComponentProps<LeagueCategoryId> {

}

export const Leagues: React.FC<LeagueProperties> = (props: LeagueProperties) => {
    const id = parseInt(props.match.params.id);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item href={routing.CATEGORIES_ROUTE}>{CATEGORIES_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{LEAGUES_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <LeagueBrowser categoryId={id} />
        </div>
    );
}

export const LEAGUES_NAME = "Ligi";
