import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { LeagueCategory } from '../models/LeagueCategory';
import * as api from '../constants/Api';
import * as routing from '../constants/Routing';

interface CategoryBrowserState {
    loading: boolean,
    error: boolean,
    categories: Array<LeagueCategory>
}

export default class CategoryBrowser extends React.Component<any, CategoryBrowserState>{
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            categories: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(api.LEAGUE_CATEGORIES)
            .then(response => this.setState({ loading: false, categories: response.data }))
            .catch(error => {
                this.setState({ loading: false, error: true });
                console.error(`Error while fetching category data: ${JSON.stringify(error)}`);
            });
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
                {this.state.categories.map(category => <ListGroup.Item key={category.id}><Link to={`${routing.LEAGUES_PATH}/${category.id}`}>{category.name}</Link></ListGroup.Item>)}
            </ListGroup>
        );
    }
}