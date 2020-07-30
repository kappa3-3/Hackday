import React, { Component } from 'react';
import Board from './Board'

const stateContext = React.createContext();

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playerX: '',
      playerO: '',
      continue: false,
    }
  }

  handleNames = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    this.setState(state => state[id] = value);
  }

  startGame = (e) => {
    e.preventDefault();
    const { playerX, playerO } = this.state;
    if (playerX.length > 1 && playerO.length > 1) {
      this.setState({ continue: true })
    }
  }

  render() {
    return (
      <>
        {!this.state.continue ?
          <form className='flex-column'>
            <div className='fixed-width'>
              <div className='player-name'>
                <label htmlFor='playerO'>First player</label>
                <input id='playerO' onBlur={this.handleNames} />
              </div>
              <div className='player-name'>
                <label htmlFor='playerX'>Second player</label>
                <input id='playerX' onBlur={this.handleNames} />
              </div>
            </div>
            <button onClick={this.startGame} className='action-btn'>Start </button>
          </form>
          : <stateContext.Provider value={this.state}>
            <Board />
          </stateContext.Provider>
        }
      </>
    )
  }
}

Board.contextType = stateContext;
export default Home;