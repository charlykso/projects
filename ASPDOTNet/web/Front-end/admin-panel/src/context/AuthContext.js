import React, { createContext, useReducer, useEffect } from 'react'
// import moment from 'moment'
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext()



export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }

    case 'LOGOUT':
      return { user: null }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      const token = JSON.parse(localStorage.getItem('token'))
      const decodedToken = jwtDecode(token.token)
      const expirationDate = new Date(decodedToken.exp * 1000)
      // var timeNow = moment()
      // var expireT = moment(token.expiration, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      if (expirationDate < new Date()) {
        //remove toke from localstorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        //dispatch logout function
        dispatch({ type: 'LOGOUT' })

        window.location.href = '/login'
      } else {
        dispatch({ type: 'LOGIN', payload: user })
        // history.goBack()
      }
    }
  }, [])
  // console.log('AuthContext state :', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
