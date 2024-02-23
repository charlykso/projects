import React, { useState } from 'react'

const Signin = () => {
  const [errMsg, setErrMsg] = useState('')
  const handleRegistration = (e) => {
    e.preventDefault()
    
  }

  const closeErrDIv = () => {
    setErrMsg('')
  }
  return (
    <div className='form w-full bg-slate-100 mt-3 mb-3 p-3'>
      <h4 className='text-3xl text-center'>
        <span className='underline'>S</span>ignin{' '}
        <span className='underline'>F</span>orm
      </h4>
      {errMsg && (
        <div className='p-3 my-3 bg-red-500 flex justify-between'>
          <p className='text-white'>{errMsg}</p>
          <button
            className='text-white bg-slate-400 px-2'
            onClick={closeErrDIv}
          >
            X
          </button>
        </div>
      )}
      <form className='w-full ' onSubmit={handleRegistration} method='POST'>
        <div className='input'>
          <input
            className='w-full mt-3 mb-3 px-5 py-3 rounded-md font-normal text-lg'
            type='email'
            name='email'
            placeholder='Email'
          />
        </div>
        <div className='input'>
          <input
            className='w-full mt-3 mb-3 px-5 py-3 rounded-md font-normal text-lg'
            type='password'
            name='password'
            placeholder='Password'
          />
        </div>
        <button className='w-full bg-green-500 rounded-md py-3 text-white uppercase'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signin