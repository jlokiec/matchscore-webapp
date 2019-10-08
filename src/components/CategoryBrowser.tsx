import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { LeagueCategory } from '../models/LeagueCategory';
import * as routing from '../constants/routing';
import { CombinedState } from '../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import { fetch } from '../actions/categories';

interface CustomProps {

}

interface StateProps {
    loading: boolean,
    error?: object,
    categories: Array<LeagueCategory>
}

interface DispatchProps {
    fetch: () => void
}

type CategoryBrowserProperties = StateProps & CustomProps & DispatchProps;

class CategoryBrowser extends React.Component<CategoryBrowserProperties, {}>{
    componentDidMount() {
        this.props.fetch();
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
                {this.props.categories.map(category => <ListGroup.Item key={category.id}><Link to={`${routing.LEAGUES_PATH}/${category.id}`}>{category.name}</Link></ListGroup.Item>)}
            </ListGroup>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.categories.loading,
        error: states.categories.error,
        categories: states.categories.data
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetch: () => dispatch(fetch())
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(CategoryBrowser);
