import React from 'react';
import axios from 'axios'
import '../styles/Hive.css'
import Shuffle from './Shuffle'
import HiveCell from './HiveCell';
import { Link } from 'react-router-dom'
import api from '../services/apiConfiguration';

let baseURL
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'http://spelling-bee-clone-backend.herokuapp.com'
}
let correctWords = []


class Hive extends React.Component {


  constructor(props) {
    super()
    this.state = {
      isGameCompleted: false,
      centerLetter: '',
      letters: [],
      currentWord: '',
      currentLetter: '',
      correctWords: correctWords,
      isBackspace: false,
      currGame: {},
      level: "Beginner",
      points: 0,
      maxScore: 0
    }
  }

  componentDidMount = () => {
    this.getGame()
    this.setState({
      correctWords: []
    })
    correctWords = []
  }

  getGame = async () => {
    // conditional - is there a user? then match params, else call game 1
    let gameNum
    this.props.user ? gameNum = this.props.match.params.id : gameNum = 1
    const resp = await axios.get(`${baseURL}/api/games/${gameNum}`)
    let outerLetters = [...resp.data.game.letters]
    let centerLetter = outerLetters.shift()
    this.setState({
      centerLetter: centerLetter,
      letters: outerLetters,
      currGame: resp.data.game,
      maxScore: resp.data.game.maxScore
    })
    return resp
  }

  shuffleLetters = () => {
    let outerLetters = [...this.state.letters]

    for (let i = 0; i < outerLetters.length; i++) {
      let j = Math.floor(Math.random() * Math.floor(outerLetters.length))
      let temp = outerLetters[i]
      outerLetters[i] = outerLetters[j]
      outerLetters[j] = temp

    }
    this.setState({
      letters: outerLetters
    })
  }

  handleShuffle = (e) => {
    e.preventDefault()
    this.shuffleLetters()
  }

  handleClick = (event) => {
    this.setState({
      currentWord: this.state.currentWord + event.target.id.toLowerCase(),
      currentLetter: event.target.id,
    })
    console.log(this.state.currentWord)
  }

  handleChange = (event) => {
    if (this.state.isBackspace === true) {
      this.setState({
        currentWord: this.state.currentWord.slice(0, this.state.currentWord.length - 1),
        isBackspace: false
      })
    } else {
      this.setState({
        isValid: false,
        currentLetter: event.target.id.toLowerCase(),
        currentWord: this.state.currentWord + event.target.value[event.target.value.length - 1].toLowerCase()
      })
    }
  }

  handleDelete = (event) => {
    if (event.key === "Backspace") {
      this.setState({
        isBackspace: true
      })
    }
  }

  handleDeleteButton = (e) => {
    e.preventDefault()
    this.setState({
      currentWord: this.state.currentWord.slice(0, this.state.currentWord.length - 1)
    })
  }

  checkValidity = () => {
    if (this.state.currentWord.length < 4) {
      alert("Too short")
      this.setState({
        currentWord: ''
      })
    } else if (this.state.currGame.wordList.includes(this.state.currentWord) && !correctWords.includes(this.state.currentWord)) {
      correctWords.push(this.state.currentWord)
      this.setState({
        isValid: true,
        correctWords: correctWords,
        currentWord: ''
      })
      if (this.state.currentWord.length === 4) {
        this.setState({
          points: this.state.points + 1
        }, () => { this.checkGameLevel(this.state.points) })
      } else if (this.state.currentWord === this.state.currGame.pangram) {
        this.setState({
          points: this.state.points + this.state.currentWord.length + 7
        }, () => { this.checkGameLevel(this.state.points) })
        alert("Pangram!")
      } else {
        this.setState({
          points: this.state.points + this.state.currentWord.length
        }, () => { this.checkGameLevel(this.state.points) })
      }
    } else if (correctWords.includes(this.state.currentWord)) {
      alert("Already found")
      this.setState({
        currentWord: ''
      })
    } else if (!this.state.currentWord.toLowerCase().includes(this.state.centerLetter)) {
      alert("Missing Center Letter")
      this.setState({
        currentWord: ''
      })
    } else if (!this.state.currGame.wordList.includes(this.state.currentWord)) {
      alert("Not in word list")
      this.setState({
        currentWord: ''
      })
    }
  }

