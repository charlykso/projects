import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const logout = () => {
    if (localStorage.getItem('user') !== null) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    dispatch({ type: 'LOGOUT' })
    navigate('/signin')
  }
  return { logout }
}
