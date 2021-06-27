import Board from './Board';
import React from 'react';
import {calculateWinner} from './helpers';

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
       history: [{
         squares: Array(9).fill(null)
       }],
       stepNumber: 0,
       xIsNext: true,
    }
  }

  handleClick(i) {
    //Copy the array
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //If won or same square, return
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    //Modify the copied object
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    //Set the entire state (not just a portion of state)
    //Concat is preferred over push() due to no mutations
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move # ${move}`:
        `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`

    return (
      <div className="game">
        <div className="game-board">
          <Board
           squares={current.squares}
           onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;