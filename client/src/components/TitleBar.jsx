import React from 'react';
import '../styles/TitleBar.css'

const TitleBar = () => {


  let today = new Date()
  let day = today.getDate()
  let month = today.toLocaleString('default', { month: 'long' })
  let year = today.getFullYear()
  console.log(today)

  return (
    <div>
      <h2 className="title">
        <strong>Spelling Bee </strong>
        <span>{month} {day}, {year}</span>
      </h2>
      <div className="nav">
      </div>
    </div>
  )
}

export default TitleBar