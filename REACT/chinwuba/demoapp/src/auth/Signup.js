import React, { useState } from 'react'
import Validate from './Validate'

const Signup = () => {
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleRegistration = async (e) => {
    e.preventDefault()
    const data = Validate(e, setErrMsg)
    if (data) {
      const res = await fetch('http://localhost:3001/', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(res);
      const result = res
      if (result.ok === false) {
        setErrMsg(result.error)
      } else {
        setSuccessMsg('Registration Successful')
      }
    }
  }

  const closeErrDIv = () => {
    setErrMsg('')
  }
  return (
    <div>
      <div className='form w-full bg-slate-100 mt-3 mb-3 p-3'>
        <h4 className='text-3xl text-center'>
          <span className='underline'>R</span>egistration{' '}
          <span className='underline'>F</span>orm
        </h4>
        {successMsg && (
          <div className='p-3 my-3 bg-green-500 flex justify-between'>
            <p className='text-white'>{successMsg}</p>
            <button
              className='text-white bg-slate-400 px-2'
              onClick={() => setSuccessMsg('')}
            >
              X
            </button>
          </div>
        )}
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
              type='text'
              name='firstName'
              placeholder='First Name'
            />
          </div>
          <div className='input'>
            <input
              className='w-full mt-3 mb-3 px-5 py-3 rounded-md font-normal text-lg'
              type='text'
              name='lastName'
              placeholder='Last Name'
            />
          </div>
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
              type='text'
              name='phoneNo'
              placeholder='Phone Number'
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
          <div className='input'>
            <input
              className='w-full mt-3 mb-3 px-5 py-3 rounded-md font-normal text-lg'
              type='password'
              name='confirmPass'
              placeholder='Confirm Password'
            />
          </div>
          <button className='w-full bg-green-500 rounded-md py-3 text-white uppercase'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
