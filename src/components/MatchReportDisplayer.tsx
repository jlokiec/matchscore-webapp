import React from 'react';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetchForReport } from '../actions/matchEvents';
import { ThunkDispatch } from 'redux-thunk';
import { MatchEvent, EventCategory } from '../models/MatchEvent';
import { getEventsForReport } from '../reducers/matchEventsReducer';
import { Report } from '../models/Report';
import { processEvent, EventDetails } from '../utils/matchEvents';

interface CustomProps {
    report: Report
}

interface StateProps {
    loading: boolean,
    error?: object,
    matchEvents: Array<MatchEvent>
}

interface DispatchProps {
    fetchForReport: (reportId: number) => void
}

interface MatchReportDisplayerState {

}

type MatchReportDisplayerProperties = StateProps & CustomProps & DispatchProps;

class MatchReportDisplayer extends React.Component<MatchReportDisplayerProperties, MatchReportDisplayerState> {
    componentDidMount() {
        this.props.fetchForReport(this.props.report.id);
    }

    componentDidUpdate(prevProps: MatchReportDisplayerProperties) {
        if (this.props.report !== prevProps.report) {
            this.props.fetchForReport(this.props.report.id);
        }
    }

    processEvent(event: MatchEvent) {
        const eventDetails = processEvent(event, this.props.matchEvents);
        return <p key={event.id} style={{ textAlign: eventDetails.position }}>{eventDetails.description}</p>;
    }

    render() {
        return (
            <div>
                {<h1 style={{ textAlign: "center" }}>{`${this.props.report.match.homeTeam.name} - ${this.props.report.match.awayTeam.name}`}</h1>}
                {this.props.matchEvents.map(e => this.processEvent(e))}
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.matchEvents.loading,
        error: states.matchEvents.error,
        matchEvents: getEventsForReport(states.matchEvents, customProps.report.id)
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetchForReport: (reportId: number) => dispatch(fetchForReport(reportId))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(MatchReportDisplayer);
