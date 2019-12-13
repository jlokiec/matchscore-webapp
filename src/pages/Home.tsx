import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MatchList from '../components/MatchList';
import LiveReportDisplayer from '../components/LiveReportDisplayer';

interface HomeState {
    matchId?: number,
    showList: boolean,
    showReport: boolean
}

export default class Home extends React.Component<{}, HomeState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            showList: true,
            showReport: false
        };
        this.setMatchId = this.setMatchId.bind(this);
        this.goBackToList = this.goBackToList.bind(this);
    }

    setMatchId(matchId: number) {
        this.setState({ matchId: matchId, showList: false, showReport: true });
    }

    goBackToList() {
        this.setState({ matchId: undefined, showList: true, showReport: false });
    }

    showMatchList() {
        if (this.state.showList) {
            return (
                <div>
                    <h1 style={{ textAlign: "center" }}>Dzisiaj rozgrywane mecze</h1>
                    <MatchList setMatchId={this.setMatchId} timestamp={new Date().getTime()} />
                </div>
            );
        }
    }

    showMatchReport() {
        if (this.state.matchId && this.state.showReport) {
            return <LiveReportDisplayer matchId={this.state.matchId} goBack={this.goBackToList} />
        }
    }

    render() {
        return (
            <div>
                {this.showMatchList()}
                {this.showMatchReport()}
            </div>
        );
    }
}

export const HOME_NAME = "Strona główna";
