const db = require("../db/index.js")
const Game = require('../models/game')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const games = [
    {
      gameNum: 1,
      letters: ['l', 'c', 'm', 'n', 'o', 'u', 'y'],
      wordList: ["uncommonly", "cloy", "colon", "colony", "column", "commonly", "cool", "coolly", "coyly", "cull", "loco", "loll", "loom", "loon", "loony", "lull", "lulu", "moll", "mull", "null", "nylon", "only", "uncool"],
      numWords: 23,
      pangram: "uncommonly",
      isCompleted: false,
      maxScore: 82,
      genius: 57
    },
    {
      gameNum: 2,
      letters: ['a', 'c', 'h', 'p', 't', 'u', 'z'],
      wordList: ["chutzpah", "attach", "captcha", "catch", "catchup", "chap", "chat", "hatch", "hath", "hatha", "huzzah", "pact", "papa", "patch", "path", "phat", "pupa", "tach", "tact", "tapa", "taut", "that", "thatch"],
      numWords: 23,
      pangram: "chutzpah",
      isCompleted: false,
      maxScore: 80,
      genius: 56
    },
    {
      gameNum: 3,
      letters: ['r', 'a', 'd', 'i', 'w', 'y', 'z'],
      wordList: ["wizardry", "airway", "airy", "aria", "arid", "array", "award", "awry", "dairy", "diary", "draw", "dray", "dryad", "radar", "radii", "raid", "razz", "ward", "wary", "wayward", "wiry", "wizard", "yard"],
      numWords: 23,
      pangram: "wizardry",
      isCompleted: false,
      maxScore: 81,
      genius: 57
    }
  ]
  await Game.insertMany(games)
  console.log('created games')
}

const run = async () => {
  await main()
  db.close()
}

run()