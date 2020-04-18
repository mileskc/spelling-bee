import React from 'react';
import '../styles/Hive.css'
import wordData from '../data.js'
import Shuffle from './Shuffle'


class Hive extends React.Component{
  
  constructor(props) {
    super()
    let outerLetters = [...wordData[0].letters]
    console.log(outerLetters)
    outerLetters.shift()
    this.state={
      centerLetter: [...wordData[0].letters[0]],
      letters:[...outerLetters]
    }
  }

  shuffleLetters = () => {
    this.setState = {
      letters: shuffle(this.state.letters)
    }
  }
  render() {
  // let centerLetter = wordData[0].letters[0]
  // let letters = [...wordData[0].letters]
  // letters.shift()
  
 

  return(
    <div className = "hive">
      <svg className = "hive-cell">
        <polygon className="hex-cell middle" points = "0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
        </polygon>
        <text fill="black" x="50" y="50" dy="10">{this.state.centerLetter}</text>
      </svg>
      <svg className = "hive-cell">
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
      </svg>

      <Shuffle shuffle={this.shuffleLetters()}/>
    </div>
  )
  }
}

export default Hive