import React from 'react'

const Shuffle = (props) => {
  return(
    <div>
      <button onClick={props.shuffleLetters()}>swap</button>
    </div>
  )
}

export default Shuffle