import React from 'react'
import '../styles/Hive.css'

const InputBar = (props) => {


  return (
    <div>
      <input autofocus onKeyDown={props.handleDelete} className="word-input" id={props.currentLetter} onChange={props.handleChange} name="currentWord" value={props.currentWord} />
    </div>
  )
}

export default InputBar
