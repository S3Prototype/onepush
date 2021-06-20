import '../styles/globals.css'
import theme from '../material/theme'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return  (
    <Component {...pageProps} />
  )
}

export default MyApp
