import { units } from '../data/units'

export function deployUnit(hero) {
  return {
    ...units.find(u => u.name === hero.unitType),
    color: hero.color,
  }
}
