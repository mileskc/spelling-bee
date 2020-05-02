import React from 'react'
import {signUp, signIn} from '../services/auth'

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isError: false,
      errorMessage: ''
    }
  }

  handleSignUp = (event) => {
    event.preventDefault()
    signUp(this.state)
      .then(()=>signIn(this.state))
      .then(res=>this.props.setUser(res.user))
      .then(()=>this.props.history.push('/'))
      .catch(error=>{
        console.log(error)
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
        return <button type="submit">Sign In</button>
    }
}

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  
  }

  render() {
    return(
      <>
        <h1>Sign Up</h1>
        <form onSubmit = {this.handleSignUp}>
          <label htmlFor="userName">Username</label>
          <input
            required
            type="text"
            name="username"
            value={this.state.username}
            placeholder = "Username"
            onChange={this.handleChange}
          />
          <input
            required
            type="text"
            name="email"
            value={this.state.email}
            placeholder = "Email"
            onChange={this.handleChange}
          />
          <input
            required
            type="text"
            name="password"
            value={this.state.password}
            placeholder = "Password"
            onChange={this.handleChange}
          />
          <input
            required
            type="text"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            placeholder = "Please confirm password"
            onChange={this.handleChange}
          />
          {/* <button type="submit">Submit</button> */}
          {this.renderError()}
        </form>
      </>
    )
  }
}

export default SignUp