import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUp from './SignUp'

const Routes = ({ user, setUser, clearUser }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (<Home {...props} />)}
    />
    <Route
      path="/sign-in"
      render={props => <SignIn {...props} setUser={setUser} />}
    />
  </Switch>
)

export default Routes