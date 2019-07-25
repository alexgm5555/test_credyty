import React, { Component } from 'react'
import { Link, } from 'react-router-dom'

export default class ItemFilms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: [],
            currentPage: 1,
            todosPerPage: 10,
        };
    }
    async componentWillMount(a) {
        
              fetch(this.props.id)
              .then(res => res.json())
              .then(
                (result) => {
                    this.setState({ dataFilter: [result]})
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )      
    }

    render() {
        const renderTodos = this.state.dataFilter.map((number,index) => {
            return  <Link
            to={{pathname:window.location.pathname+"/"+
                    number.url.split('/')[number.url.split('/').length - 2],
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