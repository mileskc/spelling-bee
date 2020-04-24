import React from 'react';
import '../styles/Hive.css'
import wordData from '../data.js'
import Shuffle from './Shuffle'
// import InputBar from './InputBar'
import HiveCell from './HiveCell';

let correctWords = []

class Hive extends React.Component {

  
  constructor(props) {
    super()
    let outerLetters = [...wordData[0].letters]
    outerLetters.shift()
    this.state = {
      centerLetter: [...wordData[0].letters[0]],
      letters: [...outerLetters],
      currentWord: '',
      currentLetter: '',
      correctWords: correctWords,
      isBackspace: false
    }
  }

  

  shuffleLetters = () => {
    let outerLetters = [...wordData[0].letters]
    outerLetters.shift()
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

  handleShuffle = () => {
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
    if (this.state.isBackspace===true) {
      this.setState({
        currentWord: this.state.currentWord.slice(0, this.state.currentWord.length-1),
        isBackspace:false
      })
      console.log("it's true")
    } else {
    this.setState({
      isValid: false,
      currentLetter: event.target.id,
      currentWord: this.state.currentWord + event.target.value[event.target.value.length-1]
      // currentWord: this.state.currentWord + event.target.id
    })
  }
    console.log(this.state.currentWord)
    console.log(`target id ${event.target.id}`)
    
  }

  handleDelete = (event) => {
    if (event.key==="Backspace") {
      this.setState({
        isBackspace: true
      })
    }
    console.log("delete called")
    console.log(`delete key ${event.key}`)
    console.log(`isBackspace ${this.state.isBackspace}`)
  }

  checkValidity = () => {
    // event.preventDefault()
    // console.log(this.state.currentWord)
    if (wordData[0].wordList.includes(this.state.currentWord)&&!correctWords.includes(this.state.currentWord)) {
      correctWords.push(this.state.currentWord)
      this.setState({
        isValid:true,
        correctWords: correctWords,
        currentWord: ''
      })
    } else if (correctWords.includes(this.state.currentWord)) {
      alert("Already found")
      this.setState({
        currentWord: ''
      })
    } else if (this.state.currentWord.length < 4){
      alert("Too short")
      this.setState({
        currentWord: ''
      })
    } else if (!this.state.currentWord.toLowerCase().includes(this.state.centerLetter)) {
      alert("Missing Center Letter")
      this.setState({
        currentWord: ''
      })
    } else if (!wordData[0].wordList.includes(this.state.currentWord)) {
      alert("Not in word list")
      this.setState({
        currentWord: ''
      })
    }

    
    // console.log(`center letter is ${this.props.centerLetter}`)
    // console.log("called")
  }

  handleSubmit = () => {
    this.checkValidity()
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
      <div>
        <input id={this.state.currentLetter} onChange={this.handleChange} 
        onKeyDown={this.handleDelete}name="currentWord" value={this.state.currentWord}/>
          <button onClick={this.checkValidity}>Enter</button>
          {this.state.correctWords.map(word=>{
         return  <p>{word}</p>
        })}
        <div className="hive">
          <svg className="hive-cell">
            <polygon className="hex-cell middle" points="0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
            </polygon>
            <text id={this.state.centerLetter}onClick={this.handleClick}fill="black" x="50" y="50" dy="10">{this.state.centerLetter}</text>
          </svg>
          {hiveCellData.map(cell => {
            return(<HiveCell handleClick={this.handleClick} point={cell.point} letter={cell.letter} />)}
          )}
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

          <Shuffle centerLetter={this.state.centerLetter} handleShuffle={this.handleShuffle} />
        </div>
      </div>
    )
  }
}

export default Hive