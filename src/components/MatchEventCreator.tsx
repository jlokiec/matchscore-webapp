import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CombinedState } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { postMatchEvent, fetchForReport } from '../actions/matchEvents';
import { ThunkDispatch } from 'redux-thunk';
import { CreateMatchEventDto } from '../models/CreateMatchEventDto';
import { MatchEvent, EventType, EventCategory } from '../models/MatchEvent';
import { getEventsForReport } from '../reducers/matchEventsReducer';

interface CustomProps {
    reportId: number
}

interface StateProps {
    loading: boolean,
    error?: object,
    matchEvents: Array<MatchEvent>,
}

interface DispatchProps {
    postMatchEvent: (data: CreateMatchEventDto) => void,
    fetchForReport: (reportId: number) => void
}

interface MatchEventCreatorState {
    homeEvent: EventType,
    homeEventDescription: string,
    awayEvent: EventType,
    awayEventDescription: string
}

type MatchEventCreatorProperties = StateProps & CustomProps & DispatchProps;

class MatchEventCreator extends React.Component<MatchEventCreatorProperties, MatchEventCreatorState> {
    constructor(props: MatchEventCreatorProperties) {
        super(props);

        this.state = {
            homeEvent: EventType.GOAL,
            homeEventDescription: '',
            awayEvent: EventType.GOAL,
            awayEventDescription: ''
        };

        this.createStartFirstHalfEvent = this.createStartFirstHalfEvent.bind(this);
        this.createEndFirstHalfEvent = this.createEndFirstHalfEvent.bind(this);
        this.createStartSecondHalfEvent = this.createStartSecondHalfEvent.bind(this);
        this.createEndSecondHalfEvent = this.createEndSecondHalfEvent.bind(this);

        this.createHomeEvent = this.createHomeEvent.bind(this);
        this.createAwayEvent = this.createAwayEvent.bind(this);

        this.disableStartFirstHalfButton = this.disableStartFirstHalfButton.bind(this);
        this.disableEndFirstHalfButton = this.disableEndFirstHalfButton.bind(this);
        this.disableStartSecondHalfEvent = this.disableStartSecondHalfEvent.bind(this);
        this.disableEndSecondHalf = this.disableEndSecondHalf.bind(this);
    }

    componentDidMount() {
        this.props.fetchForReport(this.props.reportId);
    }

    createStartFirstHalfEvent() {
        const event: CreateMatchEventDto = {
            timestamp: Math.floor(new Date().getTime() / 1000),
            eventType: EventType.FIRST_HALF_START,
            description: 'Początek pierwszej połowy',
            reportId: this.props.reportId,
            category: EventCategory.GENERAL
        }
        this.props.postMatchEvent(event);
    }

    disableStartFirstHalfButton() {
        return this.props.matchEvents.findIndex(e => e.eventType === EventType.FIRST_HALF_START) !== -1 ? true : false;
    }

    createEndFirstHalfEvent() {
        const event: CreateMatchEventDto = {
            timestamp: Math.floor(new Date().getTime() / 1000),
            eventType: EventType.FIRST_HALF_END,
            description: 'Koniec pierwszej połowy',
            reportId: this.props.reportId,
            category: EventCategory.GENERAL
        }
        this.props.postMatchEvent(event);
    }

    disableEndFirstHalfButton() {
        return this.props.matchEvents.findIndex(e => e.eventType === EventType.FIRST_HALF_END) !== -1 ? true : false;
    }

    createStartSecondHalfEvent() {
        const event: CreateMatchEventDto = {
            timestamp: Math.floor(new Date().getTime() / 1000),
            eventType: EventType.SECOND_HALF_START,
            description: 'Początek drugiej połowy',
            reportId: this.props.reportId,
            category: EventCategory.GENERAL
        }
        this.props.postMatchEvent(event);
    }

    disableStartSecondHalfEvent() {
        return this.props.matchEvents.findIndex(e => e.eventType === EventType.SECOND_HALF_START) !== -1 ? true : false;
    }

    createEndSecondHalfEvent() {
        const event: CreateMatchEventDto = {
            timestamp: Math.floor(new Date().getTime() / 1000),
            eventType: EventType.SECOND_HALF_END,
            description: 'Koniec drugiej połowy',
            reportId: this.props.reportId,
            category: EventCategory.GENERAL
        }
        this.props.postMatchEvent(event);
    }

