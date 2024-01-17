import { getAllUserUrl } from './BaseUrl'
import useFetch from '../../hooks/useFetch'
import userImg from '../../images/icons8-users-64.png'

const UsersCount = () => {
  var noUsers = null
  const { data: users, isPending, error } = useFetch(getAllUserUrl)
  if (users) {
    noUsers = users.length
  }

  return (
    <div>
      {error && <h4 className='text-red-600'>{error}</h4>}
      {isPending ? (
        <h4>Loading ...</h4>
      ) : (
        <div className='flex'>
          <div className='flex'>
            <img src={userImg} alt='' />
          </div>
          <div className='text-center'>
            <h4 className=''>
              <i>No of Users</i>
            </h4>
            <h4 className='text-6xl'> {noUsers} </h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersCount
