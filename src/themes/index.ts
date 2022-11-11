import { createTheme } from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            main: '#46B7BA',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#202020',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 750,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
})

export default theme
