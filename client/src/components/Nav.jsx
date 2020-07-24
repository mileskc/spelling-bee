import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = () => {
  return (
    <>
      <hr />
      <div className="link-container">
        <Link className="sign-up" to="/sign-up">Sign Up</Link>
        <Link className="sign-in" to="/sign-in">Log In</Link>
      </div>
      <hr />
    </>
  )
}

export default Nav