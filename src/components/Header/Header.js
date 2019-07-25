import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


import { Link, } from 'react-router-dom'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.props.onFilter(e.target.value,'');
    }
    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/">People</Link></Nav.Link>
                        <Nav.Link ><Link to="/Films">Films</Link></Nav.Link>
                        <Nav.Link><Link to="/Planets">Planets</Link></Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            onChange={this.onChange} />
                    </Form>
                </Navbar>
            </div >
        )
    }
}