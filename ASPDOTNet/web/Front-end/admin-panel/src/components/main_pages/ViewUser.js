import React from "react";
import Breadcrumbs from '../sub_pages/Breadcrumbs'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import useGet from '../../hooks/useGet'
import { getUserUrl, updateUserUrl } from '../sub_pages/BaseUrl'
import Loading from '../sub_pages/Loading'
import { Form, Formik } from 'formik'
import { UserSchema } from '../forms/Schemas'
import CustomInput from '../forms/CustomInput'
import CustomSelect from '../forms/CustomSelect'
import { useUpdate } from '../../hooks/useUpdate'

const ViewUser = () => {
  const location = useLocation()
  const { Id } = useParams()
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('token'))
  const jwt = token.token
  const { data: user, isPending, error } = useGet(getUserUrl, Id)
  const { updateUser, isLoading, updateError } = useUpdate()

  if (user) {
    // console.log(user);
  }

  return (
    <div className='container mx-auto md:px-8 '>
      {!isPending && <Breadcrumbs location={location.pathname} />}
      {isPending && <Loading />}
      {error && <div className='text-red-600'>{error}</div>}
      {user && (
        <div className='grid grid-rows-2 gap-1 justify-items-stretch lg:grid-cols-2 md:grid-rows-1 mt-5  justify-between'>
          <div className='p-6 rounded-lg bg-gray-100 shadow-lg'>
            <h5 className='text-gray-900 text-xl font-medium mb-2'>
              First name: {user.Firstname}
              <br />
              Last name: {user.Lastname}
            </h5>
            <p className='text-gray-700 text-base mb-1'>Email: {user.Email}</p>
            <p className='text-gray-700 text-base mb-1'>
              Phone No: {user.Phone_no}
            </p>
            <p className='text-gray-700 text-base mb-1'>Role: {user.Role}</p>
            <p className='text-gray-600 text-xs'>
              <b>Reg Date:</b> {user.Created_at}
            </p>
            <p className='text-gray-600 text-xs'>
              <b>Updated At:</b> {user.Updated_at}
            </p>
            {/* {console.log(user)} */}
            <caption>
              <h4 className='mt-2'>Books</h4>
            </caption>
            {user.Book_User.length > 0 ? (
              <div className='scroll-smooth scroll-m-8  md:scroll-auto'>
                <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                  <option value=''> ------ </option>
                  {user.Book_User.map((book, index) => (
                    <option
                      className='px-2 py-2 border-b border-gray-200 w-auto rounded-t-lg'
                      key={index}
                    >
                      {book.Book.Title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <h4>No Book</h4>
            )}
          </div>
          <div className='bg-gray-100 md:max-w-full rounded-lg'>
            <h3 className='text-center'>Edit User</h3>
            {updateError && (
              <div
                className='bg-red-100 rounded-lg py-5 px-6 mb-3 mt-3 text-base text-red-700 inline-flex items-center w-full'
                role='alert'
              >
                <p>{updateError}</p>
              </div>
            )}
            <div className='p-6 rounded-lg w-full shadow-lg '>
              <Formik
                initialValues={{
                  Firstname: user.Firstname,
                  Lastname: user.Lastname,
                  Email: user.Email,
                  Phone_No: user.Phone_no,
                  Role: user.Role,
                }}
                validationSchema={UserSchema}
                onSubmit={async (values, actions) => {
                  console.log(values)

                  let formdata = new FormData()
                  formdata.append('FirstName', values.Firstname)
                  formdata.append('LastName', values.Lastname)
                  formdata.append('Email', values.Email)
                  formdata.append('Phone_no', values.Phone_No)
                  formdata.append('Role', values.Role)
                  // console.log(formdata);
                  try {
                    await updateUser(updateUserUrl, formdata, jwt, Id)
                    navigate('/users')
                  } catch (error) {
                    console.log(error.message)
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='form-group mb-6'>
                        <CustomInput
                          name='Firstname'
                          type='text'
                          className='form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='exampleInput123'
                          aria-describedby='emailHelp123'
                          placeholder='First name'
                        />
                      </div>
                      <div className='form-group mb-6'>
                        <CustomInput
                          name='Lastname'
                          type='text'
                          className='form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          id='exampleInput124'
                          aria-describedby='emailHelp124'
                          placeholder='Last name'
                        />
                      </div>
                    </div>
                    <div className='form-group mb-6'>
                      <CustomInput
                        name='Email'
                        type='email'
                        className='form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id='exampleInput1242'
                        aria-describedby='emailHelp124'
                        placeholder='Email address'
                      />
                    </div>
                    <div className='form-group mb-6'>
                      <CustomInput
                        name='Phone_No'
                        type='text'
                        className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        id='exampleInput125'
                        placeholder='Phone Number eg +234806611236'
                      />
                    </div>
                    <div className='form-group mb-6'>
                      <CustomSelect
                        name='Role'
                        class='form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        aria-label='Default select example'
                      >
                        <option value='' selcted>
                          Select Role
                        </option>
                        <option value='User'>User</option>
                        <option value='Admin'>Admin</option>
                      </CustomSelect>
                    </div>

                    <button
                      disabled={isLoading}
                      type='submit'
                      className='
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out'
                    >
                      {isLoading ? 'Loading...' : 'Update'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ViewUser
