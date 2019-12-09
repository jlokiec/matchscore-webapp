import React from 'react';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { fetchForReport } from '../actions/matchEvents';
import { ThunkDispatch } from 'redux-thunk';
import { MatchEvent, EventType, EventCategory } from '../models/MatchEvent';
import { getEventsForReport } from '../reducers/matchEventsReducer';

interface CustomProps {
    reportId: number
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
        this.props.fetchForReport(this.props.reportId);
    }

    processEvent(event: MatchEvent) {
        const eventDescription = `${event.eventType} ${event.description}`;
        switch (event.category) {
            case EventCategory.GENERAL:
                return <p key={event.id} style={{ textAlign: "center" }}>{eventDescription}</p>;
            case EventCategory.AWAY_TEAM:
                return <p key={event.id} style={{ textAlign: "right" }}>{eventDescription}</p>;
            default:
                return <p key={event.id} style={{ textAlign: "left" }}>{eventDescription}</p>
        }
    }

    render() {
        return (
            <div>
                {this.props.matchEvents.map(e => this.processEvent(e))}
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.matchEvents.loading,
        error: states.matchEvents.error,
        matchEvents: getEventsForReport(states.matchEvents, customProps.reportId)
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetchForReport: (reportId: number) => dispatch(fetchForReport(reportId))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(MatchReportDisplayer);
