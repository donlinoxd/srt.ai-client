import { useCaptionStore, useVideoPlayerStore } from '@features/store'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/system'
import { Rnd } from 'react-rnd'

const CaptionTimeline = () => {
    const { currentTime, setCurrentTime, duration } = useVideoPlayerStore((state) => state)

    const { captions, setTime } = useCaptionStore((state) => state)

    const desktopUp = useMediaQuery('(min-width: 1200px)')
    const timeWidth = desktopUp ? 60 : 50

    const handleSetCurrentTime: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const target = e.target as HTMLElement
        const { left } = target.getBoundingClientRect()
        const x = e.clientX

        setCurrentTime((x - left) / timeWidth)
    }

    return (
        <Box
            sx={{
                border: `1px solid ${grey[400]}`,
                paddingLeft: '2rem',
                overflow: 'hidden',
                background: '#FFF',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    background: grey[100],
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '5rem',
                    marginTop: '4px',
                    width: 'calc(100% + 2rem)',
                }}
            >
                <Box
                    sx={{
                        width: '2px',
                        background: (theme) => theme.palette.primary.main,
                        height: '100%',
                        left: '2rem',
                        position: 'relative',

                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: (theme) => `10px solid ${theme.palette.primary.main}`,
                        },
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    left: `-${currentTime * timeWidth}px`,
                    transition: 'all 0.3s linear',
                }}
            >
                <Box
                    sx={{
                        paddingTop: '1rem',
                        height: '30px',
                        display: 'flex',
                        position: 'relative',
                    }}
                >
                    <Stack
                        flexDirection='row'
                        sx={{
                            gap: {
                                xs: '18.75px',
                                lg: '16px',
                            },
                            position: 'relative',
                            backgroundImage: (theme) =>
                                `linear-gradient(90deg, ${theme.palette.secondary.main} 0px, ${theme.palette.secondary.main} 1px, transparent 1px), linear-gradient(rgb(255, 255, 255) 40%, transparent 40%), linear-gradient(90deg, transparent 20%, ${theme.palette.secondary.main} 20%, ${theme.palette.secondary.main} 22%, transparent 22%, transparent 40%, ${theme.palette.secondary.main} 40%, ${theme.palette.secondary.main} 42%, transparent 42%, transparent 60%, ${theme.palette.secondary.main} 60%, ${theme.palette.secondary.main} 62%, transparent 62%, transparent 80%, ${theme.palette.secondary.main} 80%, ${theme.palette.secondary.main} 82%, transparent 82%)`,
                            backgroundPositionY: '100%',
                            backgroundSize: {
                                xs: `${timeWidth}px 12px`,
                                lg: `${timeWidth}px 12px`,
                            },
                            backgroundRepeat: 'repeat-x',
                        }}
                        onClick={handleSetCurrentTime}
                    >
                        {[...Array(duration).keys()].map((time) => (
                            <Typography
                                key={time}
                                component='span'
                                variant='body1'
                                sx={{
                                    fontSize: {
                                        xs: '0.5rem',
                                        lg: '0.7rem',
                                    },

                                    position: 'relative',
                                    left: {
                                        xs: '-1rem',
                                        lg: '-1.4rem',
                                    },
                                    pointerEvents: 'none',
                                }}
                            >
                                {new Date(time * 1000).toISOString().slice(11, 19)}
                            </Typography>
                        ))}
                    </Stack>
                </Box>
                <Box
                    sx={{
                        width: `${50 * duration}px`,
                        position: 'relative',
                        height: '5rem',
                        marginTop: '4px',
                    }}
                >
                    {captions.map((caption, index) => (
                        <RndStyle
                            size={{ height: 40, width: 50 * (caption.end - caption.start) }}
                            key={caption.id}
                            position={{ x: caption.start * 50, y: 20 }}
                            enableResizing={{
                                top: false,
                                right: true,
                                bottom: false,
                                left: true,
                                topRight: false,
                                bottomRight: false,
                                bottomLeft: false,
                                topLeft: false,
                            }}
                            resizeHandleStyles={{
                                left: {},
                            }}
                            bounds='parent'
                            resizeHandleClasses={{ left: 'resize__handle', right: 'resize__handle' }}
                            dragAxis='x'
                            onDragStop={(e, d) => {
                                const target = e.target as HTMLElement

                                if (!target.classList.contains('resize__handle')) {
                                    const width = 50 * (caption.end - caption.start)

                                    setTime(caption.id, {
                                        start: d.x / 50,
                                        end: width / 50 + d.x / 50,
                                    })
                                }
                            }}
                            onResizeStop={(e, dir, ref, delta, position) => {
                                console.log({
                                    e,
                                    dir,
                                    ref,
                                    delta,
                                    position,
                                })

                                if (dir === 'right') {
                                    setTime(caption.id, {
                                        end: caption.end + delta.width / 50,
                                    })
                                } else {
                                    setTime(caption.id, {
                                        start: caption.start - delta.width / 50,
                                    })
                                }
                            }}
                        >
                            <Typography
                                variant='body1'
                                component='strong'
                                fontSize='0.6rem'
                                color='primary'
                                sx={{ position: 'absolute', top: '-0.85rem', left: 0 }}
                            >
                                {caption.id}
                            </Typography>
                            <Box sx={{ overflow: 'hidden' }}>
                                <Typography variant='body1' component='span' display='block' fontSize='0.6rem'>
                                    {caption.line1}
                                </Typography>
                                <Typography variant='body1' component='span' display='block' fontSize='0.6rem'>
                                    {caption.line2}
                                </Typography>
                            </Box>
                        </RndStyle>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

const RndStyle = styled(Rnd)((theme) => ({
    background: '#FFF',
    borderRadius: '3px',
    padding: '0.25rem 0.5rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    position: 'relative',
    '&:hover': {
        borderLeft: `3px solid green`,
        borderRight: `3px solid green`,
        zIndex: 100,
    },
}))

export default CaptionTimeline
