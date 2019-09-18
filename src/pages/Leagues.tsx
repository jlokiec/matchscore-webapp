import React from 'react';
import LeagueBrowser from '../components/LeagueBrowser';
import { RouteComponentProps } from "react-router-dom"

interface LeagueId {
    id: string
}

interface LeagueProperties extends RouteComponentProps<LeagueId> {
    categoryName: string
}

const Leagues: React.FC<LeagueProperties> = (props: LeagueProperties) => {
    const id = parseInt(props.match.params.id);
    return (<LeagueBrowser categoryId={id} />);
}

export default Leagues;
