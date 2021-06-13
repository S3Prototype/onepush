import '../styles/globals.css'
import theme from '../material/theme'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return  (
    
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default MyApp
