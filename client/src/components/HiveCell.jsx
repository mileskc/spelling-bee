import React from 'react'
import '../styles/Hive.css'

const HiveCell = (props) => {

  const textStyle = {
    fontFamily: 'Franklin',
    fontWeight: 'bold',
    fontSize: '25px'
  }

  return (
    <svg className="hive-cell" >
      <polygon className="hex-cell" points={props.point} stroke="white">
      </polygon>
      <text style={textStyle} id={props.letter} onClick={props.handleClick} fill="black" x="60" y="52" text-anchor="middle" dominant-baseline="middle">{props.letter}</text>
    </svg>
  )
}

export default HiveCell