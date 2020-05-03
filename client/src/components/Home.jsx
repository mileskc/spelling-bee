import React from 'react'
import Hive from './Hive'
import Routes from './Routes'
import {Link} from 'react-router-dom'

const Home = () => {
  return(
    <div>
      <Link to="/sign-up">Sign Up</Link>
      {/* <Routes/> */}
      <Hive/>
    </div>
  )
}

export default Home