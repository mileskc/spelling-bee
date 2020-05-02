import React from 'react'
import Hive from './Hive'
import {Link} from 'react-router-dom'

const Home = () => {
  return(
    <>
    {/* <TitleBar/> */}
    <Link to="/sign-up"><button>Sign Up</button></Link>
     <Hive/>
    </>
  )
}

export default Home