import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import PlayedGames from './PlayedGames'
import EndGame from './EndGame.jsx'

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='flex-full-width'>
          <Link to='/playedgames' className='redirect'> See played games</Link>
          <Link to='/play' className='redirect'> Go to playground</Link>
        </div>
        <Switch>
          <Route path='/playedgames' component={PlayedGames} />
          <Route path='/play' component={Home} />
          <Route path='/end' component={EndGame} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routing;
