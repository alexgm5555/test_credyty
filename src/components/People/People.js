import React, { Component } from 'react'
import { Link, } from 'react-router-dom'
import sortBy from 'sort-array'


export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: [],
            currentPage: 1,
            todosPerPage: 10,
        };

    }
    async componentDidMount() {
        const people = await fetch('https://swapi.co/api/people/?search=' + this.props.filterText)
        const data = await people.json()
        this.setState({ dataFilter: sortBy(data.results,'name') })
    }
    componentWillReceiveProps(next_props) {
        this.setState({ dataFilter: [] })
        fetch('https://swapi.co/api/people/?search=' + next_props.filterText)
            .then(response => {
                if (response.ok) {
                    console.log(sortBy(response.json().results,'name'))
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({ dataFilter: sortBy(data.results,'name') }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

        const renderTodos = this.state.dataFilter.map((number, index) => {
            return <span><Link
                to={{pathname:`People/` + number.url.split('/')[number.url.split('/').length - 2]+"/Films",
                state: {
                    list: number.films
                  },
                  estado: {
                    list: number.films
                  }
                }}
                key={index}
                movieData={number} >
                {number.name}
                <br></br>
                {/* {number.films.map((post) =>
                    <li key={post}>
                        {post}
                    </li>
                )} */}
            </Link></span>   
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