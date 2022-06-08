import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { SWRConfig } from 'swr'
import { FC } from '../interfaces'
import { lightTheme } from '../themes'
import { AuthProvider } from './auth'
import { CartProvider } from './cart'
import { UIProvider } from './ui'

export const AppProviders:FC = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                {
                    children
                }
              </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
