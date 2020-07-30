import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import PlayedGames from './PlayedGames'

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='flex-full-width'>
          <Link to='/playedgames' className='redirect'> See played games</Link>
          <Link to='/play' className='redirect'> Play a new game!</Link>
        </div>
        <Switch>
          <Route path='/playedgames' component={PlayedGames} />
          <Route axact path='/play' component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routing;