  checkGameLevel = (points) => {
    if (points === this.state.maxScore) {
      this.setState({
        level: "Queen Bee"
      })
    }
    else if (points >= this.state.genius) {
      this.setState({
        level: "Genius"
      })
    }
    else if (points >= (this.state.maxScore * .5)) {
      this.setState({
        level: "Amazing"
      })
    }
    else if (points >= (this.state.maxScore * .4)) {
      this.setState({
        level: "Great"
      })
    }
    else if (points >= (this.state.maxScore * .26)) {
      this.setState({
        level: "Nice"
      })
    }
    else if (points >= (this.state.maxScore * .16)) {
      this.setState({
        level: "Solid"
      })
    }
    else if (points >= (this.state.maxScore * .09)) {
      this.setState({
        level: "Good"
      })
    }
    else if (points >= (this.state.maxScore * .05)) {
      this.setState({
        level: "Moving Up"
      })
    }
    else if (points > 0) {
      this.setState({
        level: "Good Start"
      })
    }
  }

  checkGameCompletion = async () => {
    if (correctWords.length === this.state.currGame.wordList.length) {
      alert("You've found all the words!")
      if (this.props.user) {
        let user = this.props.user
        let userId = user.id
        let gameNum = this.state.currGame.gameNum
        const resp = await api.put(`${baseURL}/api/users/${userId}`, { "id": userId, "gameNum": gameNum })
        this.setState({
          isGameCompleted: true
        })
        return resp.data
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.checkValidity()
    this.checkGameCompletion()
  }


  render() {
    const hiveCellData = [
      {
        point: "0,52 30,0 90,0 120,52 90,104 30,104",
        letter: this.state.letters[0]
      },
      {
        point: "0,52 30,0 90,0 120,52 90,104 30,104",
        letter: this.state.letters[1]
      },
      {
        point: "0,52 30,0 90,0 120,52 90,104 30,104",
        letter: this.state.letters[2]
      },
      {
        point: "0,52 30,0 90,0 120,52 90,104 30,104",
        letter: this.state.letters[3]
      },
      {
        point: "0,52 30,0 90,0 120,52 90,104 30,104",
        letter: this.state.letters[4]
      },
      {
        point: "0,52 30,0 90,0 120,52 90,104 30,104",
        letter: this.state.letters[5]
      }
    ]

    const textStyle = {
      fontFamily: 'Franklin',
      fontWeight: 'bold',
      fontSize: '25px'
    }

    {
      if (Object.keys(this.state.currGame).length === 0) {
        return (
          <div className="loading-page">
            <h1>Loading...</h1>
          </div>
        )
      } else {
        return (
          <>
            {this.props.user ? <Link className="games-link" to="/game-list">&#8592; Games</Link> : null}
            <div className="hiveComponent">
              <form>
                <input className="wordInput" id={this.state.currentLetter} onChange={this.handleChange}
                  onKeyDown={this.handleDelete} name="currentWord" value={this.state.currentWord} />
                <div className="hive">

                  <svg className="hive-cell">
                    <polygon className="hex-cell middle" points="0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
                    </polygon>
                    <text style={textStyle} id={this.state.centerLetter} onClick={this.handleClick} fill="black" x="55" y="60" >{this.state.centerLetter}</text>
                  </svg>
                  {hiveCellData.map(cell => {
                    return (<HiveCell handleClick={this.handleClick} point={cell.point} letter={cell.letter} />)
                  }
                  )}

                </div>
                <div className="buttons">
                  <button id="enterButton" type="submit" onClick={this.handleSubmit}>Enter</button>
                  <Shuffle centerLetter={this.state.centerLetter} handleShuffle={this.handleShuffle} />
                  <button id="delButton" onClick={this.handleDeleteButton}>Delete</button>
                </div>

              </form>

              <div className="scoring">
                <div id="levels">
                  <p id="levelName">{this.state.level && this.state.level}</p>
                  <p id="pointsNum">{this.state.points}</p>
                </div>
                <div id="correctWords">
                  <p id="foundWordsLabel">You have found {this.state.correctWords.length} words</p>
                  <div className="correctWordList">
                    {this.state.correctWords.map(word => {
                      return <p>{word}</p>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    }
  }
}

export default Hive