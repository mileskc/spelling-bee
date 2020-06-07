import React from 'react';
import axios from 'axios'
import '../styles/Hive.css'
// import wordData from '../data.js'
import Shuffle from './Shuffle'
// import InputBar from './InputBar'
import HiveCell from './HiveCell';
import api from '../services/apiConfiguration';

let correctWords = []

class Hive extends React.Component {


  constructor(props) {
    super()
    // let outerLetters = [...wordData[0].letters]
    // outerLetters.shift()
    this.state = {
      // centerLetter: [...wordData[0].letters[0]],
      // letters: [...outerLetters],
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
    // this.getAllGames()
    this.getGame()
    console.log("get game called")
  }

  getGame = async () => {
    // conditional - is there a user? then match params, else call game 1
    const gameNum = this.props.match.params.id
    const resp = await axios.get(`http://localhost:3000/api/games/${gameNum}`)
    let outerLetters = [...resp.data.game.letters]
    let centerLetter = outerLetters.shift()
    this.setState({
      centerLetter: centerLetter,
      letters: outerLetters,
      currGame: resp.data.game,
      maxScore: resp.data.game.maxScore
    })
    console.log(`mount ${resp.data.game.maxScore}`)
    console.log(`mount ${resp.data.game.numWords}`)
    return resp
  }

  // getAllGames = async () => {
  //   const resp = await axios.get('http://localhost:3000/api/games')
  //   let outerLetters = [...resp.data.games[0].letters]
  //   let centerLetter = outerLetters.shift()
  //   this.setState({
  //     // centerLetter: resp.data.games[0].letters[0]
  //     centerLetter: centerLetter,
  //     letters: outerLetters,
  //     // currGame: resp.data.games[0]
  //   })
  //   return resp
  // }

  shuffleLetters = () => {
    // let outerLetters = [...wordData[0].letters]
    // outerLetters.shift()
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
    // console.log(this.state.letters)
  }

  handleClick = (event) => {
    this.setState({
      currentWord: this.state.currentWord + event.target.id,
      currentLetter: event.target.id,
    })
    console.log("handle click called")
    console.log(`hive currword ${this.state.currentWord}`)
    console.log(`hive target id ${event.target.id}`)
    // console.log(event.target.tagName)
  }

  handleChange = (event) => {
    console.log(`change isBackspace ${this.state.isBackspace}`)
    if (this.state.isBackspace === true) {
      this.setState({
        currentWord: this.state.currentWord.slice(0, this.state.currentWord.length - 1),
        isBackspace: false
      })
      console.log("it's true")
    } else {
      this.setState({
        isValid: false,
        currentLetter: event.target.id,
        currentWord: this.state.currentWord + event.target.value[event.target.value.length - 1]
        // currentWord: this.state.currentWord + event.target.id
      })
    }
    console.log(this.state.currentWord)
    console.log(`target id ${event.target.id}`)

  }

  handleDelete = (event) => {
    if (event.key === "Backspace") {
      this.setState({
        isBackspace: true
      })
    }
    console.log("delete called")
    console.log(`delete key ${event.key}`)
    console.log(`isBackspace ${this.state.isBackspace}`)
  }

  handleDeleteButton = (e) => {
    e.preventDefault()
    this.setState({
      currentWord: this.state.currentWord.slice(0, this.state.currentWord.length - 1)
    })
  }

  checkValidity = () => {
    console.log("check validity called")
    // event.preventDefault()
    // console.log(this.state.currentWord)
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
      console.log(`this state points validity ${this.state.points}`)
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

    console.log(`this state points validity ${this.state.points}`)

  }
  // console.log(`center letter is ${this.props.centerLetter}`)
  // console.log("called")


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
    console.log(this.state.points)
    console.log(this.state.level)
    console.log("GAME LEVEL CALLED")

  }

  checkGameCompletion = async () => {
    console.log("check completion called")
    if (correctWords.length === this.state.currGame.wordList.length) {
      let user = this.props.user
      console.log(`user.id is ${user.id}`)
      let userId = user.id
      console.log(`id is ${userId}`)
      let gameNum = this.state.currGame.gameNum
      const resp = await api.put(`http://localhost:3000/api/users/${userId}`, { "id": userId, "gameNum": gameNum })
      this.setState({
        isGameCompleted: true
      })
      return resp.data
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.checkValidity()
    this.checkGameCompletion()
    // this.checkGameLevel(this.state.points)
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
    return (
      <div className="hiveComponent">

        <div className="hive">

          <svg className="hive-cell">
            <polygon className="hex-cell middle" points="0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
            </polygon>
            <text id={this.state.centerLetter} onClick={this.handleClick} fill="black" x="50" y="50" dy="10">{this.state.centerLetter}</text>
          </svg>
          {hiveCellData.map(cell => {
            return (<HiveCell handleClick={this.handleClick} point={cell.point} letter={cell.letter} />)
          }
          )}

          <form>
            <input className="wordInput" id={this.state.currentLetter} onChange={this.handleChange}
              onKeyDown={this.handleDelete} name="currentWord" value={this.state.currentWord} />
            <button id="enterButton" type="submit" onClick={this.handleSubmit}>Enter</button>
            <button id="delButton" onClick={this.handleDeleteButton}>Delete</button>
            <Shuffle centerLetter={this.state.centerLetter} handleShuffle={this.handleShuffle} />
          </form>

        </div>
        <div className="scoring">
          <div id="levels">
            <p id="levelName">{this.state.level && this.state.level}</p>
            <p id="pointsNum">{this.state.points}</p>
          </div>
          <div id="correctWords">
            <p id="foundWordsLabel">You have found {this.state.correctWords.length} words</p>
            {this.state.correctWords.map(word => {
              return <p>{word}</p>
            })}
          </div>
        </div>
        {/* <svg className = "hive-cell">
        <polygon className="hex-cell" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.letters[0]}</text>
      </svg>
      <svg className = "hive-cell">
        <polygon className="hex-cell" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.letters[1]}</text>
      </svg>
      <svg className = "hive-cell">
        <polygon className="hex-cell" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.letters[2]}</text>
      </svg>
      <svg className = "hive-cell">
        <polygon className="hex-cell" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.letters[3]}</text>
      </svg>
      <svg className = "hive-cell">
        <polygon className="hex-cell" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.letters[4]}</text>
      </svg>
      <svg className = "hive-cell">
        <polygon className="hex-cell" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.letters[5]}</text>
      </svg> */}




      </div>
    )
  }
}

export default Hive