import React, { Component } from 'react'
import './App.css';
import Header from './components/Header/Header';
import People from './components/People/People';
import Films from './components/Films/Films';
import ItemFilms from './components/Films/ItemFilms';

import ItemPlanets from './components/Planets/ItemPlanets';
import Planets from './components/Planets/Planets';
import { BrowserRouter as Router, Route } from 'react-router-dom'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleFindChange = this.handleFindChange.bind(this);
    this.state = { filterText: '', filterType: '' };
  }
  handleFindChange(text, type) {
    this.setState({ filterText: text, filterType: type, id:0 });
  }
  render() {
    const routes = [
      {
        path: '/',
        exact: true,
        sidebar: () => <div>People!</div>,
        main: () => <People filterText={this.state.filterText} />
      },
      {
        path: '/Films',
        exact: true,
        sidebar: () => <div>Films!</div>,
        main: () => <Films filterText={this.state.filterText} />
      },
      {
        path: '/Planets',
        exact: true,
        sidebar: () => <div>Planets!</div>,
        main: () => <Planets filterText={this.state.filterText} />
      },
      {
        path: '/People/:peopleId/Films',
        exact: true,
        sidebar:  (a) => <div>{'/People/Films'}</div>,
        main: (a) => {
          debugger
          if(a.location.estado!==undefined){
            const items = a.location.estado.list.map((post) => 
            <ItemFilms key={post} id ={post}>
                      </ItemFilms>
            )
            return items;
          }else{
            window.location.assign("http://localhost:3000/");
          }
          
        }
      },
      {
        path: '/People/:peopleId/Films/:filmsId',
        exact: true,
        sidebar:  (a) => <div>{'/People/Films/Planets'}</div>,
        main: (a) => {
          if(a.location.estado!==undefined){
            const items = a.location.estado.list.map((post) => 
            <ItemPlanets key={post} id ={post}>
                      </ItemPlanets>
            )
            return items;
          }else{
            window.location.assign("http://localhost:3000/");
          }
        }
      },
      {
        path: '/Films/:filmsId',
        exact: true,
        sidebar:  (a) => <div>{'Films/Planets'}</div>,
        main: (a) => {
          if(a.location.estado!==undefined){
            const items = a.location.estado.list.map((post) => 
            <ItemPlanets key={post} id ={post}>
                      </ItemPlanets>
            )
            return items;
          }else{
            window.location.assign("http://localhost:3000/");
          }
        }
      }
      
    ]
    return (
      <div className="App">
        <Router>
        <Header onFilter={this.handleFindChange} />
        {this.state.filterText}
        
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '10px' }}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
