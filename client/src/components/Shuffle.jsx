import React from 'react'
import '../App.css'

const Shuffle = (props) => {
  return(
    <>
      <button className = "swapButton" onClick={props.handleShuffle}>swap</button>
    </>
  )
}

export default Shuffle