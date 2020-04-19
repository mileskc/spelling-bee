import React from 'react'
import wordData from '../data.js'
import '../styles/InputBar.css'

class InputBar extends React.Component {
 
  constructor(props) {
    super()
    this.state={
      currentWord: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      currentWord: event.target.value
    })

    // console.log(this.state.currentWord)
  }

  handleSubmit = () => {
    // event.preventDefault()
    // console.log(this.state.currentWord)
    wordData[0].wordList.includes(this.state.currentWord)? console.log("yes") : console.log("no")
    // console.log("called")
  }

  render() {
    return(
      <div>
        {/* <form > */}
          <input onChange={this.handleChange} name="currentWord" value={this.state.currentWord}/>
          <button onClick={this.handleSubmit}>Enter</button>
        {/* </form> */}
      </div>
    )
  }
}

export default InputBar