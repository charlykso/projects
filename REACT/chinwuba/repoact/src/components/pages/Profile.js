import React, { useState, useEffect } from 'react'
import { userProfileUrl } from '../routes/BaseUrl'
import { useAuthContext } from '../hooks/useAuthContext'
import useFetch from '../hooks/useFetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useUpdate } from '../hooks/useUpdate'
import { updateProfileUrl } from '../routes/BaseUrl'

const Profile = () => {
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  
  let userId = null
  let profileId = null
  if (user) {
    userId = user.id
    profileId = user.profile.id
  }
  const url = new URL(userProfileUrl, window.location.origin)
  url.pathname = url.pathname.replace(':id', userId)
  const userProfileRoute = url.href
  const { data, fetchErr, isLoading } = useFetch(userProfileRoute)
  const { updateProfile, updateErr, updateSuccess, updateIsLoading } =
    useUpdate()
  let updateProfileRoute = updateProfileUrl.replace(':id', profileId)

  if (fetchErr) {
    console.log(fetchErr)
  }

  const [githubUsername, setGithubUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [readonly, setReadonly] = useState(true)
  const [img, setImg] = useState(null)

  useEffect(() => {
    if (data) {
      setGithubUsername(data.githubUsername)
      setPhone(data.phone)
    }
  }, [data])

  const handleEdit = (e) => {
    e.preventDefault()
    setReadonly(!readonly)
  }
  const handleImgChange = (e) => {
    const file = e.target.files[0]
    const main = document.getElementById('myImg')
    setImg(file)

    const reader = new FileReader()

    reader.onload = function (e) {
      main.src = e.target.result
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const submitImage = (e) => {
    e.preventDefault()
    const formData = {
      profilePic: img,
    }
    updateProfile(formData, updateProfileRoute)
    const user = JSON.parse(localStorage.getItem('user'))
    user.profile = updateSuccess
    localStorage.setItem('user', JSON.stringify(user))
  }

  if (data) {
    // console.log(data.profilePic);
  }

  const updateProfileData = async (e) => {
    e.preventDefault()
    const checkUsernameUrl = `https://api.github.com/users/`
    try {
      if (githubUsername) {
        const res = await fetch(checkUsernameUrl + githubUsername, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!res.ok) {
          throw new Error('Invalid Github Username')
        }
      }
      const formData = new FormData()
      formData.append('githubUsername', githubUsername)
      formData.append('phone', phone)
      formData.append('img', img)
      updateProfile(formData, updateProfileRoute)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  if (updateSuccess) {
    // console.log(updateSuccess)
    const updatedUser = JSON.parse(localStorage.getItem('user'))
    updatedUser.profile.githubUsername = updateSuccess.githubUsername
    updatedUser.profile.phone = updateSuccess.phone
    updatedUser.profile.updated_at = updateSuccess.updated_at
    updatedUser.profile.profilePic = updateSuccess.profilePic
    // console.log(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))

    window.location.href = '/repo'
  }
  return (
    <>
      {(updateErr || fetchErr || error) && (
        <div className='bg-red-500 flex justify-center items-center p-3 mb-3'>
          <p className='text-white text-sm flex-1'>
            {updateErr || fetchErr || error}
            {/* {fetchErr} */}
          </p>
          <button
            // onClick={closeErrMsg}
            className='bg-slate-400 py-2 px-3 text-white'
          >
            X
          </button>
        </div>
      )}
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <div className='m-auto w-[60%] bg-slate-300 p-3 rounded-lg'>
        <h4 className='text-center text-2xl font-mono mb-3'>Profile</h4>
        <div>
          <form action='' encType='multipart/form-data'>
            <div className='bg-slate-400 min-h-[200px] flex justify-center gap-7 mb-3 p-2 flex-wrap rounded-md'>
              <div className='w-[18vw] h-[18vw]'>
                {data ? (
                  <img
                    className='w-full h-full rounded-full'
                    // src={require('../../images/R.jpeg')}
                    src={data.profilePic}
                    alt=''
                  />
                ) : (
                  <img
                    className='w-full h-full rounded-full'
                    src={require('../../images/R.jpeg')}
                    // src=''
                    alt=''
                  />
                )}
              </div>
              <div
                className={` w-[18vw] h-[18vw] { readonly: ${
                  readonly ? 'hidden' : 'block'
                } }`}
              >
                <img
                  className='border w-full h-full rounded-full'
                  // src={require('../../images/R.jpeg')}
                  src=''
                  alt=''
                  id='myImg'
                />
              </div>
            </div>
            <div className='flex justify-between items-center flex-wrap gap-y-3'>
              <div className='w-[65%]'>
                <input
                  className='border w-full p-2 rounded-md'
                  type='file'
                  accept='image/jpeg, image/png, image/jpg'
                  readOnly={readonly}
                  disabled={readonly}
                  onChange={handleImgChange}
                />
              </div>
              <div className='w-auto flex'>
                <button
                  className='bg-gray-400 px-2 py-3 rounded-l-md shadow-black'
                  onClick={(e) => {
                    handleEdit(e)
                  }}
                >
                  Change Image
                </button>
                <button
                  onClick={submitImage}
                  className='bg-green-400 px-2 py-3 rounded-r-md shadow-black'
                  disabled={updateIsLoading}
                >
                  {updateIsLoading ? 'Loading...' : 'Update'}
                </button>
              </div>
            </div>
            <div className='my-3'>
              <label htmlFor='email' className='block text-xl font-mono'>
                Github Username:
              </label>
              <input
                id='githubUsername'
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='text'
                name='githubUsername'
                placeholder='Github Username'
                onChange={(e) => setGithubUsername(e.target.value)}
                readOnly={readonly}
                value={githubUsername}
              />
            </div>
            <div className='my-3'>
              <label htmlFor='email' className='block text-xl font-mono'>
                Phone Number:
              </label>
              <input
                id='phone'
                className='py-3 px-6 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black'
                type='text'
                name='phone'
                placeholder='Phone Number'
                onChange={(e) => setPhone(e.target.value)}
                readOnly={readonly}
                value={phone}
              />
            </div>
            <div className='flex'>
              <div>
                <button
                  onClick={(e) => {
                    handleEdit(e)
                  }}
                  className='bg-gray-400 px-2 py-3 rounded-l-md shadow-black'
                >
                  Edit
                </button>
              </div>
              <div>
                <button
                  className='bg-green-400 px-2 py-3 rounded-r-md shadow-black'
                  disabled={updateIsLoading}
                  onClick={updateProfileData}
                >
                  {updateIsLoading ? 'Loading...' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile
