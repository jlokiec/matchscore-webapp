import React from 'react';
import { connect } from 'react-redux';
import { Match } from '../models/Match';
import { CombinedState } from '../reducers/rootReducer';
import { getMatchesForLeagueIdAndRound } from '../reducers/matchReducer';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { InlineMatchResult } from './InlineMatchResult';

interface CustomProps {
    leagueId: number,
    round: number
}

interface StateProps {
    loading: boolean,
    error?: object,
    matches: Array<Match>
}

interface DispatchProps {

}

type MatchCardProperties = StateProps & CustomProps & DispatchProps;

const RoundCard: React.FC<MatchCardProperties> = (props) => {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.round.toString()}>
                Kolejka {props.round}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.round.toString()}>
                <Card.Body>
                    <ListGroup>
                        {props.matches.map(match => <ListGroup.Item><InlineMatchResult match={match} /></ListGroup.Item>)}
                    </ListGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.matches.loading,
        error: states.matches.error,
        matches: getMatchesForLeagueIdAndRound(states.matches, customProps.leagueId, customProps.round)
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps)(RoundCard);
