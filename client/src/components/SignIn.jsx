import React, { Component } from 'react'
import { signIn } from '../services/auth'
import '../styles/SignIn.css'


class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMsg: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })
  }

  onSignIn = event => {
    event.preventDefault()

    const { history, setUser } = this.props
    signIn(this.state)
      .then((res) => {
        setUser(res.user)
      })
      .then(() => history.push('/game-list'))
      .catch(error => {
        this.setState({
          isError: true,
          errorMsg: 'Invalid Credentials',
          username: '',
          password: ''
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
    const { username, password } = this.state
    return (
      <>
        <div className="form-container">
          <h3 className="sign-in-title">Sign In</h3>
          <form className="sign-in-form" onSubmit={this.onSignIn}>
            <label className="input-label">Username</label>
            <input
              className="sign-in-input"
              required
              type="text"
              name="username"
              value={username}
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
            {this.renderError()}
          </form>
        </div>
      </>
    )
  }
}

export default SignIn