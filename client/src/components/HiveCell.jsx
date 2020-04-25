import React from 'react'
import '../styles/Hive.css'

const HiveCell = (props) => {
  return(
      <svg className = "hive-cell">
        <polygon className="hex-cell" points = {props.point} stroke="white">
        </polygon>
        <text id={props.letter} onClick = {props.handleClick} fill="black" x="50" y="50" dy="10">{props.letter}</text>
      </svg>
  )
}

export default HiveCell