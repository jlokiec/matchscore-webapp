import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { RouteComponentProps } from 'react-router-dom';
import { HOME_NAME } from './Home';
import { CATEGORIES_NAME } from './Categories';
import * as routing from '../constants/routing';
import LeagueDetailsBrowser from '../components/LeagueDetailsBrowser';

interface LeagueId {
    id: string
}

interface LeagueDetailsProperties extends RouteComponentProps<LeagueId> {

}

export const LeagueDetails: React.FC<LeagueDetailsProperties> = (props: LeagueDetailsProperties) => {
    const id = parseInt(props.match.params.id);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item href={routing.CATEGORIES_ROUTE}>{CATEGORIES_NAME}</Breadcrumb.Item>
                <Breadcrumb.Item active>{LEAGUE_DETAILS_NAME}</Breadcrumb.Item>
            </Breadcrumb>
            <LeagueDetailsBrowser leagueId={id} />
        </div>
    );
}

export const LEAGUE_DETAILS_NAME = "Szczegóły ligi";
