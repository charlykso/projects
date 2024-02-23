import React, { useState } from 'react'
  
const Main = (props) => {
  const [age, setAge] = useState(30)
  let name = 'John Doe'

  const addAge = () => {
    setAge(age + 1)
  }
  const subAge = () => {
    setAge(age - 1)
  }

  return (
    <div>
      <h4>Main component</h4>
      <p>2 + 2 = {2 + 2}</p>
      {props.isStudent ? <p>Student</p> : <p>Not a student</p>}
      {props.isStudent && <p>Student</p>}
      <p>
        My name is {name} and I am {age} years old.
      </p>
      <button
        className='bg-green-600 text-white p-3 rounded-md uppercase mr-3'
        onClick={addAge}
      >
        add age
      </button>
      <button
        className='bg-green-600 text-white p-3 rounded-md uppercase'
        onClick={subAge}
      >
        sub age
      </button>
      
    </div>
  )
}

export default Main