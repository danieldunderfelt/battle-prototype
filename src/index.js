import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import { getInitialGame } from './initGame'
import { deployUnit } from './actions'
import { nth } from 'lodash'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

const ROW_LENGTH = 10
const COL_LENGTH = 10
const TILE_SIZE_REM = 5

const HEROES = 5
const ENEMIES = 5

const initialState = getInitialGame(ROW_LENGTH, COL_LENGTH, HEROES, ENEMIES)

function tilePos(value) {
  return `${value * TILE_SIZE_REM}rem`
}

@observer
class App extends Component {
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

  getTileMenu = tile => {
    const actions = this.getTileActions(tile)

    return actions.length ? (
      <div
        className="TileMenu"
        style={{
          top: tilePos(tile.y),
          left: tilePos(tile.x),
        }}>
        {actions.map(action => (
          <button
            key={`action_${action.name}`}
            onClick={this.doTileAction(action, tile)}>
            {action.name}
          </button>
        ))}
      </div>
    ) : null
  }

  onTileClick = tile =>
    action(e => {
      this.game.selectedTile = tile
    })

  getTileActions = tile => {
    const { heroes } = this.game
    const tileRow = tile.y

    if (tileRow === COL_LENGTH - 1) {
      const hero = nth(heroes, Math.floor(tile.x / 2))
      return [{ name: 'deploy', action: deployUnit(hero) }]
    }

    return []
  }

  doTileAction = ({ action: tileAction }, tile) =>
    action(e => {
      tileAction(tile)
    })

  render() {
    const { grid, heroes, enemies, selectedTile, currentAction } = this.game

    return (
      <div className="App">
        <div
          className="Game"
          style={{ width: `${ROW_LENGTH * TILE_SIZE_REM}rem` }}>
          <div className="Enemies">
            {enemies.map((commander, idx) => (
              <div
                key={`enemy_${idx}`}
                className="Character"
                style={{ background: commander.color }}>
                <h3>{commander.name}</h3>
                <h4>{commander.unitType}</h4>
              </div>
            ))}
          </div>
          <div
            className="Grid"
            style={{
              width: '100%',
              height: `${COL_LENGTH * TILE_SIZE_REM}rem`,
            }}>
            {grid.map((tile, idx) => (
              <div
                key={`grid_${idx}`}
                className="Tile"
                onClick={this.onTileClick(tile)}
                style={{
                  top: tilePos(tile.y),
                  left: tilePos(tile.x),
                }}>
                {tile.current.map((unit, index) => (
                  <span
                    className="UnitIcon"
                    key={`unit_${index}`}
                    style={{ background: unit.color }}>
                    {unit.name.slice(0, 2)}
                  </span>
                ))}
              </div>
            ))}
            {selectedTile !== null &&
              currentAction === null &&
              this.getTileMenu(selectedTile)}
          </div>
          <div className="Heroes">
            {heroes.map((commander, idx) => (
              <div
                key={`hero_${idx}`}
                className="Character"
                style={{ background: commander.color }}>
                <h3>{commander.name}</h3>
                <h4>{commander.unitType}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
