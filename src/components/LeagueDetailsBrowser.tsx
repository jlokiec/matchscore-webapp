import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetchForLeague } from '../actions/matches';
import { ThunkDispatch } from 'redux-thunk';
import { Match } from '../models/Match';
import { getMatchesForLeagueId } from '../reducers/matchReducer';
import RoundCard from './RoundCard';

interface CustomProps {
    leagueId: number
}

interface StateProps {
    loading: boolean,
    error?: object,
    matches: Array<Match>
}

interface DispatchProps {
    fetch: (leagueId: number) => void
}

type LeagueDetailsBrowserProperties = StateProps & CustomProps & DispatchProps;

class LeagueDetailsBrowser extends React.Component<LeagueDetailsBrowserProperties, {}>{
    componentDidMount() {
        this.props.fetch(this.props.leagueId);
    }

    getAllRounds(matches: Array<Match>): Array<number> {
        let roundNumbers: Set<number> = new Set<number>();
        matches.forEach(match => roundNumbers.add(match.round));
        return Array.from(roundNumbers.values());
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }
        if (!this.props.loading && this.props.error) {
            return (
                <div className="d-flex justify-content-center">
                    <Alert key={1} variant="danger">Błąd pobierania danych</Alert>
                </div>
            );
        }
        return (
            <div>
                <p className="d-flex justify-content-center">Mecze z podziałem na kolejki:</p>
                <Accordion>
                    {this.getAllRounds(this.props.matches).map(round => <RoundCard leagueId={this.props.leagueId} round={round} />)}
                </Accordion>
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.leagues.loading,
        error: states.leagues.error,
        matches: getMatchesForLeagueId(states.matches, customProps.leagueId)
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetch: (leagueId: number) => dispatch(fetchForLeague(leagueId))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(LeagueDetailsBrowser);
