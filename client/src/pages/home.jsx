import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='home-container'>
        <h1>Welcome to Part of Speech Quiz</h1>
        <Link to='/practice' className='link'> Start Quiz </Link>
    </div>
  )
}

export default Home