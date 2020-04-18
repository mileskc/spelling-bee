import React from 'react'

const Shuffle = (props) => {
  return(
    <div>
      <button onClick={props.handleShuffle}>swap</button>
    </div>
  )
}

export default Shuffle