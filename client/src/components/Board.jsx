import React, { Component } from 'react';

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isX: false,
      board: [],
      tiles: [],
      winner: '',
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
            disabled={false}
            onClick={(e) => this.handleTile(x, y, e)} />
        );
      };
    }
    this.setState({ tiles, board });
  }

  checkIfWon(tiles, winner) {
    if (
      (tiles.filter(({ x, y }) => x + y === 2).length === 3) ||
      (tiles.filter(({ x, y }) => x === 0).length === 3) ||
      (tiles.filter(({ x, y }) => x === y).length === 3) ||
      (tiles.filter(({ x, y }) => x === 1).length === 3) ||
      (tiles.filter(({ x, y }) => x === 2).length === 3) ||
      (tiles.filter(({ x, y }) => y === 0).length === 3) ||
      (tiles.filter(({ x, y }) => y === 1).length === 3) ||
      (tiles.filter(({ x, y }) => y === 2).length === 3)
    ) {
    }
  }

  componentDidMount() {
    this.generateBoard();
  }

  
  componentDidUpdate() {
    const { playerX, playerO } = this.context;
    const { board } = this.state;
    const tilesX = board.filter(({ tile }) => tile === 'X');
    const tilesO = board.filter(({ tile }) => tile === 'O');
    this.checkIfWon(tilesX, playerX);
    this.checkIfWon(tilesO, playerO);
  }

  render() {
    return (
      <>
        <h2>{this.state.isX ? this.context.playerX : this.context.playerO}</h2>
        <div className='flex-wrap'>
          {this.state.tiles}
        </div>
        <button onClick={this.refreshPage}>Restart</button>
      </>
    )
  }
}