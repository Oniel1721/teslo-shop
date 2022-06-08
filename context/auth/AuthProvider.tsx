import Cookies from 'js-cookie'
import { useReducer } from 'react'
import { tesloApi } from '../../api'
import { FC, IUser } from '../../interfaces'
import { AuthContext, authReducer } from './'

export interface AuthState {
    isLoggedIn: boolean,
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider:FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth_Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser
    }}>
         { children }
    </AuthContext.Provider>
  )
}
