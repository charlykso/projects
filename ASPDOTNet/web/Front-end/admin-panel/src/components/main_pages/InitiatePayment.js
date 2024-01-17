import React, {useState} from 'react';
import { useCreate } from '../../hooks/useCreate'
import { initiatePaymentUrl } from "../sub_pages/BaseUrl";

const InitiatePayment = () => {
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [bookId, setBookId] = useState('')
    const [userId, setUserId] = useState('')
    const [amount, setAmount] = useState('')
    const { createUser, error, isLoading, resData } = useCreate()
    let token = JSON.parse(localStorage.getItem('token'))
    let jwt = token.token

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('Amount', amount);
        formData.append('Email', email);
        formData.append('PhoneNo', phoneNo);
        formData.append('Book_Id', bookId);
        formData.append('User_Id', userId);
        try{
            createUser(initiatePaymentUrl, formData, jwt)
            if (resData) {
                console.log(JSON.parse(resData));
            }
        } catch(error){
            console.log(error.Message);
        }
    }
  return (
    <div className='container m-auto'>
      <h2 className='text-center mb-6 mt-6 font-extrabold'>Make Payment</h2>
      {error && <p className='text-red-600'>{error}</p>}
      {resData && resData}
      <form action='' method='post' onSubmit={handleSubmit}>
        <div className='form-group mb-6'>
          <input
            type='text'
            required
            name='amount'
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
            placeholder='Amount'
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='form-group mb-6'>
          <input
            type='email'
            required
            name='email'
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
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group mb-6'>
          <input
            type='text'
            required
            name='phoneNo'
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
            placeholder='Phone number'
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className='form-group mb-6'>
          <input
            type='number'
            required
            name='Book_id'
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
            placeholder='Book Id'
            onChange={(e) => setBookId(e.target.value)}
          />
        </div>
        <div className='form-group mb-6'>
          <input
            type='number'
            required
            name='User_Id'
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
            placeholder='User Id'
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button
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
          {isLoading ? 'Loading...' : 'Make payment'}
        </button>
      </form>
    </div>
  )
}

export default InitiatePayment;
