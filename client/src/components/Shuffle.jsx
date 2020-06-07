import React from 'react'
import '../styles/Hive.css'

const Shuffle = (props) => {
  return (
    <>
      <button id="swapButton" onClick={props.handleShuffle}>swap</button>
    </>
  )
}

export default Shuffle