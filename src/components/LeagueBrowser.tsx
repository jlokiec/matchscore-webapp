import React from 'react';
import { League } from '../models/League';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetch } from '../actions/leagues';
import { getLeaguesForCategoryId } from '../reducers/leaguesReducer';
import { ThunkDispatch } from 'redux-thunk';

interface CustomProps {
    categoryId: number
}

interface StateProps {
    loading: boolean,
    error?: object,
    leagues: Array<League>
}

interface DispatchProps {
    fetch: (categoryId: number) => void
}

type LeagueBrowserProperties = StateProps & CustomProps & DispatchProps;

class LeagueBrowser extends React.Component<LeagueBrowserProperties, {}>{
    componentDidMount() {
        this.props.fetch(this.props.categoryId);
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
            <ListGroup variant="flush">
                {this.props.leagues.map(league => <ListGroup.Item key={league.id}>{league.name}</ListGroup.Item>)}
            </ListGroup>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.leagues.loading,
        error: states.leagues.error,
        leagues: getLeaguesForCategoryId(states.leagues, customProps.categoryId)
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetch: (categoryId: number) => dispatch(fetch(categoryId))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(LeagueBrowser);
