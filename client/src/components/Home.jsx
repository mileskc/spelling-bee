import React from 'react'
import Hive from './Hive'
import Nav from './Nav'
// import Routes from './Routes'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Nav />
      {/* <Routes /> */}
      <Hive />
    </div>
  )
}

export default Home