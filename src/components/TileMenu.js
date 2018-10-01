import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class TileMenu extends Component {
  render() {
    const { actions, top, left } = this.props

    return (
      <div className="TileMenu" style={{ top, left }}>
        {actions.map(action => (
          <button
            key={`action_${action.name}`}
            onClick={action.action}>
            {action.label}
          </button>
        ))}
      </div>
    )
  }
}

export default TileMenu
