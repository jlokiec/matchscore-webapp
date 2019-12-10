import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetchForDate } from '../actions/matches';
import { ThunkDispatch } from 'redux-thunk';
import { Match } from '../models/Match';
import { getMatchesForDate } from '../reducers/matchReducer';
import ListGroup from 'react-bootstrap/ListGroup';

interface CustomProps {
    setMatchId: Function,
    timestamp: number
}

interface StateProps {
    loading: boolean,
    error?: object,
    matches: Array<Match>
}

interface DispatchProps {
    fetch: (date: number) => void
}

interface MatchListState {
    id?: number
}

type MatchListProperties = StateProps & CustomProps & DispatchProps;

class MatchList extends React.Component<MatchListProperties, MatchListState> {
    componentDidMount() {
        const timestampSeconds = Math.floor(this.props.timestamp / 1000);
        this.props.fetch(timestampSeconds);
    }

    chooseMatch(id: number) {
        this.props.setMatchId(id);
    }

    displayMatchList() {
        if (this.props.matches.length > 0) {
            return (
                <ListGroup variant="flush">
                    {this.props.matches.map(match => {
                        const startTime = new Date(match.kickOffTimestamp * 1000).getHours() + ":" + new Date(match.kickOffTimestamp * 1000).getMinutes();
                        return <ListGroup.Item key={match.id} action={true} onClick={this.chooseMatch.bind(this, match.id)}>{`${startTime} ${match.homeTeam.name} - ${match.awayTeam.name}`}</ListGroup.Item>
                    })}
                </ListGroup>
            );
        } else {
            return (
                <h1 style={{ textAlign: "center" }}>Dzisiaj nie są rozgrywane żadne mecze.</h1>
            );
        }
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
                {this.displayMatchList()}
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.leagues.loading,
        error: states.leagues.error,
        matches: getMatchesForDate(states.matches, new Date(customProps.timestamp))
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetch: (date: number) => dispatch(fetchForDate(date))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(MatchList);
