import React from 'react';
import '../styles/Hive.css'
import wordData from '../data.js'
import Shuffle from './Shuffle'
import InputBar from './InputBar'
import HiveCell from './HiveCell';


class Hive extends React.Component {

  constructor(props) {
    super()
    let outerLetters = [...wordData[0].letters]
    outerLetters.shift()
    this.state = {
      centerLetter: [...wordData[0].letters[0]],
      letters: [...outerLetters]
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
        <InputBar centerLetter={this.state.centerLetter}/>
        <div className="hive">
          <svg className="hive-cell">
            <polygon className="hex-cell middle" points="0,52 30,0 90,0 120,52 90,104 30,104" stroke="white">
            </polygon>
            <text fill="black" x="50" y="50" dy="10">{this.state.centerLetter}</text>
          </svg>
          {hiveCellData.map(cell => {
            return(<HiveCell point={cell.point} letter={cell.letter} />)}
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