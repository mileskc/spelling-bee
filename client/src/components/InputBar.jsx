import React from 'react'
import wordData from '../data.js'
import '../styles/InputBar.css'

let correctWords = []

class InputBar extends React.Component {
 
  constructor(props) {
    super()
    this.state={
      currentWord: props.currWord,
      correctWords: correctWords
    }
  }

  handleChange = (event) => {
    this.setState({
      currentWord: this.state.currWord + event.target.value
    })
    console.log(`input currWord props ${this.props.currWord}`)
    console.log('input handle change called')
    console.log(`inp current word state is ${this.state.currentWord}`)
    // console.log(this.state.currentWord)
  }

  checkValidity = () => {
    // event.preventDefault()
    // console.log(this.state.currentWord)
    if (wordData[0].wordList.includes(this.state.currentWord)&&!correctWords.includes(this.state.currentWord)) {
      correctWords.push(this.state.currentWord)
      this.setState({
        isValid:true,
        correctWords: correctWords
      })
    } else if (correctWords.includes(this.state.currentWord)) {
      alert("Already found")
    } else if (this.state.currentWord.length < 4){
      alert("Too short")
    } else if (!this.state.currentWord.toLowerCase().includes(this.props.centerLetter)) {
      alert("Missing Center Letter")
    } else if (!wordData[0].wordList.includes(this.state.currentWord)) {
      alert("Not in word list")
    }
    console.log(`center letter is ${this.props.centerLetter}`)
    console.log("check validity called")
  }

  handleSubmit = () => {
    this.checkValidity()
  }

  render() {
    return(
      <div>
        {/* <form > */}
          <input onChange={this.handleChange} name="currentWord" value={this.state.currentWord}/>
          <button onClick={this.checkValidity}>Enter</button>
        {/* </form> */}
        {this.state.correctWords.map(word=>{
         return  <p>{word}</p>
        })}
      </div>
    )
  }
}

export default InputBar