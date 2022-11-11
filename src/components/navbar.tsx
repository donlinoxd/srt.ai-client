import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'

import logo from '@images/logo.svg'

const Navbar = () => {
    return (
        <>
            <AppBar
                position='relative'
                sx={{
                    boxShadow: 'none',
                    background: '#FFF',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        height: {
                            xs: '4rem',
                            sm: '5rem',
                            lg: '6.5rem',
                        },
                        paddingY: '0.5rem',
                    }}
                >
                    <Box
                        position='relative'
                        sx={{
                            width: {
                                xs: '4rem',
                                sm: '5.5rem',
                                lg: '6.5rem',
                            },
                            height: '100%',
                            display: 'block',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <Image src={logo} alt='Logo' layout='fill' objectFit='contain' />
                    </Box>
                    <Button variant='contained' size='small' endIcon={<FileDownloadOutlinedIcon />}>
                        <Typography
                            fontWeight='500'
                            sx={{
                                fontSize: {
                                    xs: '0.75rem',
                                    md: '0.85rem',
                                    lg: '1rem',
                                },
                            }}
                        >
                            EXPORT
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
