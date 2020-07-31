import React from 'react'
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className="loading-page">
      <h1 className="loading-title">Loading<span className="one">.</span><span className="two">.</span><span className="three">.</span></h1>
      <h2 className="heroku-loading">The data is on its way! Please be patient while Heroku "wakes up" </h2>
    </div>
  )
}

export default Loading