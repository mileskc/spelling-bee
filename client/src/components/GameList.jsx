import React from 'react'
import axios from 'axios'
import '../styles/GameList.css'
import { Link } from 'react-router-dom'

class GameList extends React.Component {
  constructor() {
    super()
    this.state = {
      currentGame: 0,
      games: []
    }
  }

  componentDidMount = () => {
    this.getAllGames()
  }

  getAllGames = async () => {
    const resp = await axios.get(`http://localhost:3000/api/games`)
    this.setState({
      games: resp.data.games
    })
  }

  render() {
    return (
      <>
        <h1 className="welcome-user">Welcome back, <span>{this.props.user.username}</span>!</h1>
        < div className="game-list">
          {this.state.games.map(game =>
            <Link className="game-link" to={`/game-list/${game.gameNum}`}>
              <div className="game-thumbnail">
                <img id="game-photo" src="https://i.imgur.com/PRRP96C.png" />
                <h1 className="game-num">Game {game.gameNum}</h1>
              </div>
            </Link>
          )}
        </div>
      </>
    )
  }
}

export default GameList