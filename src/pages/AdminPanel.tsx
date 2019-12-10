import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HOME_NAME } from './Home';
import * as routing from '../constants/routing';
import PendingReportsBrowser from '../components/PendingReportsBrowser';
import ReportRateCreator from '../components/ReportRatingCreator';
import MatchReportDisplayer from '../components/MatchReportDisplayer';

interface AdminPanelState {
    reportId?: number
}

export default class AdminPanel extends React.Component<{}, AdminPanelState>{
    constructor(props: {}) {
        super(props);
        this.state = {};
        this.setReportId = this.setReportId.bind(this);
    }

    setReportId(reportId: number) {
        this.setState({ reportId: reportId });
    }

    showMatchList() {
        if (this.state.reportId === undefined) {
            return <PendingReportsBrowser setReportId={this.setReportId} />;
        }
    }

    showReportDisplayer() {
        if (this.state.reportId !== undefined) {
            return <MatchReportDisplayer reportId={this.state.reportId} />;
        }
    }

    showReportRatingCreator() {
        if (this.state.reportId !== undefined) {
            return <ReportRateCreator reportId={this.state.reportId} />;
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
