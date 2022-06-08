import { FC } from '../interfaces'
import { AuthProvider } from './auth'
import { CartProvider } from './cart'
import { UIProvider } from './ui'

export const AppProviders:FC = ({ children }) => {
  return (
      <AuthProvider>
        <CartProvider>
            <UIProvider>
              {children}
          </UIProvider>
        </CartProvider>
      </AuthProvider>
  )
}
