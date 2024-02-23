import React from 'react'
import Main from '../main.js'
import Users from '../Users'

function Home() {
    let isStudent = false
  return (
    <div>
      <div className='content'>
        <h1 className='text-3xl underline text-center'>React App</h1>
      </div>
      <div className='main'>
        <Main isStudent={isStudent} />
        <Users name='Ikenna' age={30} />
      </div>
    </div>
  )
}

export default Home
