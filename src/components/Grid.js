import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { COL_LENGTH, TILE_SIZE_REM } from '../config'
import Tile from './Tile'
import TileMenu from './TileMenu'
import { tileActions } from '../actions/tileActions'
import { tilePos } from '../helpers/tileHelpers'

@observer
class Grid extends Component {
  render() {
    const { grid, selectedTile, onTileClick } = this.props

    const selectedTileActions = tileActions(selectedTile)
    
    return (
      <div
        className="Grid"
        style={{
          width: '100%',
          height: `${COL_LENGTH * TILE_SIZE_REM}rem`,
        }}>
        {grid.map((tile, idx) => (
          <Tile onClick={onTileClick} tile={tile} key={`tile_${idx}`} />
        ))}
        {selectedTile !== null && selectedTileActions.length !== 0 && (
          <TileMenu
            actions={tileActions(selectedTile)}
            top={tilePos(selectedTile.y)}
            left={tilePos(selectedTile.x)}
          />
        )}
      </div>
    )
  }
}

export default Grid
