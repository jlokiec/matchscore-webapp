import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';
import MatchList from '../components/MatchList';
import MatchReportCreator from '../components/MatchReportCreator';

interface MatchListState {
    matchId?: number
}

export default class AddReport extends React.Component<{}, MatchListState>{
    constructor(props: {}) {
        super(props);
        this.state = {};
        this.setMatchId = this.setMatchId.bind(this);
    }

    setMatchId(matchId: number) {
        this.setState({ matchId: matchId });
    }

    showMatchList() {
        if (this.state.matchId === undefined) {
            return <MatchList setMatchId={this.setMatchId} timestamp={new Date().getTime()} />;
        }
    }

    showReportCreator() {
        if (this.state.matchId !== undefined) {
            return <MatchReportCreator matchId={this.state.matchId} />;
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                    <Breadcrumb.Item active>{ADD_REPORT_NAME}</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Dodawanie relacji</h1>
                {this.showMatchList()}
                {this.showReportCreator()}
            </div>
        );
    }
}

export const ADD_REPORT_NAME = "Dodaj relację";
