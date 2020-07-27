import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = (props) => {
  console.log(window.location.pathname)
  return (
    <>
      <hr />
      <div className="nav">
        <Link to="/">
          <img className="bee-logo" src="https://i.imgur.com/lyAHfpc.png" />
        </Link>
        <div className="link-container">
          <Link className="sign-up" to="/sign-up">Sign Up</Link>
          <Link className="sign-in" to="/sign-in">Log In</Link>
        </div>
      </div>

      <hr />
    </>
  )
}

export default Nav