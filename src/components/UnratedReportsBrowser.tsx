import React from 'react';
import { UnratedReport } from '../models/UnratedReport';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetch } from '../actions/unratedReports';
import { ThunkDispatch } from 'redux-thunk';

interface CustomProps {

}

interface StateProps {
    loading: boolean,
    error?: object,
    reports: Array<UnratedReport>
}

interface DispatchProps {
    fetch: () => void
}

type UnratedReportsBrowserProperties = StateProps & CustomProps & DispatchProps;

class UnratedReportsBrowser extends React.Component<UnratedReportsBrowserProperties, {}>{
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
            <div>
                <h1 className="d-flex justify-content-center">Raporty oczekujące na ocenę</h1>
                <ListGroup variant="flush">
                    {this.props.reports.map(report => <ListGroup.Item key={report.id}>{`${report.description} ocenione przez ${report.username}`}</ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.unratedReports.loading,
        error: states.unratedReports.error,
        reports: states.unratedReports.data
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetch: () => dispatch(fetch())
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(UnratedReportsBrowser);
