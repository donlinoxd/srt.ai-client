import { Box } from '@mui/material'
import Navbar from './navbar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box
            sx={{
                position: 'relative',
                margin: '0 auto',
                maxWidth: {
                    xs: '425px',
                    sm: '1400px',
                },
                paddingX: {
                    sm: '5%',
                },
            }}
        >
            <Navbar />
            {children}
        </Box>
    )
}

export default Layout
