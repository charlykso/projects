import Breadcrumbs from '../sub_pages/Breadcrumbs'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import FormikControl from '../forms/FormikControl'
import useGet from '../../hooks/useGet'
import React, { useState, useEffect } from 'react'
import { baseURL } from '../../api/baseURL'
import {
  getSingleBookUrl,
  updateBookUrl,
  getAllAuthorUrl,
} from '../sub_pages/BaseUrl'
import Loading from '../sub_pages/Loading'
import { Form, Formik } from 'formik'
import { UpdateBookSchema } from '../forms/Schemas'
import { useUpdate } from '../../hooks/useUpdate'
import MySelect from '../forms/Select'

const ViewBook = () => {
  const location = useLocation()
  const { Id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))
  const jwt = token.token
  const [AuthorError, setAuthorError] = useState()
  const [authorData, setAuthoData] = useState([])
  const navigate = useNavigate()

  const { data: book, isPending, error } = useGet(getSingleBookUrl, Id)
  const { updateUser, isLoading, /*updateError*/ } = useUpdate()
  let dateForInput = null

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
  if (book) {
    // console.log(book);
    //slice the baseURL the get the url that serves the image
    const baseurl = baseURL.slice(0, 27)

    let front = book.Front_Cover_Img_url
    let back = book.Back_Cover_Img_url
    let smallFront = book.Small_front_Cover_Img_url

    //remove the wwwroot folder from the image path
    const FCover_page = front.slice(8)
    const BCover_page = back.slice(8)
    const SFCover_page = smallFront.slice(8)

    //merge the root path and the image path
    var front_page_img = baseurl + FCover_page
    var back_page_img = baseurl + BCover_page
    var Small_front_page_img = baseurl + SFCover_page
    // console.log(front_page_img)

    //formating the date of birth
    const dateFromDB = book.YearOf_Publication
    const dateObject = new Date(dateFromDB)
    dateForInput = dateObject.toISOString().slice(0, 10)
    // console.log(dateForInput)
  }

  return (
    <div className='container mx-auto md:px-8 '>
      {!isPending && <Breadcrumbs location={location.pathname} />}
      {isPending && <Loading />}
      {error && <div className='text-red-600'>{error}</div>}
      {book && (
        <div className='grid grid-rows-2 gap-2 justify-items-stretch lg:grid-cols-2 md:grid-rows-1 mt-5  justify-between'>
          <div className=' rounded-lg bg-gray-100 shadow-lg'>
            <div className='grid grid-cols-2 gap-4 mb-3'>
              <div className='max-h-50 max-w-50 m-3'>
                <img
                  className='object-fill h-full w-full  rounded md:rounded'
                  src={front_page_img}
                  alt='Front cover'
                />
                <h4 className='text-center'>Front cover image</h4>
              </div>
              <div className='max-h-50 max-w-50 m-3'>
                <img
                  className='object-fill h-full w-full  rounded md:rounded'
                  src={back_page_img}
                  alt='Back cover'
                />
                <h4 className='text-center'>Back cover image</h4>
              </div>
            </div>
            <div className='p-3'>
              <div className='flex flex-row justify-between'>
                <div>
                  <h5 className='text-gray-900 text-xl font-medium mb-2'>
                    Title: {book.Title}
                  </h5>
                  <h4 className='mb-1'>Sub_Title: {book.Sub_Title}</h4>
                  <p className='text-gray-600 text-s mb-1'>
                    ISBN_Number: {book.ISBN_Number}
                  </p>
                  <p className='text-gray-600 text-s mb-1'>
                    Publisher: {book.Publisher}
                  </p>
                  <p className='text-gray-600 text-s mb-1'>
                    Price: &#8358;{book.Price}
                  </p>
                  <div className='border'>
                    <h4 className='text-gray-600 text-s '>
                      <b>Year Of Publication:</b>
                    </h4>
                    <p>{dateForInput}</p>
                    <h4 className='text-gray-600 text-s'>
                      <b>Reg Date:</b>
                    </h4>
                    <p>{book.Created_at}</p>
                    <h4 className='text-gray-600 text-s'>
                      <b>Updated At:</b>
                    </h4>
                    <p>{book.Updated_at}</p>
                  </div>
                </div>
                <div className='max-h-50 max-w-50 m-3'>
                  <img
                    className='object-fill h-full w-full  rounded md:rounded'
                    src={Small_front_page_img}
                    alt='Small front cover'
                  />
                  <h4 className='text-center'>Small front cover image</h4>
                </div>
              </div>
              <h4 className='py-2'>
                <b>Author:</b> {book.AuthorId ? book.Author_name : 'No Author'}
              </h4>
            </div>
          </div>
          <div className='bg-gray-100 rounded-lg'>
            <div className='p-6 rounded-lg w-full shadow-lg '>
              <Formik
                initialValues={{
                  Title: book.Title,
                  Sub_Title: book.Sub_Title,
                  YearOf_Publication: dateForInput,
                  ISBN_Number: book.ISBN_Number,
                  Publisher: book.Publisher,
                  BookFile: book.BookFile,
                  Price: book.Price,
                  AuthorId: book.AuthorId,
                  // Front_Cover_Img: book.Front_Cover_Img,
                  // Back_Cover_Img: book.Back_Cover_Img,
                  // Small_front_cover_Img: book.Small_front_cover_img,
                }}
                validationSchema={UpdateBookSchema}
                onSubmit={async (values, actions) => {
                  values.Back_Cover_Img = backImage
                  values.Small_front_cover_img = smallFrontImage
                  values.Front_Cover_Img = frontImage
                  // console.log(values)
                  let formData = new FormData()
                  formData.append('Title', values.Title)
                  formData.append('Sub_Title', values.Sub_Title)
                  formData.append(
                    'YearOf_Publication',
                    values.YearOf_Publication
                  )
                  formData.append('ISBN_Number', values.ISBN_Number)
                  formData.append('Publisher', values.Publisher)
                  formData.append('Price', values.Price)
                  formData.append('AuthorId', values.AuthorId)
                  formData.append('Front_Cover_Img', values.Front_Cover_Img)
                  formData.append('Back_Cover_Img', values.Back_Cover_Img)
                  formData.append(
                    'Small_front_cover_img',
                    values.Small_front_cover_img
                  )
                  formData.append('BookFile', values.BookFile)
                  try {
                    await updateUser(updateBookUrl, formData, jwt, Id)
                    navigate('/Books')
                  } catch (error) {
                    console.log(error.message)
                  }
                }}
              >
                {(props) => (
                  <Form>
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
                            <option key={authordata.Id} value={authordata.Id}>
                              {authordata.Firstname} {authordata.Lastname}
                            </option>
                          ))}
                        </MySelect>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                      <div className='form-group mb-6'>
                        <label
                          htmlFor='Front cover image'
                          className='text-sm whitespace-normal overflow-ellipsis overflow-hidden'
                        >
                          Front cover image
                        </label>
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
                          className='mt-1 text-xs text-gray-500 dark:text-gray-500 whitespace-normal overflow-ellipsis overflow-hidden'
                          id='file_input_help'
                        >
                          PNG, JPEG or JPG (MAX. 2mb, dimension 254 X 400).
                        </p>
                        {frontErrMsg ? (
                          <p className='text-red-600 text-xs whitespace-normal overflow-ellipsis overflow-hidden'>
                            {frontErrMsg}
                          </p>
                        ) : (
                          <p className='text-green-600 text-xs whitespace-normal overflow-ellipsis overflow-hidden'>
                            {frontSucMsg}
                          </p>
                        )}
                      </div>
                      <div className='form-group mb-6'>
                        <label
                          htmlFor='Small front cover image'
                          className='text-sm whitespace-normal overflow-ellipsis overflow-hidden'
                        >
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
                          className='mt-1 text-xs text-gray-500 dark:text-gray-500 whitespace-normal overflow-ellipsis overflow-hidden'
                          id='file_input_help'
                        >
                          PNG, JPEG or JPG (MAX. 2mb, dimension 126 X 200).
                        </p>
                        {smallFrontErrMsg ? (
                          <p className='text-red-600 text-xs whitespace-normal overflow-ellipsis overflow-hidden'>
                            {smallFrontErrMsg}
                          </p>
                        ) : (
                          <p className='text-green-600 text-xs whitespace-normal overflow-ellipsis overflow-hidden'>
                            {smallFrontSucMsg}
                          </p>
                        )}
                      </div>
                      <div className='form group mb-6'>
                        <label
                          htmlFor='Back cover image'
                          className='text-sm whitespace-normal overflow-ellipsis overflow-hidden'
                        >
                          Back cover image
                        </label>
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
                          className='mt-1 text-xs text-gray-500 dark:text-gray-500 whitespace-normal overflow-ellipsis overflow-hidden'
                          id='file_input_help'
                        >
                          PNG, JPEG or JPG (MAX. 2mb, dimension 254 X 400).
                        </p>
                        {backErrMsg ? (
                          <p className='text-red-600 text-xs whitespace-normal overflow-ellipsis overflow-hidden'>
                            {backErrMsg}
                          </p>
                        ) : (
                          <p className='text-green-600 text-xs whitespace-normal overflow-ellipsis overflow-hidden'>
                            {backSucMsg}
                          </p>
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
                        className='mt-1 text-sm text-gray-500 dark:text-gray-300'
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
        </div>
      )}
    </div>
  )
}
export default ViewBook
