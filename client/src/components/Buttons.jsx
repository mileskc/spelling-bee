import React from 'react'
import Shuffle from './Shuffle'

const Buttons = (props) => {
  return (
    <div className="buttons">
      <button id="enter-button" type="submit" onClick={props.handleSubmit}>Enter</button>
      <Shuffle centerLetter={props.centerLetter} handleShuffle={props.handleShuffle} />
      <button id="del-button" onClick={props.handleDeleteButton}>Delete</button>
    </div>
  )
}

export default Buttons