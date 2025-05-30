import React from 'react'
import {Link } from 'react-router-dom'


const Home = () => {


  return (
    <div>
        <h1>Quiz-App</h1>
        <h2>Answer the questions correctly</h2>
        <p>You are provided with three questions</p>
        <Link to="/quiz">
            <button>Start The Quiz</button>
        </Link>
        
    </div>
  )
}

export default Home