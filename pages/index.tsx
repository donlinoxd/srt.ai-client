import CaptionEditor from '@components/captionEditor'
import CaptionTimeline from '@components/captionTimeline'
import VideoPlayer from '@components/videoPlayer'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'row-reverse',
                },
            }}
        >
            <Box
                sx={{
                    padding: '2rem 0.5rem 1rem',
                    background: grey[50],
                    width: {
                        xs: '100%',
                        sm: '50%',
                        md: '60%',
                    },
                }}
            >
                <VideoPlayer />
                <CaptionTimeline />
            </Box>
            <Box
                sx={{
                    width: {
                        xs: '100%',
                        sm: '50%',
                        md: '40%',
                    },
                }}
            >
                <CaptionEditor />
            </Box>
        </Box>
    )
}

export default Home
