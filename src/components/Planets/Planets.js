import React, { Component } from 'react'
import sortBy from 'sort-array'

export default class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: [],
            currentPage: 1,
            todosPerPage: 10,
        };
    }
    async componentDidMount() {
        const people = await fetch('https://swapi.co/api/planets/?search=' + this.props.filterText)
        const data = await people.json()
        this.setState({ dataFilter: sortBy(data.results,'name') })
    }
    componentWillReceiveProps(next_props) {
        this.setState({ dataFilter: [] })
        fetch('https://swapi.co/api/planets/?search=' + next_props.filterText)
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
            return <div key={number.mass}  >{number.name}</div>
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