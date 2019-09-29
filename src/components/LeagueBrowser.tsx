import React from 'react';
import { League } from '../models/League';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import * as api from '../constants/Api';

interface LeagueBrowserProperties {
    categoryId: number
}

interface LeagueBrowserState {
    loading: boolean,
    error: boolean,
    leagues: Array<League>
}

export default class LeagueBrowser extends React.Component<LeagueBrowserProperties, LeagueBrowserState>{
    constructor(props: LeagueBrowserProperties) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            leagues: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(api.LEAGUES, {
            params: {
                category: this.props.categoryId
            }
        })
            .then(response => this.setState({ loading: false, leagues: response.data }))
            .catch(error => {
                this.setState({ loading: false, error: true });
                console.error(`Error while fetching league data: ${JSON.stringify(error)}`);
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }
        if (!this.state.loading && this.state.error) {
            return (
                <div className="d-flex justify-content-center">
                    <Alert key={1} variant="danger">Błąd pobierania danych</Alert>
                </div>
            );
        }
        return (
            <ListGroup variant="flush">
                {this.state.leagues.map(league => <ListGroup.Item key={league.id}>{league.name}</ListGroup.Item>)}
            </ListGroup>
        );
    }
}
