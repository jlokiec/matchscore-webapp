import React from 'react';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Report } from '../models/Report';
import { createForMatchId, fetchForMatchId } from '../actions/reports';
import { getForMatchId } from '../reducers/reportsReducer';
import MatchEventCreator from './MatchEventCreator';
import MatchReportDisplayer from './MatchReportDisplayer';
import { AxiosError } from 'axios';

interface CustomProps {
    matchId: number
}

interface StateProps {
    loading: boolean,
    error?: AxiosError,
    report?: Report,
    shouldPostReport: boolean
}

interface DispatchProps {
    fetchForMatchId: (matchId: number) => void,
    createForMatchId: (matchId: number) => void
}

interface MatchReportCreatorState {

}

type MatchReportCreatorProperties = StateProps & CustomProps & DispatchProps;

class MatchReportCreator extends React.Component<MatchReportCreatorProperties, MatchReportCreatorState> {
    componentDidMount() {
        this.props.fetchForMatchId(this.props.matchId);
    }

    createReport() {
        if (this.props.shouldPostReport) {
            this.props.createForMatchId(this.props.matchId);
        }
    }

    showReportDetailsAndEventCreator() {
        if (this.props.report !== undefined) {
            return (
                <div>
                    <MatchReportDisplayer reportId={this.props.report.id} />
                    <MatchEventCreator reportId={this.props.report.id} />
                </div>
            )
        }
    }

    render() {
        this.createReport();
        return (
            <div>
                {this.showReportDetailsAndEventCreator()}
            </div>
        );
    }
}

const mapStateToProps = (states: CombinedState, customProps: CustomProps): StateProps => {
    return {
        loading: states.reports.loading,
        error: states.reports.error,
        report: getForMatchId(states.reports, customProps.matchId),
        shouldPostReport: states.reports.shouldPostReport
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        fetchForMatchId: (matchId: number) => dispatch(fetchForMatchId(matchId)),
        createForMatchId: (matchId: number) => dispatch(createForMatchId(matchId))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(MatchReportCreator);
