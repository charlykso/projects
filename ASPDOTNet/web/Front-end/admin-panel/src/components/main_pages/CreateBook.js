import { addBookUrl, getAllAuthorUrl } from '../sub_pages/BaseUrl'
import { useLocation, useNavigate } from 'react-router-dom'
import { createBookSchema } from '../forms/Schemas'
import Breadcrumbs from '../sub_pages/Breadcrumbs'
import FormikControl from '../forms/FormikControl'
import { useCreate } from '../../hooks/useCreate'
import React, { useEffect, useState } from 'react'
import MySelect from '../forms/Select'
import { Form, Formik } from 'formik'

const CreateBook = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [AuthorError, setAuthorError] = useState()
  const [authorData, setAuthoData] = useState([])
  const { createUser, error, isLoading } = useCreate()
  const token = JSON.parse(localStorage.getItem('token'))
  const jwt = token.token
  const [uploadErrMsg, setUploadErrMsg] = useState('')
  const [bookPDF, setBookPDF] = useState('')
  const [backImage, setBackImage] = useState(null)
  const [backErrMsg, setBackErrMsg] = useState('')
  const [backSucMsg, setBackSucMsg] = useState('')

  const [smallFrontImage, setSmallFrontImage] = useState(null)
  const [smallFrontErrMsg, setSmallFrontErrMsg] = useState('')
  const [smallFrontSucMsg, setSmallFrontSucMsg] = useState('')

  const [frontImage, setFrontImage] = useState(null)
  const [frontErrMsg, setFrontErrMsg] = useState('')
  const [frontSucMsg, setFrontSucMsg] = useState('')

  function handleFrontUploade(file) {
    if (frontSucMsg) {
      setFrontErrMsg('')
    }
    setFrontImage(file)
  }

  function handleSmallFrontUploade(file) {
    if (smallFrontSucMsg) {
      setSmallFrontErrMsg('')
    }
    setSmallFrontImage(file)
  }

  function handleBackUpload(file) {
    // console.log('Uploaded file:', file)
    if (backSucMsg) {
      setBackErrMsg('')
    }
    setBackImage(file)
  }

  useEffect(() => {
    fetch(getAllAuthorUrl, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + jwt },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw Error('Unauthorised')
          } else {
            throw Error('could not fetch the data for the resource')
          }
        }
        return res.json()
      })
      .then((data) => {
        setAuthoData(data)
        setAuthorError(null)
      })
      .catch((err) => {
        setAuthorError(err.message)
      })
  }, [jwt])

  return (
    <div className='container mx-auto md:px-8 min-h-full'>
      <Breadcrumbs location={location.pathname} />
      <div className='p-6 rounded-lg shadow-lg h-full w-full mt-2 bg-white'>
        <h3 className='text-center mb-3'>Create Book</h3>
        {error && (
          <div
            className='bg-red-100 rounded-lg py-5 px-6 mb-3 mt-3 text-base text-red-700 inline-flex items-center w-full'
            role='alert'
          >
            <p>{error}</p>
          </div>
        )}
        {uploadErrMsg && (
          <div
            className='bg-red-100 rounded-lg py-5 px-6 mb-3 mt-3 text-base text-red-700 inline-flex items-center w-full'
            role='alert'
          >
            <p>{uploadErrMsg}</p>
          </div>
        )}
        <Formik
          initialValues={{
            Title: '',
            Sub_Title: '',
            YearOf_Publication: '',
            ISBN_Number: '',
            Publisher: '',
            Price: '',
            AuthorId: '',
            Front_Cover_Img: '',
            Back_Cover_Img: '',
            Small_front_cover_img: '',
            BookFile: '',
          }}
          validationSchema={createBookSchema}
          onSubmit={async (values, actions) => {
            values.Back_Cover_Img = backImage
            values.Small_front_cover_img = smallFrontImage
            values.Front_Cover_Img = frontImage
            // console.log(values)
            let token = JSON.parse(localStorage.getItem('token'))
            let jwt = token.token
            if (
              values.Small_front_cover_img !== null ||
              values.Back_Cover_Img !== null ||
              values.Front_Cover_Img !== null
            ) {
              let formData = new FormData()
              formData.append('Title', values.Title)
              formData.append('Sub_Title', values.Sub_Title)
              formData.append('YearOf_Publication', values.YearOf_Publication)
              formData.append('ISBN_Number', values.ISBN_Number)
              formData.append('Publisher', values.Publisher)
              formData.append('Price', values.Price)
              formData.append('BookFile', values.BookFile)
              formData.append('AuthorId', values.AuthorId)
              formData.append('Front_Cover_Img', values.Front_Cover_Img)
              formData.append('Back_Cover_Img', values.Back_Cover_Img)
              formData.append(
                'Small_front_cover_img',
                values.Small_front_cover_img
              )
              // console.log(values)

              try {
                await createUser(addBookUrl, formData, jwt)
                navigate('/books')
              } catch (error) {
                console.log(error.message)
              }
            } else if (values.Back_Cover_Img === null) {
              setUploadErrMsg('Back cover image should not be empty')
            } else if (values.Front_Cover_Img === null) {
              setUploadErrMsg('Front cover image should not be empty')
            } else if (values.Small_front_cover_img === null) {
              setUploadErrMsg('Small front cover image should not be empty')
            }
          }}
        >
          {(props) => (
            <Form className='justify-center'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='form-group mb-6'>
                  <FormikControl
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
                    control='input'
                    type='text'
                    name='Title'
                    placeholder='Book Title'
                  />
                </div>
                <div className='form-group mb-6'>
                  <FormikControl
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
                    control='input'
                    type='text'
                    name='Sub_Title'
                    placeholder='Book Sub_title'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='form-group mb-6'>
                  <FormikControl
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
                    control='input'
                    type='text'
                    name='ISBN_Number'
                    placeholder='ISBN Number'
                  />
                </div>
                <div className='form-group mb-6'>
                  <FormikControl
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
                    control='input'
                    type='text'
                    name='Publisher'
                    placeholder='The Publisher'
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='form-group mb-6'>
                  <FormikControl
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
                    control='input'
                    type='number'
                    name='Price'
                    placeholder='Book Price in NGN eg 5000'
                  />
                </div>
                <div className='form group mb-6'>
                  <MySelect
                    className='form-select appearance-none
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
                    name='AuthorId'
                  >
                    {AuthorError ? (
                      <option value=''>{AuthorError}</option>
                    ) : (
                      <option value=''>Select author</option>
                    )}

                    {authorData?.map((authordata, index) => (
                      <option value={authordata.Id} key={authordata.Id}>
                        {authordata.Firstname} {authordata.Lastname}
                      </option>
                    ))}
                  </MySelect>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                <div className='form-group mb-3'>
                  {/* <FormikControl
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
                    control='input'
                    label='Front cover image'
                    type='file'
                    accept='image/jpeg, image/png, image/jpg'
                    image_name={image1_name}
                    name='Front_Cover_Img'
                    onChange={(e) => {
                      props.setFieldValue('Front_Cover_Img', e.target.files[0])
                      setImage1_name(e.target.files[0]?.name)
                      // console.log(image1_name)
                    }}
                    value={(e) => {
                      props.setFieldValue('Front_Cover_Img', e.target.files[0])
                    }}
                    placeholder='Front cover image'
                  />
                  <p className='text-green-500'>{image1_name}</p> */}

                  <label htmlFor='Front cover image'>Front cover image</label>
                  <input
                    type='file'
                    required
                    name='Front_Cover_Img'
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
                    id='fileInput'
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const fileSizeInBytes = file.size
                        const maxSizeInBytes = 2 * 1024 * 1024 // 2MB
                        const reader = new FileReader()

                        reader.onload = function (e) {
                          const img = new Image()

                          img.onload = function () {
                            const width = img.width
                            const height = img.height

                            if (fileSizeInBytes <= maxSizeInBytes) {
                              if (width === 254 && height === 400) {
                                handleFrontUploade(file)
                                setFrontSucMsg(
                                  `Image dimensions are valid. Width: ${width} height: ${height}`
                                )
                              } else {
                                setFrontErrMsg(
                                  `Image dimensions are not valid. Width: ${width} height: ${height}`
                                )
                              }
                            } else {
                              setFrontErrMsg(
                                `Image size is more than required. image size: ${fileSizeInBytes} max image size required: ${maxSizeInBytes}`
                              )
                            }
                          }

                          img.src = e.target.result
                        }

                        reader.readAsDataURL(file)
                      }
                    }}
                    accept='image/jpeg, image/png, image/jpg'
                  ></input>
                  <p
                    className='mt-1 text-sm text-gray-500 dark:text-gray-300'
                    id='file_input_help'
                  >
                    PNG, JPEG or JPG (MAX. 2mb, dimension 254 X 400).
                  </p>
                  {frontErrMsg ? (
                    <p className='text-red-600'>{frontErrMsg}</p>
                  ) : (
                    <p className='text-green-600'>{frontSucMsg}</p>
                  )}
                </div>
                <div className='form group mb-3'>
                  <label htmlFor='Small front cover image'>
                    Small front cover image
                  </label>
                  <input
                    type='file'
                    required
                    name='Small_front_cover_img'
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
                    id='fileInput'
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const fileSizeInBytes = file.size
                        const maxSizeInBytes = 2 * 1024 * 1024 // 2MB
                        const reader = new FileReader()

                        reader.onload = function (e) {
                          const img = new Image()

                          img.onload = function () {
                            const width = img.width
                            const height = img.height

                            // console.log('Width:', width)
                            // console.log('Height:', height)

                            if (fileSizeInBytes <= maxSizeInBytes) {
                              if (width === 126 && height === 200) {
                                handleSmallFrontUploade(file)
                                setSmallFrontSucMsg(
                                  `Image dimensions are valid. Width: ${width} height: ${height}`
                                )
                              } else {
                                setSmallFrontErrMsg(
                                  `Image dimensions are not valid. Width: ${width} height: ${height}`
                                )
                              }
                            } else {
                              setSmallFrontErrMsg(
                                `Image size is more than required. image size: ${fileSizeInBytes} max image size required: ${maxSizeInBytes}`
                              )
                            }
                          }

                          img.src = e.target.result
                        }

                        reader.readAsDataURL(file)
                      }
                    }}
                    accept='image/jpeg, image/png, image/jpg'
                  ></input>
                  <p
                    className='mt-1 text-sm text-gray-500 dark:text-gray-300'
                    id='file_input_help'
                  >
                    PNG, JPEG or JPG (MAX. 2mb, dimension 126 X 200).
                  </p>
                  {smallFrontErrMsg ? (
                    <p className='text-red-600'>{smallFrontErrMsg}</p>
                  ) : (
                    <p className='text-green-600'>{smallFrontSucMsg}</p>
                  )}
                </div>

                <div className='form-group mb-6'>
                  <label htmlFor='Back cover image'>Back cover image</label>
                  <input
                    type='file'
                    required
                    name='Back_Cover_Img'
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
                    id='fileInput'
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        const fileSizeInBytes = file.size
                        const maxSizeInBytes = 2 * 1024 * 1024 // 2MB
                        const reader = new FileReader()

                        reader.onload = function (e) {
                          const img = new Image()

                          img.onload = function () {
                            const width = img.width
                            const height = img.height

                            // console.log('Width:', width)
                            // console.log('Height:', height)

                            if (fileSizeInBytes <= maxSizeInBytes) {
                              if (width === 254 && height === 400) {
                                handleBackUpload(file)
                                setBackSucMsg(
                                  `Image dimensions are valid. Width: ${width} height: ${height}`
                                )
                              } else {
                                setBackErrMsg(
                                  `Image dimensions are not valid. Width: ${width} height: ${height}`
                                )
                              }
                            } else {
                              setBackErrMsg(
                                `Image size is more than required. image size: ${fileSizeInBytes} max image size required: ${maxSizeInBytes}`
                              )
                            }
                          }
                          img.src = e.target.result
                        }

                        reader.readAsDataURL(file)
                      }
                    }}
                    accept='image/jpeg, image/png, image/jpg'
                  ></input>
                  <p
                    className='mt-1 text-sm text-gray-500 dark:text-gray-300'
                    id='file_input_help'
                  >
                    PNG, JPEG or JPG (MAX. 2mb, dimension 254 X 400).
                  </p>
                  {backErrMsg ? (
                    <p className='text-red-600'>{backErrMsg}</p>
                  ) : (
                    <p className='text-green-600'>{backSucMsg}</p>
                  )}
                </div>
              </div>

              <div className='form-group mb-6'>
                <FormikControl
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
                  control='input'
                  type='date'
                  name='YearOf_Publication'
                  label='Year of publication'
                />
              </div>
              <div className='form-group mb-6'>
                <label htmlFor='Book PDF'>Book PDF</label>
                <input
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
                  control='input'
                  accept='application/pdf'
                  required
                  type='file'
                  name='BookFile'
                  onChange={(e) => {
                    props.setFieldValue('BookFile', e.target.files[0])
                    setBookPDF(e.target.files[0].name)
                    // console.log(bookPDF)
                  }}
                  label='Book PDF'
                />
                <p
                  className='mt-1 text-sm text-gray-500 dark:text-gray-400'
                  id='file_input_help'
                >
                  PDF
                </p>
                <p className='text-green-500'>{bookPDF}</p>
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
                {isLoading ? 'Loading...' : 'Add Book'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateBook
