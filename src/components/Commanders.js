import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Commanders.css'

@observer
class Commanders extends Component {
  
  render() {
    const { characters } = this.props
    
    return (
      <div className="Commanders">
        { characters.map((character, idx) => (
          <div
            key={ `enemy_${idx}` }
            className="Character"
            style={ { background: character.color } }>
            <h3>{ character.name }</h3>
            <h4>{ character.unitType }</h4>
          </div>
        )) }
      </div>
    )
  }
}

export default Commanders
