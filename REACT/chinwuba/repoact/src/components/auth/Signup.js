import React, { useState } from 'react'
import { Box } from '@mui/material'
import Validate from '../../helpers/Validate'
import useCreateUser from '../hooks/useCreateUser'
import { createUserUrl } from '../routes/BaseUrl'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [fnameErr, setFnameErr] = useState('')
  const [lnameErr, setLnameErr] = useState('')
  const [usernameErr, setUsernameErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('')

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const {createUser, createUserError, setCreateUserError, isLoading} =
    useCreateUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (fname === '') {
      setFnameErr('First Name is required')
      return
    } else if (lname === '') {
      setLnameErr('Last Name is required')
      return
    } else if (username === '') {
      setUsernameErr('Username is required')
      return
    } else if (email === '') {
      setEmailErr('Email is required')
      return
    } else if (password === '') {
      setPasswordErr('Password is required')
      return
    } else if (password !== confirmPassword) {
      setError('Password and Confirm Password must be the same')
      return
    }

    const formData = {
      first_name: fname,
      last_name: lname,
      username: username,
      email: email,
      password: password,
    }
    await createUser(formData, createUserUrl)
  }
  const closeErrMsg = () => {
    setError('')
    setCreateUserError('')
  }
  return (
    <div className=' flex justify-center items-center h-full bg-gradient-to-r from-violet-500 to-fuchsia-500  text-white'>
      <div className='w-[60%]'>
        <h1 className='text-center text-2xl mb-3'>Signup</h1>
        <Box>
          {error && (
            <div className='bg-red-500 flex justify-center items-center p-3'>
              <p className='text-white text-sm flex-1'>{error}</p>
              <button
                onClick={closeErrMsg}
                className='bg-slate-400 py-2 px-3 text-white'
              >
                X
              </button>
            </div>
          )}
          {createUserError && (
            <div className='bg-red-500 flex justify-center items-center p-3'>
              <p className='text-white text-sm flex-1'>{createUserError}</p>
              <button
                onClick={closeErrMsg}
                className='bg-slate-400 py-2 px-3 text-white'
              >
                X
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='flex justify-between items-center gap-2'>
              <div className='my-3 flex-1'>
                <label htmlFor='first_name' className='block text-xl font-mono'>
                  First Name:
                </label>
                <input
                  className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  onChange={(e) => setFname(e.target.value)}
                  onKeyUp={() =>
                    fname !== ''
                      ? setFnameErr('')
                      : setFnameErr('First Name is required')
                  }
                />
                {fnameErr && <p className='text-red-200 text-sm'>{fnameErr}</p>}
              </div>
              <div className='my-3 flex-1'>
                <label htmlFor='last_name' className='block text-xl font-mono'>
                  Last Name:
                </label>
                <input
                  className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  onChange={(e) => setLname(e.target.value)}
                  onKeyUp={() =>
                    lname !== ''
                      ? setLnameErr('')
                      : setLnameErr('Last Name is required')
                  }
                />
                {lnameErr && <p className='text-red-200 text-sm'>{lnameErr}</p>}
              </div>
            </div>
            <div className='my-3'>
              <label htmlFor='username' className='block text-xl font-mono'>
                Username:
              </label>
              <input
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='text'
                name='username'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={() =>
                  username !== ''
                    ? setUsernameErr('')
                    : setUsernameErr('Username is required')
                }
              />
              {usernameErr && (
                <p className='text-red-200 text-sm'>{usernameErr}</p>
              )}
            </div>
            <div className='my-3'>
              <label htmlFor='email' className='block text-xl font-mono'>
                Email:
              </label>
              <input
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='email'
                name='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={() =>
                  email !== ''
                    ? setEmailErr('')
                    : setEmailErr('Email is required')
                }
              />
              {emailErr && <p className='text-red-200 text-sm'>{emailErr}</p>}
            </div>
            <div className='my-3'>
              <label htmlFor='password' className='block text-xl font-mono'>
                Password:
              </label>
              <input
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={() =>
                  Validate(password)
                    ? setPasswordErr('')
                    : setPasswordErr(
                        'Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
                      )
                }
              />
              {passwordErr && (
                <p className='text-red-200 text-sm'>{passwordErr}</p>
              )}
            </div>
            <div className='my-3'>
              <label
                htmlFor='confirm_password'
                className='block text-xl font-mono'
              >
                Confirm Password:
              </label>
              <input
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='password'
                name='confirm_password'
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyUp={() =>
                  confirmPassword === password
                    ? setConfirmPasswordErr('')
                    : setConfirmPasswordErr(
                        'Password and Confirm Password must be the same'
                      )
                }
              />
              {confirmPasswordErr && (
                <p className='text-red-200 text-sm'>{confirmPasswordErr}</p>
              )}
            </div>
            <button
              className='w-full bg-green-500 text-white rounded-lg py-3 text-xl font-mono'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Signup'}
            </button>
          </form>
          <p>
            Already have an account | <Link to='/signin'>Signin</Link>
          </p>
        </Box>
      </div>
    </div>
  )
}

export default Signup
