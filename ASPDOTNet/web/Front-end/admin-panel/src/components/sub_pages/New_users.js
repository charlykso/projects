import React from 'react'
import { getAllUserUrl } from '../sub_pages/BaseUrl'
import useFetch from '../../hooks/useFetch'
import { ThreeDots } from 'react-loading-icons'

const New_users = () => {
  const { data: users, isPending, error } = useFetch(getAllUserUrl)

  var newUsers = []
  if (users) {
    var no_Of_Users = users.length

    for (let count = 0; count < no_Of_Users; no_Of_Users--) {
      if (users.length < 10) {
        newUsers.push(users[no_Of_Users - 1])
      } else if (newUsers.length < 10) {
        newUsers.push(users[no_Of_Users - 1])
      } else {
        break
      }
    }
  }
  return (
    <div className='right max-h-72  pt-5 w-full rounded-lg '>
      <h3 className='text-black-700 text-2xl md:text-3xl lg:text-4xl font-bold pl-5'>
        New Users
      </h3>
      <div className='h-full overflow-y-auto'>
        {error && <div className='text-red-600 pl-5'>{error}</div>}
        {isPending ? (
          <div className='flex justify-center p-3'>
            <p>
              <ThreeDots />
            </p>
          </div>
        ) : (
          <div className='overflow-y-hidden h-52'>
            <div className='flex justify-start p-3 h-full overflow-auto'>
              <table className='min-w-full mb-2'>
                <thead className='bg-white border-b'>
                  <tr>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      S/N
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Last Name
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      First Name
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
                    >
                      Phone No
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newUsers.map((newUser, index) => (
                    <tr
                      className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                      key={index}
                    >
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {index + 1}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {newUser.Firstname}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {newUser.Lastname}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {newUser.Email}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {newUser.Phone_no}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default New_users
