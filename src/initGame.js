import faker from 'faker'
import { sample, get, nth } from 'lodash'
import { units } from './data/units'
import { features } from './data/tiles'

const colors = ['red', 'blue', 'green', 'yellow', 'darkslateblue']

function createCommander() {
  return {
    name: faker.name.firstName(),
    color: sample(colors, 1),
    unitType: get(sample(units, 1), 'name', '[no unit]'),
  }
}

function createHeroes() {
  const heroes = []

  for (let i = 0; i < 5; i++) {
    heroes.push(createCommander())
  }

  return heroes
}

function createEnemies() {
  const enemies = []

  for (let i = 0; i < 5; i++) {
    enemies.push(createCommander())
  }

  return enemies
}

function getCommanderIndex(col) {
  return Math.floor(col / 2)
}

function createGrid(rowLength, colLength, topCommanders, bottomCommanders) {
  const grid = []

  let col = 0
  let row = 0
  const totalTiles = rowLength * colLength

  for (let i = 0; i < totalTiles; i++) {
    const tile = {
      x: row,
      y: col,
      terrain: 'plain',
      current: [],
      effect: [],
      features: []
    }
  
    const commanderIndex = getCommanderIndex(row)
    
    if(col === 0) {
      const commander = nth(topCommanders, commanderIndex)
      tile.features.push(features.deploy(commander))
    }
    
    if(col === colLength - 1) {
      const commander = nth(bottomCommanders, commanderIndex)
      tile.features.push(features.deploy(commander))
    }
    
    grid.push(tile)

    if (row === rowLength - 1) {
      col = col + 1
      row = 0
    } else {
      row = row + 1
    }
  }

  return grid
}

export function getInitialGame(rowLength, colLength) {
  const heroes = createHeroes()
  const enemies = createEnemies()
  const grid = createGrid(rowLength, colLength, enemies, heroes)
  
  return {
    heroes,
    enemies,
    grid
  }
}
