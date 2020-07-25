import React, { Component } from 'react'
import { signUp, signIn } from '../services/auth'
import '../styles/SignIn.css'

class SignUp extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isError: false,
      errorMsg: ''
    }
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })

  onSignUp = event => {
    event.preventDefault()

    const { history, setUser } = this.props
    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.user))
      .then(() => history.push('/game-list'))
      .catch(error => {
        this.setState({
          email: '',
          password: '',
          passwordConfirmation: '',
          isError: true,
          errorMsg: 'Sign Up Details Invalid'
        })
      })
  }

  renderError = () => {
    const toggleForm = this.state.isError ? 'danger' : ''
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      )
    } else {
      return <button className="submit-button" type="submit">Sign In</button>
    }
  }

  render() {
    const { email, username, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="form-container">
          <h3 className="sign-in-title">Sign Up</h3>
          <form className="sign-in-form" onSubmit={this.onSignUp}>
            <label className="input-label">Username</label>
            <input
              className="sign-in-input"
              required
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <label className="input-label">Email address</label>
            <input
              className="sign-in-input"
              required
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <label className="input-label">Password</label>
            <input
              className="sign-in-input"
              required
              name="password"
              value={password}
              type="password"
              onChange={this.handleChange}
            />
            <label className="input-label">Password Confirmation</label>
            <input
              className="sign-in-input"
              required
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              onChange={this.handleChange}
            />
            {this.renderError()}
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp