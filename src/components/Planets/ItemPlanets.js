import React, { Component } from 'react'

export default class ItemPlanets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: [],
            currentPage: 1,
            todosPerPage: 10,
        };
    }
    async componentWillMount(a) {
        debugger
        

              fetch(this.props.id)
              .then(res => res.json())
              .then(
                (result) => {
                    debugger
                    this.setState({ dataFilter: [result]})
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )      
    }
    componentWillReceiveProps(next_props) {
        // this.setState({ dataFilter: [] })
        // fetch('https://swapi.co/api/films/1')
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             throw new Error('Something went wrong ...');
        //         }
        //     })
        //     .then(data => this.setState({ dataFilter: data.results }))
        //     .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        debugger
        const renderTodos = this.state.dataFilter.map((number,index) => {
            return <div key={index}  >{number.name}</div>
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