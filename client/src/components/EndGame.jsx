import React, { Component } from 'react';

export default class EndGame extends Component{
  constructor(props){
    super(props);
    this.setState = this.props.state;
  }

  componentDidMount(){

  }

  render(){
    const {winner, playerO, playerX} = this.props;
    return(
      <h2>
        {playerO} and {playerX} played a game and {winner} won!
      </h2>
    )
  }
}

