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
  }

  fetchData() {
    fetch('/playedgames')
      .then(res => res.json())
      .then(games => this.setState(({ games: games })))
  }

  renderInfo(game) {
    const { playerO, playerX, isDraw } = game;
    const string =
      isDraw
        ? `There was a draw between ${playerO} and ${playerX}`
        : `${playerX} won with ${playerO}`
    return string;
  }

  render() {
    const { games } = this.state;
    const previousGames = games.map((game, i) => <li key={i}>{this.renderInfo(game, i)}</li>);
    return (
      <div>
        <h1>Played games so far:</h1>
        <ol>
          {previousGames}
        </ol>
      </div>
    )
  }
}