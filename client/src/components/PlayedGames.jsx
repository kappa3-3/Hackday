import React, { Component } from 'react';

export default class PlayedGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }
  componentDidMount() {
    this.fetchData()
    console.log(this.state.games);
  }

  fetchData() {
    fetch('/playedgames')
    .then(res => res.json())
    .then(games => this.setState(({games: games})))
  }

  render() {
    
  const games = this.state.games.map((game, i) => <span key={i}>{game.playerX} won with {game.playerO}</span>);
    return (
      <div>
        <h1>Played games so far:</h1>
        <div>
          { games }
        </div>
      </div>
    )
  }
}