import React from 'react'
import '../styles/Hive.css'

const Shuffle = (props) => {
  return (
    <>
      <button id="swap-button" onClick={props.handleShuffle}>&#8644;</button>
    </>
  )
}

export default Shuffle