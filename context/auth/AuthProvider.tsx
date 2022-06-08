import { useReducer } from 'react'
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

  return (
    <AuthContext.Provider value={{
      ...state
    }}>
         { children }
    </AuthContext.Provider>
  )
}
