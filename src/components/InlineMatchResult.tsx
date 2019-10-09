import React from 'react';
import { Match } from '../models/Match';

interface InlineMatchResultProps {
    match: Match
}

export const InlineMatchResult: React.FC<InlineMatchResultProps> = (props) => {
    const kickOffDate = new Date(Math.floor(props.match.kickOffTimestamp * 1000));
    const kickOffString = `${kickOffDate.toLocaleDateString()} ${kickOffDate.toLocaleTimeString()}`;
    const homeTeam = props.match.homeTeam.name;
    const awayTeam = props.match.awayTeam.name;
    const homeGoals = props.match.homeGoals;
    const awayGoals = props.match.awayGoals;

    return (
        <div key={props.match.id}>{homeTeam} {homeGoals}:{awayGoals} {awayTeam} {kickOffString}</div>
    );
}