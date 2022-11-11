import Caption from '@components/caption'
import { useCaptionStore } from '@features/store'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { Button, Stack, Typography } from '@mui/material'

const CaptionEditor = () => {
    const { captions, addCaption } = useCaptionStore((state) => state)

    return (
        <Stack marginBottom='2rem'>
            <Typography variant='h6' align='center' component='h2'>
                SRT.ai - Subtitle Editor
            </Typography>
            <Stack sx={{ padding: '0.5rem', gap: '1rem' }}>
                {captions.map((caption) => (
                    <Caption key={caption.id} caption={caption} />
                ))}
            </Stack>
            <Button startIcon={<AddRoundedIcon />} onClick={addCaption}>
                <Typography>Add Subtitle</Typography>
            </Button>
        </Stack>
    )
}

export default CaptionEditor
