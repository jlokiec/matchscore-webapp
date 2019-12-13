import React from 'react';
import { Report } from '../models/Report';
import MatchReportDisplayer from './MatchReportDisplayer';
import { myAxios } from '../utils/axios';
import { AxiosError } from 'axios';
import * as api from '../constants/api';
import Button from 'react-bootstrap/Button';

interface LiveReportDisplayerProps {
    matchId: number,
    goBack: Function
}

interface LiveReportDisplayerState {
    report?: Report,
    error?: AxiosError,
    timerId?: number
}

const UPDATE_INTERVAL = 30 * 1000;

export default class LiveReportDisplayer extends React.Component<LiveReportDisplayerProps, LiveReportDisplayerState> {
    constructor(props: LiveReportDisplayerProps) {
        super(props);
        this.state = {};
        this.fetchLiveReport = this.fetchLiveReport.bind(this);
        this.goBackToList = this.goBackToList.bind(this);
    }

    fetchLiveReport() {
        myAxios().get(api.LIVE_REPORTS, {
            params: {
                matchId: this.props.matchId
            }
        })
            .then(response => this.setState({ report: response.data }))
            .catch((error: AxiosError) => this.setState({ error: error }))
    }

    componentDidMount() {
        this.fetchLiveReport();
        let timerId = +setInterval(this.fetchLiveReport, UPDATE_INTERVAL);
        this.setState({ timerId: timerId });
    }

    componentWillUnmount() {
        if (this.state.timerId) {
            clearInterval(this.state.timerId);
        }
    }

    goBackToList() {
        this.props.goBack();
    }

    render() {
        if (this.state.report) {
            return (
                <div>
                    <Button onClick={this.goBackToList} variant="primary">Wróć</Button>
                    <MatchReportDisplayer report={this.state.report} />
                </div>
            );
        } else {
            return <h1>Z tego meczu nie jest prowadzona relacja</h1>
        }
    }
}
