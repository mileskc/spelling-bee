import React from 'react'
import wordData from '../data.js'
import '../styles/InputBar.css'

let correctWords = []

class InputBar extends React.Component {

  constructor(props) {
    super()
    this.state = {
      currentWord: "",
      isValid: false,
      correctWords: correctWords
    }
  }

  handleChange = (event) => {
    this.setState({
      isValid: false,
      currentWord: event.target.value
    })
  }

  checkValidity = () => {
    if (wordData[0].wordList.includes(this.state.currentWord) && !correctWords.includes(this.state.currentWord)) {
      correctWords.push(this.state.currentWord)
      this.setState({
        isValid: true,
        correctWords: correctWords
      })
    } else if (correctWords.includes(this.state.currentWord)) {
      alert("Already found")
    } else if (this.state.currentWord.length < 4) {
      alert("Too short")
    } else if (!this.state.currentWord.toLowerCase().includes(this.props.centerLetter)) {
      alert("Missing Center Letter")
    } else if (!wordData[0].wordList.includes(this.state.currentWord)) {
      alert("Not in word list")
    }
    console.log(`center letter is ${this.props.centerLetter}`)
    console.log("called")
  }

  handleSubmit = () => {
    this.checkValidity()
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} name="currentWord" value={this.state.currentWord} />
        <button onClick={this.checkValidity}>Enter</button>
        {this.state.correctWords.map(word => {
          return <p>{word}</p>
        })}
      </div>
    )
  }
}

export default InputBar