import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import './Game.css'
import { getInitialGame } from '../initGame'
import { nth } from 'lodash'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { ROW_LENGTH, COL_LENGTH, TILE_SIZE_REM } from '../config'
import Commanders from './Commanders'
import Grid from './Grid'

const initialState = getInitialGame(ROW_LENGTH, COL_LENGTH)

@observer
class Game extends Component {
  @observable
  game = {
    ...initialState,
    turn: 'player',
    units: [],
    selectedTile: null,
    currentAction: null,
  }

  @action
  endTurn = () => {
    const { turn } = this.state
    const nextTurn = turn === 'player' ? 'opponent' : 'player'

    this.game.turn = nextTurn
  }

  onTileClick = tile => action(() => (this.game.selectedTile = tile))

  render() {
    const { grid, heroes, enemies, selectedTile } = this.game

    return (
      <div className="Game">
        <div className="Game" style={{ width: `${ROW_LENGTH * TILE_SIZE_REM}rem` }}>
          <Commanders characters={enemies} />
          <Grid grid={grid} selectedTile={selectedTile} onTileClick={this.onTileClick} />
          <Commanders characters={heroes} />
        </div>
      </div>
    )
  }
}

export default hot(module)(Game)
