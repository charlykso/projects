import { getAllUserUrl } from './BaseUrl'
import useFetch from '../../hooks/useFetch'
import adminImg from '../../images/icons8-admin-64 (1).png'

const AdminsCount = () => {
  var noAdmins = 0
  
  const { data: users, isPending, error } = useFetch(getAllUserUrl)
  if (users) {
    users.map((user, index) => {
        if (user.Role === 'Admin') {
           noAdmins = noAdmins + 1; 
        }
        return noAdmins
    })
  }

  return (
    <div>
      {error && <h4 className='text-red-600'>{error}</h4>}
      {isPending ? (
        <h4>Loading ...</h4>
      ) : (
        <div className='flex'>
          <div className='flex'>
            <img src={adminImg} alt='' />
          </div>
          <div className='text-center'>
            <h4 className='text-it'>
              <i>No of Admins</i>
            </h4>
            <h4 className='text-6xl'> {noAdmins} </h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminsCount
