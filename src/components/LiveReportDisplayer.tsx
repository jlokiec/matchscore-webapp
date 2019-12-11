import React from 'react';
import { Report } from '../models/Report';
import MatchReportDisplayer from './MatchReportDisplayer';
import { myAxios } from '../utils/axios';
import { AxiosError } from 'axios';
import * as api from '../constants/api';

interface LiveReportDisplayerProps {
    matchId: number
}

interface LiveReportDisplayerState {
    report?: Report,
    error?: AxiosError
}

export default class LiveReportDisplayer extends React.Component<LiveReportDisplayerProps, LiveReportDisplayerState> {
    constructor(props: LiveReportDisplayerProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        myAxios().get(api.LIVE_REPORTS, {
            params: {
                matchId: this.props.matchId
            }
        })
            .then(response => this.setState({ report: response.data }))
            .catch((error: AxiosError) => this.setState({ error: error }))
    }

    render() {
        if (this.state.report) {
            return (<MatchReportDisplayer report={this.state.report} />);
        } else if (this.state.error && this.state.error.message === 'Request failed with status code 404') {
            return <h1>Z tego meczu nie jest prowadzona relacja</h1>
        } else {
            return <h1>Wystąpił błąd</h1>
        }
    }
}
