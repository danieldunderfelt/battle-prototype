import { TILE_SIZE_REM } from '../config'

export function tilePos(value) {
  return `${value * TILE_SIZE_REM}rem`
}
