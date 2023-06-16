import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Rank = () => {
  const location = useLocation()
  const score = location.state.finalScore
  const [rank, setRank] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  /* calculate rank */
  useEffect(() => {
    const calculateRank = async () => {
      const response = await axios.post('http://localhost:5000/rank', {finalScore : score})
      setRank(response.data)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
    calculateRank()
  },[score])

  return (
    <>
    {
      isLoading ? 
      <div className="loading-container">
        <span class="loader"></span>
      </div>
      :
    <div className='rank-container'>
      <h3>Your Rank Is :</h3>
      <h2>{rank}</h2>
      <Link to='/practice' className='link'>Try Again</Link>
    </div>
    }
    </>
  )
}

export default Rank