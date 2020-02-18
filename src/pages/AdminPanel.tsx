import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';
import PendingReportsBrowser from '../components/PendingReportsBrowser';
import ReportRateCreator from '../components/ReportRatingCreator';
import MatchReportDisplayer from '../components/MatchReportDisplayer';
import { Report } from '../models/Report';

interface AdminPanelState {
    report?: Report
}

export default class AdminPanel extends React.Component<{}, AdminPanelState>{
    constructor(props: {}) {
        super(props);
        this.state = {};
        this.setReport = this.setReport.bind(this);
    }

    setReport(report: Report) {
        this.setState({ report: report });
    }

    showMatchList() {
        if (this.state.report === undefined) {
            return <PendingReportsBrowser setReport={this.setReport} />;
        }
    }

    showReportDisplayer() {
        if (this.state.report !== undefined) {
            return <MatchReportDisplayer report={this.state.report} />;
        }
    }

    showReportRatingCreator() {
        if (this.state.report !== undefined) {
            return <ReportRateCreator reportId={this.state.report.id} />;
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href={routing.HOME_ROUTE}>{HOME_NAME}</Breadcrumb.Item>
                    <Breadcrumb.Item active>{ADMIN_PANEL_NAME}</Breadcrumb.Item>
                </Breadcrumb>
                {this.showMatchList()}
                {this.showReportDisplayer()}
                {this.showReportRatingCreator()}
            </div>
        );
    }
}

export const ADMIN_PANEL_NAME = "Panel administracyjny";
