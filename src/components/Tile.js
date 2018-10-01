import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Tile.css'
import { tilePos } from '../helpers/tileHelpers'

@observer
class Tile extends Component {
  
  render() {
    const { tile, onClick } = this.props
    
    return (
      <div
        className="Tile"
        onClick={ onClick(tile) }
        style={ {
          top: tilePos(tile.y),
          left: tilePos(tile.x),
        } }>
        { tile.current.map((unit, index) => (
          <span
            className="UnitIcon"
            key={ `unit_${index}` }
            style={ { background: unit.color } }>
                    { unit.name.slice(0, 2) }
                  </span>
        )) }
      </div>
    )
  }
}

export default Tile
