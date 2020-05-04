import React from 'react'
import api from '../services/apiConfiguration'
import axios from 'axios'

class GameList extends React.Component {
  constructor(){
  super()
  this.state={
    currentGame: 0,
    games: []
  }
  }

  componentDidMount = () => {
    this.getAllGames()
    console.log("called")
   
  }

  getAllGames = async () => {
   const resp = await axios.get(`http://localhost:3000/api/games`)
   this.setState({
     games: resp.data.games
   })
   console.log("get games called")
   console.log(this.state.games)
  }

  render(){
    return(
      <>
        {this.state.games.map(game=>
          <h1>Game {game.gameNum}</h1>
        )}
        
      </>
    )
  }
}

export default GameList