import React from 'react'
import Home from './Hive'
import { Route, Switch } from 'react-router-dom'
import SignUp from './SignUp'
import SignIn from './SignIn'

const Routes = ({setUser}) => (
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
    <Route
      path="/sign-up"
      render={props => <SignUp {...props} setUser={setUser} />}
    />
  </Switch>
)

export default Routes