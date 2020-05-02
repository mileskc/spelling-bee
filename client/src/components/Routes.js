import React from 'react'
import {Route, Switch} from 'react-router-dom'
import SignUp from './SignUp'
import Home from './Home'

const Routes = ({user, setUser, clearUser}) => {
return(
<Switch>
  <Route exact path = '/' render={props=><Home {...props}/>}/>
  <Route
  path="/sign-up"
  render={props => <SignUp {...props} setUser={setUser} />}
  />
</Switch>
)
}

export default Routes