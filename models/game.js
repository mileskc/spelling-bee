const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Game = new Schema(
  {
    gameNum: Number,
    letters: Array,
    wordList: Array,
    numWords: Number,
    pangram: String,
    isCompleted: Boolean,
    maxScore: Number,
    genius: Number
  },
  { timestamps: true }
)

module.exports = mongoose.model('games', Game)