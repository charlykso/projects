import Breadcrumbs from '../sub_pages/Breadcrumbs'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import useGet from '../../hooks/useGet'
import { getAuthorUrl, updateAuthorUrl } from '../sub_pages/BaseUrl'
import Loading from '../sub_pages/Loading'
import { Form, Formik } from 'formik'
import { UpdateAuthorSchema } from '../forms/Schemas'
import CustomInput from '../forms/CustomInput'
import CustomSelect from '../forms/CustomSelect'
import { useUpdate } from '../../hooks/useUpdate'
import React from 'react'
import { baseURL } from '../../api/baseURL'

const ViewAuthor = () => {
  const location = useLocation()
  // const fileRef = useRef()
  const { Id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))
  const jwt = token.token
  const { data: author, isPending, error } = useGet(getAuthorUrl, Id)
  const { updateUser, isLoading, updateError } = useUpdate()
  // const [image_name, setImage_name] = useState('')
  const navigate = useNavigate()
  var dateForInput = null;

  if (author) {
    // console.log(author);
    //slice the baseURL the get the url that serves the image
    // console.log(baseURL);
    const baseurl = baseURL.slice(0, 27)
    // console.log(baseurl);

    var img_url = author.ImageURL

    //remove the wwwroot folder from the image path
    const author_img_url = img_url.slice(8)
    var Author_Img_Url = baseurl + author_img_url
    // console.log(Author_Img_Url);

    //formating the date of birth
    const dateFromDB = author.Date_of_birth;
    const dateObject = new Date(dateFromDB);
    dateForInput = dateObject.toISOString().substr(0, 10);
    
  }

  return (
    <div className='mx-auto md:px-8 '>
      {!isPending && <Breadcrumbs location={location.pathname} />}
      {isPending && <Loading />}
      {error && <div className='text-red-600'>{error}</div>}
      {author && (
        <div className='grid grid-rows-2 gap-1 md:grid-rows-1 md:w-full lg:grid-cols-2 mt-5 '>
          <div className='grid sm:grid-cols-2  md:grid-cols-2 lg:grid-rows-2 rounded-lg bg-gray-100'>
            <div className='img '>
              <img
                className=' w-full h-86 md:h-96 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg'
                src={Author_Img_Url}
                alt=''
              />
            </div>
            <div className='pl-6 pt-2 pr-6'>
              <h4 className='text-xl'>Details</h4>
              <h5 className='text-gray-900 text-xl font-medium mb-2'>
                First name: {author.Firstname}
                <br />
                Last name: {author.Lastname}
              </h5>
              <p className='text-gray-700 text-base mb-1'>
                Email: {author.Email}
              </p>
              <p className='text-gray-700 text-base mb-1'>
                Phone No: {author.Phone_no}
              </p>
              <p className='text-gray-700 text-base mb-1'>
                Gender: {author.Gender}
              </p>
              <p className='text-gray-600 text-xs'>
                <b>DOB:</b> {dateForInput}
              </p>
              <p className='text-gray-600 text-xs'>
                <b>Reg Date:</b> {author.Created_at}
              </p>
              <p className='text-gray-600 text-xs'>
                <b>Updated At:</b> {author.Updated_at}
              </p>
              <h4 className='px-2 py-2'>Books</h4>
              {author.Books.length > 0 ? (
                <div className='scroll-smooth scroll-m-8  md:scroll-auto'>
                  <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value=''> ------ </option>
                    {author.Books.map((book) => (
                      <option
                        className='px-2 py-2 border-b border-gray-200 w-auto rounded-t-lg'
                        key={book.Id}
                      >
                        {book.Title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <h4>No Book</h4>
              )}
            </div>
          </div>
          <div className='  rounded-lg bg-gray-100'>
            <h3 className='text-center mt-3'>Edit Author</h3>
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
                  Firstname: author.Firstname,
                  Lastname: author.Lastname,
                  Email: author.Email,
                  Phone_No: author.Phone_no,
                  Date_of_birth: dateForInput,
                  Gender: author.Gender,
                  AuthorPic: author.ImageURL,
                }}
                validationSchema={UpdateAuthorSchema}
                onSubmit={async (values, actions) => {
                  // console.log(values);
                  let formdata = new FormData()
                  formdata.append('FirstName', values.Firstname)
                  formdata.append('LastName', values.Lastname)
                  formdata.append('Email', values.Email)
                  formdata.append('Gender', values.Gender)
                  formdata.append('Phone_no', values.Phone_No)
                  formdata.append('Date_of_birth', values.Date_of_birth)
                  formdata.append('Image', values.AuthorPic)
                  try {
                    await updateUser(updateAuthorUrl, formdata, jwt, Id)
                    navigate('/Authors')
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
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='form-group mb-6'>
                        <CustomSelect
                          name='Gender'
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
                          aria-label='Default select example'
                        >
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                        </CustomSelect>
                      </div>
                      <div className='form-group mb-6'>
                        <CustomInput
                          name='Date_of_birth'
                          type='date'
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
                          placeholder='Date of birth'
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
                        placeholder='Phone Number'
                      />
                    </div>
                    <div className='form-group mb-6'>
                      <label
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                        htmlFor='file_input'
                      >
                        Author's Image
                      </label>
                      <input
                        name='AuthorPic'
                        onChange={(e) => {
                          props.setFieldValue('AuthorPic', e.target.files[0])
                        }}
                        className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                        aria-describedby='file_input_help'
                        id='file_input'
                        type='file'
                        required
                        accept='image/jpeg, image/png, image/jpg'
                      />
                      <p
                        className='mt-1 text-sm text-gray-500 dark:text-gray-300'
                        id='file_input_help'
                      >
                        PNG, JPEG or JPG (MAX. 2mb).
                      </p>
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
export default ViewAuthor
