import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { LeagueCategory } from '../models/LeagueCategory';
import * as api from '../constants/Api';

interface CategoryBrowserState {
    loading: boolean,
    error?: object,
    categories: Array<LeagueCategory>
}

export default class CategoryBrowser extends React.Component<any, CategoryBrowserState>{
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            categories: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(api.LEAGUE_CATEGORIES)
            .then(response => this.setState({ loading: false, categories: response.data }))
            .catch(error => this.setState({ loading: false, error: error.message }));
    }

    render() {
        return (
            <ListGroup variant="flush">
                {this.state.categories.map(category => <ListGroup.Item key={category.id}>{category.name}</ListGroup.Item>)}
            </ListGroup>
        );
    }
}