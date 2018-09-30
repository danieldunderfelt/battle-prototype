import faker from 'faker'
import { sample, get } from 'lodash'
import { units } from './units'

const colors = ['red', 'blue', 'green', 'yellow', 'darkslateblue']

function createCommander() {
  return {
    name: faker.name.firstName(),
    color: sample(colors, 1),
    unitType: get(sample(units, 1), 'name', '[no unit]'),
  }
}

function createHeroes(count) {
  const heroes = []

  for (let i = 0; i < count; i++) {
    heroes.push(createCommander())
  }

  return heroes
}

function createEnemies(count) {
  const enemies = []

  for (let i = 0; i < count; i++) {
    enemies.push(createCommander())
  }

  return enemies
}

function createGrid(rowLength, colLength) {
  const grid = []

  let col = 0
  let row = 0
  const totalTiles = rowLength * colLength

  for (let i = 0; i < totalTiles; i++) {
    grid.push({
      x: row,
      y: col,
      terrain: 'plain',
      current: [],
      effect: [],
    })

    if (row === rowLength - 1) {
      col = col + 1
      row = 0
    } else {
      row = row + 1
    }
  }

  return grid
}

export function getInitialGame(rowLength, colLength, heroes, enemies) {
  return {
    grid: createGrid(rowLength, colLength),
    heroes: createHeroes(heroes),
    enemies: createEnemies(enemies),
  }
}
