import React from 'react';
import { Report } from '../models/Report';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetchUnrated } from '../actions/reports';
import { ThunkDispatch } from 'redux-thunk';
import { getUnrated } from '../reducers/reportsReducer';

interface CustomProps {
    setReport: Function
}

interface StateProps {
    loading: boolean,
    error?: object,
    reports: Array<Report>
}

interface DispatchProps {
    fetch: () => void
}

type PendingReportsBrowserProperties = StateProps & CustomProps & DispatchProps;

class PendingReportsBrowser extends React.Component<PendingReportsBrowserProperties, {}>{
    componentDidMount() {
        this.props.fetch();
    }

    chooseReport(report: Report) {
        this.props.setReport(report);
    }

    processReport(report: Report) {
        const homeTeam = report.match.homeTeam.name;
        const awayTeam = report.match.awayTeam.name;
        const matchDate = new Date(report.match.kickOffTimestamp * 1000);
        const dateString = matchDate.toLocaleDateString();
        const timeString = `${matchDate.getHours()}:${matchDate.getMinutes()}`;
        const description = `${dateString} ${timeString} ${homeTeam} - ${awayTeam} (użytkownik ${report.username})`;
        return <ListGroup.Item key={report.id} action={true} onClick={this.chooseReport.bind(this, report)}>{description}</ListGroup.Item>;
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
                    {this.props.reports.map(report => this.processReport(report))}
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.reports.loading,
        error: states.reports.error,
        reports: getUnrated(states.reports)
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetch: () => dispatch(fetchUnrated())
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(PendingReportsBrowser);
