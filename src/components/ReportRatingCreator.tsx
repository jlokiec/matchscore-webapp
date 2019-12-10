import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { rateReport } from '../actions/reports';
import { RateReportDto } from '../models/RateReportDto';

interface CustomProps {
    reportId: number,
}

interface StateProps {

}

interface DispatchProps {
    rateReport: (ratingDto: RateReportDto) => void
}

interface ReportRatingCreatorState {
    rating: string,
    rated: boolean,
    comment: string
}

type ReportRatingCreatorProperties = StateProps & CustomProps & DispatchProps;

class ReportRatingCreator extends React.Component<ReportRatingCreatorProperties, ReportRatingCreatorState> {
    constructor(props: ReportRatingCreatorProperties) {
        super(props);

        this.state = {
            rating: "0",
            rated: false,
            comment: ""
        };

        this.postRating = this.postRating.bind(this);
    }

    postRating(e: React.FormEvent) {
        e.preventDefault();

        const rating: RateReportDto = {
            reportId: this.props.reportId,
            rating: parseInt(this.state.rating),
            ratingTimestamp: Math.floor(new Date().getTime() / 1000),
            comment: this.state.comment
        };

        this.setState({ rated: true, comment: "" });
        this.props.rateReport(rating);
    }

    populateRatingValues() {
        let ratings: Array<number> = [];

        for (let i = -10; i <= 10; i++) {
            ratings.push(i);
        }

        return (
            <Form.Control
                as="select"
                value={this.state.rating}
                onChange={(e: any) => { this.setState({ rating: e.target.value }) }}
            >
                {ratings.map(rating => <option key={rating}>{rating}</option>)}
            </Form.Control>
        );
    }

    showRatingControls() {
        if (this.state.rated) {
            return (<p>Raport został już oceniony</p>);
        } else {
            return (
                <div>
                    <Form onSubmit={this.postRating}>
                        <Form.Group>
                            <Form.Label>Ocena</Form.Label>
                            {this.populateRatingValues()}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Komentarz</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                value={this.state.comment}
                                onChange={(e: any) => { this.setState({ comment: e.target.value }) }} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Wyślij</Button>
                    </Form>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.showRatingControls()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, customProps: CustomProps): DispatchProps => {
    return {
        rateReport: (ratingDto: RateReportDto) => dispatch(rateReport(ratingDto))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(null, mapDispatchToProps)(ReportRatingCreator);
