import React, { Component } from 'react';
import EndGame from './EndGame';

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isX: false,
      board: [],
      tiles: [],
      winner: '',
      isFinished: false
    }
  }

  handleTile = (x, y, e) => {
    const { isX, board } = this.state;
    e.target.innerHTML = isX ? 'X' : 'O';
    this.setState({ isX: !isX });
    board.find((el) => el.x === x && el.y === y).tile = e.target.innerHTML;
    e.target.disabled = true;
  }

  refreshPage() {
    
  }

  generateBoard() {
    let tiles = [];
    let board = [];
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        board.push({ x, y, tile: '' });
        tiles.push(
          <button
            key={`${x}-${y}`}
            className='tile'
            disabled={this.state.isFinished ? true : false}
            onClick={(e) => this.handleTile(x, y, e)} />
        );
      };
    }
    this.setState({ tiles, board });
  }

  checkIfWon(tiles) {
    if (
      (tiles.filter(({ x, y }) => x + y === 2).length === 3) ||
      (tiles.filter(({ x, y }) => x === 0).length === 3) ||
      (tiles.filter(({ x, y }) => x === y).length === 3) ||
      (tiles.filter(({ x, y }) => x === 1).length === 3) ||
      (tiles.filter(({ x, y }) => x === 2).length === 3) ||
      (tiles.filter(({ x, y }) => y === 0).length === 3) ||
      (tiles.filter(({ x, y }) => y === 1).length === 3) ||
      (tiles.filter(({ x, y }) => y === 2).length === 3)
    ) return true;
    return false;
  }

  componentDidMount() {
    this.generateBoard();
  }

  componentDidUpdate(prevProps, prevState) {
    const { playerX, playerO } = this.context;
    const { board } = this.state;
    const tilesX = board.filter(({ tile }) => tile === 'X');
    const tilesO = board.filter(({ tile }) => tile === 'O');

    if (this.checkIfWon(tilesO)) {
      if (prevState.isFinished === false) {
        this.setState(({ isFinished: true }));
        this.setState(({ winner: playerO }));
      }
    }

    if (this.checkIfWon(tilesX)) {
      if (prevState.isFinished === false) {
        this.setState(({ isFinished: true }));
        this.setState(({ winner: playerX }));
      }
    }
  }

  render() {
    const { isX, tiles, isFinished, winner } = this.state;
    const { playerX, playerO } = this.context;
    return (
      <>
        <div className='flex-column'>
          {isFinished
            ? <h2>{playerO} and {playerX} played a game and {winner} won!</h2>
            : <h2>{isX ? playerX : playerO}'s turn</h2>}
          <div className='flex-wrap'>{tiles}</div>
          <button onClick={this.refreshPage}>Restart</button>
        </div>
      </>
    )
  }
}