import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Logout = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    if (localStorage.getItem('user') !== null) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT'})
    }
    navigate('/signin')
}

export default Logout