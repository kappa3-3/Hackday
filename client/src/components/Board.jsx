import React, { Component } from 'react';
import uuid from 'react-uuid';

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isX: false,
      board: [],
      tiles: [],
      winner: '',
      isFinished: false,
      isDraw: false
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
    window.location.reload(true);
  }

  saveTheResult = () => {
    const { playerX, playerO } = this.context;
    const { winner, isDraw, board} = this.state;
    const playedGame = {
      id: uuid(),
      playerX,
      playerO,
      isDraw,
      winner,
      board
    }

    fetch('http://localhost:8080/playedgames', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playedGame)
    }).catch(e => console.log(e))
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

  checkIfDraw(board) {
    return board.filter(({tile}) => tile.length > 0).length === 9 ? true : false;
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
        // this.setState(({tiles}) => tiles.forEach(button => button.props.disabled = true))
      }
    } else {
      if (this.checkIfDraw(board)) {
        if (prevState.isDraw === false) {
          this.setState(({ isDraw: true }));
        }
      }
    }

    if (this.checkIfWon(tilesX)) {
      if (prevState.isFinished === false) {
        this.setState(({ isFinished: true }));
        this.setState(({ winner: playerX }));
      }
    } else {
      if (this.checkIfDraw(board)) {
        if (prevState.isDraw === false) {
          this.setState(({ isDraw: true }));
        }
      }
    }
    
    if(this.state.isFinished) {
      const allButtons = document.getElementsByTagName('button');
      Array.from(allButtons).forEach(btn => btn.disabled = true)
    }
  }

  render() {
    const { isX, tiles, isFinished, isDraw, winner } = this.state;
    const { playerX, playerO } = this.context;
    return (
      <>
        <div className='flex-column'>
          {
          isDraw 
          ? <h2>{playerO} and {playerX} played a game and there was a draw</h2>
          : isFinished
            ? <h2>{playerO} and {playerX} played a game and {winner} won!</h2>
            : <h2>{isX ? playerX : playerO}'s turn</h2>
          }
          <div className='flex-wrap'>{tiles}</div>
          <button onClick={this.refreshPage}>Restart</button>
          <button onClick={this.saveTheResult}>Save the game</button>
        </div>
      </>
    )
  }
}