    disableEndSecondHalf() {
        return this.props.matchEvents.findIndex(e => e.eventType === EventType.SECOND_HALF_END) !== -1 ? true : false;
    }

    createHomeEvent(e: React.FormEvent) {
        e.preventDefault();

        const event: CreateMatchEventDto = {
            timestamp: Math.floor(new Date().getTime() / 1000),
            eventType: this.state.homeEvent,
            description: this.state.homeEventDescription,
            reportId: this.props.reportId,
            category: EventCategory.HOME_TEAM
        }
        this.props.postMatchEvent(event);
    }

    createAwayEvent(e: React.FormEvent) {
        e.preventDefault();

        const event: CreateMatchEventDto = {
            timestamp: Math.floor(new Date().getTime() / 1000),
            eventType: this.state.awayEvent,
            description: this.state.awayEventDescription,
            reportId: this.props.reportId,
            category: EventCategory.AWAY_TEAM
        }
        this.props.postMatchEvent(event);
    }

    render() {
        return (
            <div>
                <ButtonGroup>
                    <Button
                        variant="primary"
                        onClick={this.createStartFirstHalfEvent}
                        disabled={this.disableStartFirstHalfButton()}
                    >Początek 1 połowy</Button>
                    <Button
                        variant="primary"
                        onClick={this.createEndFirstHalfEvent}
                        disabled={this.disableEndFirstHalfButton()}
                    >Koniec 1 połowy</Button>
                    <Button
                        variant="primary"
                        onClick={this.createStartSecondHalfEvent}
                        disabled={this.disableStartSecondHalfEvent()}
                    >Początek 2 połowy</Button>
                    <Button
                        variant="primary"
                        onClick={this.createEndSecondHalfEvent}
                        disabled={this.disableEndSecondHalf()}
                    >Koniec 2 połowy</Button>
                </ButtonGroup>

                <Container>
                    <Row>
                        <Col sm>
                            <h1 style={{textAlign:"center"}}>Gospodarze</h1>
                            <Form onSubmit={this.createHomeEvent}>
                                <Form.Group>
                                    <Form.Label>Wydarzenie</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={this.state.homeEvent}
                                        onChange={(e: any) => { this.setState({ homeEvent: e.target.value }) }}
                                    >
                                        <option value={EventType.GOAL}>gol</option>
                                        <option value={EventType.YELLOW_CARD}>żółta kartka</option>
                                        <option value={EventType.RED_CARD}>czerwona kartka</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label >Zawodnik</Form.Label>
                                    <Form.Control as="select" onChange={(e: any) => { this.setState({ homeEventDescription: e.target.value }) }}>
                                        <option>test1</option>
                                        <option>test2</option>
                                        <option>test3</option>
                                        <option>test4</option>
                                        <option>test5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">Wyślij</Button>
                            </Form>
                        </Col>
                        <Col sm>
                        <h1 style={{textAlign:"center"}}>Goście</h1>
                            <Form onSubmit={this.createAwayEvent}>
                                <Form.Group>
                                    <Form.Label>Wydarzenie</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={this.state.awayEvent}
                                        onChange={(e: any) => { this.setState({ awayEvent: e.target.value }) }}
                                    >
                                        <option value={EventType.GOAL}>gol</option>
                                        <option value={EventType.YELLOW_CARD}>żółta kartka</option>
                                        <option value={EventType.RED_CARD}>czerwona kartka</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label >Zawodnik</Form.Label>
                                    <Form.Control as="select" onChange={(e: any) => { this.setState({ awayEventDescription: e.target.value }) }}>
                                        <option>test1</option>
                                        <option>test2</option>
                                        <option>test3</option>
                                        <option>test4</option>
                                        <option>test5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">Wyślij</Button>
                            </Form></Col>
                    </Row>
                </Container>
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
        postMatchEvent: (data: CreateMatchEventDto) => dispatch(postMatchEvent(data)),
        fetchForReport: (reportId: number) => dispatch(fetchForReport(reportId))
    };
}

export default connect<StateProps, DispatchProps, CustomProps, CombinedState>(mapStateToProps, mapDispatchToProps)(MatchEventCreator);
