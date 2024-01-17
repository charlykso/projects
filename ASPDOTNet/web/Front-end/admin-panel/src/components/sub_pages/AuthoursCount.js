import { getAllAuthorUrl } from './BaseUrl'
import useFetch from '../../hooks/useFetch'
import AuthoursImg from '../../images/icons8-recent-actors-50.png'

const AuthoursCount = () => {
  var noAuthours = null
  const { data: authours, isPending, error } = useFetch(getAllAuthorUrl)
  if (authours) {
    noAuthours = authours.length
  }

  return (
    <div>
      {error && <h4 className='text-red-600'>{error}</h4>}
      {isPending ? (
        <h4>Loading ...</h4>
      ) : (
        <div className='flex'>
          <div className='flex basis-[30%] ' >
            <img src={AuthoursImg} alt='' className='' />
          </div>
          <div className='text-center basis-auto'>
            <h4 className=''>
              <i>No of Authours</i>
            </h4>
            <h4 className='text-6xl'> {noAuthours} </h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthoursCount
