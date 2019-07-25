import React, { Component } from 'react'
import { Link, } from 'react-router-dom'
import sortBy from 'sort-array'

export default class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: [],
            currentPage: 1,
            todosPerPage: 10,
        };
    }
    async componentDidMount() {
        const people = await fetch('https://swapi.co/api/films/?search=' + this.props.filterText)
        const data = await people.json()
        this.setState({ dataFilter: sortBy(data.results,'title')})
    }
    componentWillReceiveProps(next_props) {
        this.setState({ dataFilter: [] })
        fetch('https://swapi.co/api/films/?search=' + next_props.filterText)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ dataFilter: sortBy(data.results,'name')}))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

        const renderTodos = this.state.dataFilter.map((number) => {
            return   <Link
            to={{pathname:window.location.pathname+"/"+
                    number.url.split('/')[number.url.split('/').length - 2],
            state: {
                list: number.planets
              },
              estado: {
                list: number.planets
              }
            }}
            key={number.mass}
            movieData={number} >
            {number.title}
            <br></br>
        </Link>
        });

        return (
            <div>
                <div>
                    {renderTodos}
                </div>
            </div>
        )
    }
}