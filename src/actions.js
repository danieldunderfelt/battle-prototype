import { units } from './units'
import { action } from 'mobx'

export const deployUnit = hero =>
  action(tile => {
    const unit = {
      ...units.find(u => u.name === hero.unitType),
      color: hero.color,
    }

    tile.current.push(unit)

    return tile
  })
