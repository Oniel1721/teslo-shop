import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProviders } from '../context'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AppProviders>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppProviders>
    </SWRConfig>

  )
}

export default MyApp
