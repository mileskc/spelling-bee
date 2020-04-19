import React from 'react'
import wordData from '../data.js'
import '../styles/InputBar.css'

class InputBar extends React.Component {
 
  constructor(props) {
    super()
    this.state={
      currentWord: "",
      isValid: false
    }
  }

  handleChange = (event) => {
    this.setState({
      isValid: false,
      currentWord: event.target.value
    })

    // console.log(this.state.currentWord)
  }

  checkValidity = () => {
    // event.preventDefault()
    // console.log(this.state.currentWord)
    if (wordData[0].wordList.includes(this.state.currentWord)) {
      this.setState({
        isValid:true
      })
    }
    // console.log("called")
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
        {this.state.isValid ? <p>{this.state.currentWord}</p>: null}
      </div>
    )
  }
}

export default InputBar