import React from 'react';
import Hive from './components/Hive'
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home'
import GameList from './components/GameList'
import Nav from './components/Nav'
import './App.css';
import { verifyUser } from './services/auth'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  async componentDidMount() {
    const res = await verifyUser();
    if (res.user) {
      this.setUser(res.user);
    }
  }

  setUser = (user) =>
    this.setState({
      user: {
        ...user,
        id: user.id || user._id,
      },
    });

  clearUser = () => this.setState({ user: null });

  render() {
    const { setUser, clearUser } = this;
    const { user } = this.state;
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" render={props => <Home user={user} />} />
          <Route
            exact
            path="/sign-up"
            render={(props) => (
              <SignUp setUser={setUser} history={props.history} />
            )}
          />
          <Route
            exact
            path="/sign-in"
            render={(props) => (
              <SignIn setUser={setUser} history={props.history} />
            )}
          />
          <Route
            exact
            path="/game-list"
            render={(props) => (
              <GameList user={user} history={props.history} />
            )}
          />
          <Route
            exact
            path="/game-list/:id"
            render={(props) => (
              <Hive {...props} history={props.history} user={user} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
