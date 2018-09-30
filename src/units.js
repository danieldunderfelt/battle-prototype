// Acts on an enemy unit prop
export const weapons = {
  sword: { act: 'hp', value: 2, range: 1 },
  broadsword: { act: 'hp', value: 3, range: 1 },
  club: { act: 'hp', value: 3, range: 1 },
  longbow: { act: 'hp', value: 2, range: [2, 3] },
  knife: { act: 'hp', value: 1, range: 1 },
  destruction_spell: { act: 'hp', value: 3, range: [1, 3] },
  area_destruction_spell: { act: 'hp', value: 1, range: [2, 3], aoe: 2 },
}

// Acts on a friendly unit prop
export const buffs = {
  minor_heal: { act: 'health', value: 1, range: 1 },
  heal: { act: 'health', value: 2, range: 1 },
  area_heal: { act: 'health', value: 1, range: [2, 3], aoe: 2 },
  defense: { act: 'defense', value: 2, range: 1 },
  damage: { act: 'attack.damage', value: 1, range: 1 },
}

// Acts on an enemy unit prop
export const debuffs = {
  defense_down: { act: 'defense', value: 1, range: [1, 2] },
  attack_down: { act: 'attack.damage', value: 1, range: [1, 2] },
  slow: { act: 'move', value: 1, range: [1, 2] },
  blind: { act: 'attack.range', value: 1, range: [2, 3] },
}

export const effects = {
  stealth: { name: 'stealth', range: 1 }, // range = how close the enemy has to be to detect
  detect: { name: 'detect', range: 3 },
}

export const units = [
  {
    name: 'knight',
    attack: [weapons.broadsword],
    hp: 3,
    defense: 1,
    move: 4,
    sight: 2,
  },
  {
    name: 'paladin',
    attack: [weapons.sword],
    buffs: [buffs.minor_heal],
    debuffs: [debuffs.attack_down],
    hp: 4,
    defense: 2,
    move: 4,
    sight: 2,
  },
  {
    name: 'archer',
    attack: [weapons.longbow],
    hp: 2,
    defense: 0,
    move: 2,
    sight: 3,
  },
  {
    name: 'warlock',
    attack: [weapons.destruction_spell, weapons.area_destruction_spell],
    buffs: [buffs.minor_heal],
    hp: 3,
    defense: 0,
    move: 3,
    sight: 2,
  },
  {
    name: 'brute',
    attack: [weapons.club],
    hp: 5,
    defense: 2,
    move: [2, 5],
    sight: 1,
  },
  {
    name: 'stalker',
    attack: [weapons.knife],
    debuffs: [debuffs.attack_down, debuffs.blind],
    effects: [effects.stealth],
    hp: 2,
    defense: 1,
    move: 6,
    sight: 5,
  },
  {
    name: 'mystic',
    attack: [],
    buffs: [buffs.defense, buffs.damage],
    debuffs: [debuffs.attack_down, debuffs.blind],
    hp: 2,
    defense: 0,
    move: 4,
    sight: 2,
  },
  {
    name: 'druid',
    attack: [],
    buffs: [buffs.heal, buffs.area_heal],
    debuffs: [debuffs.defense_down, debuffs.slow],
    hp: 2,
    defense: 0,
    move: 4,
    sight: 2,
  },
  {
    name: 'guardian',
    attack: [weapons.broadsword],
    effects: [effects.detect],
    hp: 5,
    defense: 5,
    move: 2,
    sight: 4,
  },
]
