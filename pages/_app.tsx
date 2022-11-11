import type { AppProps } from 'next/app'

// css & fonts
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@styles/global.css'

import Layout from '@components/layout'
import { ThemeProvider } from '@mui/material'
import theme from '@themes/index'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}

export default App
