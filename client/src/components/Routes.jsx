import React from 'react'
import Home from './Hive'
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
      path="/sign-up"
      render={props => <SignUp {...props} setUser={setUser} />}
    />
  </Switch>
)

export default Routes