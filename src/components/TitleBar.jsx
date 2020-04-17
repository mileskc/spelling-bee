import React from 'react';

const TitleBar = () => {

  
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth()
    let year = today.getFullYear()

  return (
    <h2>
      <em>Spelling Bee</em>
      <span>`${month} ${day}, ${year}`</span>
    </h2>
  )
}