import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import useCreateUser from '../hooks/useCreateUser'
import { loginUserUrl } from '../routes/BaseUrl'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const {
    createUser,
    createUserError,
    setCreateUserError,
    isLoading,
    resData,
  } = useCreateUser()

  // useEffect(() => {
  //   userRef.current.focus()
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      email: email,
      password: password,
    }
    try {
      await createUser(formData, loginUserUrl)
    } catch (error) {
      // errRef.current.focus()
      console.log('error: ', error)
    }
  }
  if (createUserError) {
    console.log(createUserError)
  }
  let user = null
   if (resData) {
     // console.log('Logged in')
     user = resData.user
     const token = resData.token
     localStorage.setItem('user', JSON.stringify(user))
     localStorage.setItem('token', JSON.stringify(token))
   }
   useEffect(() => {
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
      navigate('/')
    }

   }, [user, dispatch, navigate])
   

 

  // const bgImg = `background-image: url('../../images/R.jpeg')`

  return (
    <div className=' flex justify-center items-center h-full bg-cover text-white bg-center bg-no-repeat bg-gradient-to-r from-violet-500 to-fuchsia-500'>
      <div className='w-[60%]'>
        <h1 className='text-center text-2xl mb-3'>Signin</h1>
        <Box>
          {createUserError && (
            <div className='bg-red-500 flex justify-center items-center p-3'>
              <p className='text-white text-sm flex-1 '>{createUserError}</p>
              <button
                onClick={(e) => setCreateUserError(null)}
                className='bg-slate-400 py-2 px-3 text-white'
              >
                X
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label htmlFor='email' className='block text-xl font-mono'>
                Email:
              </label>
              <input
                id='email'
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='email'
                name='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='my-3 relative'>
              <label htmlFor='password' className='block text-xl font-mono'>
                Password:
              </label>
              <input
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='inline-block absolute top-10 right-3'>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(true)
                  }}
                  className={showPassword ? 'hidden' : 'block'}
                >
                  <VisibilityIcon sx={{ color: 'black' }} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPassword(false)
                  }}
                  className={showPassword ? 'block' : 'hidden'}
                >
                  <VisibilityOffIcon sx={{ color: 'black' }} />
                </button>
              </div>
            </div>

            <button
              className='w-full bg-green-500 text-white rounded-lg py-3 text-xl font-mono'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Signin'}
            </button>
          </form>
          <p>
            Don't have an account | <Link to='/signup'>register</Link>
          </p>
        </Box>
      </div>
    </div>
  )
}

export default Signin
