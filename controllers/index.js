const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Game = require('../models/game');
const db = require('../db')

db.on('error', console.error.bind(console,"MongoDB connection error:"))

const SALT_ROUNDS = 11
const TOKEN_KEY = 'nytspellingbeegame'

const signUp = async(req, res) => {
  try{
    const {username, email, password} = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({
      username,
      email,
      password_digest
    })

    await user.save()

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    return res.status(201).json({user, token})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
}

const signIn = async (req,res) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({username:username})
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email
      }
      const token = jwt.sign(payload, TOKEN_KEY)
    return res.status(201).json({user, token})
    } else {
      res.status(401).send('Wrong username and/or password')
    }
    
  }catch(error) {
    return res.status(500).json({error: error.message})
  }
}

const verifyUser = async(req,res) => {
  try{
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, TOKEN_KEY)
    res.json({user})
  }catch(error) {
    return res.status(401).send("Want your progress saved? Sign up for an account :)")
  }
}

const changePassword = async(req,res) => {
  try {
    let user = await User.findById(req.params.id)
    const {oldPassword, newPassword} = req.body
    if (await bcrypt.compare(oldPassword, user.password_digest)) {
      const password_digest = await bcrypt.hash(newPassword, SALT_ROUNDS)
      user = await User.findByIdAndUpdate(req.params.id, {password_digest: password_digest}, {new:true})
      const payload = ({
        id: user._id,
        username: user.username,
        email: user.email
      })
      const token = jwt.sign(payload, TOKEN_KEY)
      return res.status(201).json(user, token)
    }
  }catch(error) {
    console.log("Something went wrong trying to change the password")
    return res.status(400).json({error: error.message})
  }
}

const getAllUsers = async(req,res) => {
  try {
    const users = await User.find()
    return res.status(200).json({users})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const createGame = async(req,res) => {
  try{
    const game = await new Game(req.body)
    await game.save()
    return res.status(201).json({
      game,
    })
  }catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const getAllGames = async(req,res) => {
  try{
    const games = await Game.find()
    return res.status(200).json({games})
  }catch (error){
    return res.status(500).json({error: error.message})
  }
}

const getGameById = async (req,res) => {
  try{
    const {id} = req.params
    const game = await Game.findById(id)
    if (game) {
      return res.status(200).json({game})
    }
    return res.status(404).send('Game with the specified ID does not exist')
  }catch{
    return res.status(500).json({error: error.message})
  }
}

const updateGame = async(req,res) => {
  try{
    const {id} = req.params
    await Game.findByIdAndUpdate(id, req.body, {new:true}, (err,game) => {
      if(err) {
        res.status(500).send(err)
      }
      if(!game) {
        res.status(500).send('Game not found')
      }
      return res.status(200).json(game)
    })
  } catch(error){
    return res.status(500).send(error.message)
  }
}

const deleteGame = async (req, res) => {
  try {
      const { id } = req.params;
      const deleted = await Game.findByIdAndDelete(id)
      if (deleted) {
          return res.status(200).send("Game deleted");
      }
      throw new Error("Game not found");
  } catch (error) {
      return res.status(500).send(error.message);
  }
}

module.exports = {
  signUp,
  signIn,
  verifyUser,
  changePassword,
  getAllUsers,
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
}