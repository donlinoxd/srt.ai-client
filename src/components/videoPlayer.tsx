import { useVideoPlayerStore } from '@features/store'
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded'
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import { Box, Button, ClickAwayListener, Slider, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const VideoPlayer = () => {
    const { currentTime, videoSrc, setCurrentTime, setVideoSrc, setDuration } = useVideoPlayerStore((state) => state)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isPlay, setIsPlay] = useState(false)
    const [showPlaySpeed, setShowPlaySpeed] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current

        const handlePlay = () => {
            setCurrentTime(video?.currentTime!)
        }

        const handleDuration = () => {
            setDuration(Math.ceil(video?.duration!))
        }

        if (video) {
            video.addEventListener('timeupdate', handlePlay)
            video.addEventListener('loadedmetadata', handleDuration)
        }

        return () => {
            video?.removeEventListener('timeupdate', handlePlay)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoSrc])

    useEffect(() => {
        const video = videoRef.current

        if (video) {
            video.currentTime = currentTime
        }
    }, [currentTime])

    useEffect(() => {
        if (!selectedFile) {
            setVideoSrc(null)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setVideoSrc(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile, setVideoSrc])

    useEffect(() => {
        if (!videoSrc) return

        const video = videoRef.current
        if (video && video.paused) {
            setIsPlay(false)
        } else {
            setIsPlay(true)
        }
    }, [videoRef.current?.paused, videoSrc])

    const selectFileHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    const handlePlay = () => {
        if (!videoSrc) return

        const video = videoRef.current
        if (video) {
            video.paused ? video.play() : video.pause()
        }
    }

    const handleRamping: React.MouseEventHandler<SVGSVGElement> = (e) => {
        if (!videoSrc) return

        const target = e.target as HTMLElement

        const video = videoRef.current
        if (video) {
            console.log(target.classList)

            target.classList.contains('fwd') ? (video.currentTime = currentTime + 10) : (video.currentTime = currentTime - 10)
        }
    }

    const handleVolume = (e: Event, newValue: number | number[]) => {
        const video = videoRef.current

        if (video) {
            video.volume = (newValue as number) / 100
        }
    }

    const handlePlaySpeed = (e: Event, newValue: number | number[]) => {
        const video = videoRef.current

        if (video) {
            video.playbackRate = newValue as number
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    width: '50%',
                    padding: '25%',
                    display: 'grid',
                    placeItems: 'center',
                    border: (theme) => `1px solid ${theme.palette.primary.light}`,
                    borderRadius: '5px',
                    overflow: 'hidden',
                    background: '#FFF',
                }}
            >
                {selectedFile && videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                        }}
                    >
                        <source src={videoSrc} type='video/*' />
                    </video>
                ) : (
                    <Button
                        variant='outlined'
                        startIcon={
                            <VideoCallOutlinedIcon
                                sx={{
                                    fontSize: {
                                        lg: '1.5rem !important',
                                    },
                                }}
                            />
                        }
                        component='label'
                        sx={{
                            background: '#FFF',
                            padding: {
                                lg: '0.5rem 1rem',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: '0.75rem',
                                    lg: '0.85rem',
                                    fontWeight: 500,
                                },
                            }}
                        >
                            SELECT VIDEO FILE
                            <input hidden accept='video/*' type='file' onChange={selectFileHandler} />
                        </Typography>
                    </Button>
                )}
            </Box>
            <Stack
                position='relative'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                paddingX='0.5rem'
                sx={{
                    background: '#FFF',
                    padding: {
                        lg: '0.85rem 1.5rem',
                    },
                }}
            >
                <Box sx={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <Typography
                        variant='body1'
                        component='span'
                        sx={{
                            fontSize: {
                                xs: '0.6rem',
                                lg: '0.8rem',
                            },
                        }}
                    >
                        {new Date(currentTime * 1000).toISOString().slice(14, 22)}
                    </Typography>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 0,
                        }}
                    >
                        <Box position='relative' display='flex' sx={{ placeItems: 'center', gap: { lg: '0.15rem' } }}>
                            <Typography
                                variant='body1'
                                component='span'
                                sx={{
                                    fontSize: {
                                        xs: '0.6rem',
                                        lg: '0.8rem',
                                    },
                                }}
                                onClick={() => setShowPlaySpeed(true)}
                            >
                                {videoRef.current?.playbackRate || 1}X
                            </Typography>
                            <KeyboardArrowDownRoundedIcon
                                sx={{
                                    fontSize: {
                                        xs: '0.75rem',
                                        lg: '0.85rem',
                                    },
                                }}
                            />
                            {showPlaySpeed && (
                                <ClickAwayListener onClickAway={() => setShowPlaySpeed(false)}>
                                    <Box
                                        sx={{
                                            background: '#fff',
                                            paddingY: '20px',
                                            borderRadius: '5px',
                                            height: '50px',
                                            position: 'absolute',
                                            bottom: '140%',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            boxShadow: '1px 1px 5px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <Slider
                                            valueLabelDisplay='auto'
                                            orientation='vertical'
                                            size='small'
                                            aria-label='Play Speed'
                                            defaultValue={videoRef.current?.playbackRate || 1}
                                            getAriaValueText={(value: number) => `${value}x`}
                                            step={0.5}
                                            min={0.5}
                                            max={1.5}
                                            marks={marks}
                                            onChange={handlePlaySpeed}
                                        />
                                    </Box>
                                </ClickAwayListener>
                            )}
                        </Box>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: {
                            lg: '0.25rem',
                        },
                        color: 'secondary.main',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <FastRewindRoundedIcon
                        fontSize='small'
                        cursor='pointer'
                        className='rwd'
                        onClick={handleRamping}
                        sx={{
                            fontSize: {
                                lg: '2rem',
                            },
                        }}
                    />
                    {isPlay ? (
                        <PauseRoundedIcon
                            fontSize='medium'
                            cursor='pointer'
                            onClick={handlePlay}
                            sx={{
                                fontSize: {
                                    lg: '2.5rem',
                                },
                            }}
                        />
                    ) : (
                        <PlayArrowRoundedIcon
                            fontSize='medium'
                            cursor='pointer'
                            onClick={handlePlay}
                            sx={{
                                fontSize: {
                                    lg: '2.5rem',
                                },
                            }}
                        />
                    )}
                    <FastForwardRoundedIcon
                        fontSize='small'
                        cursor='pointer'
                        className='fwd'
                        sx={{
                            fontSize: {
                                lg: '2rem',
                            },
                        }}
                        onClick={handleRamping}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: {
                            xs: '80px',
                            lg: '120px',
                        },
                        overflow: {
                            xs: 'hidden',
                            lg: 'visible',
                        },
                        paddingX: '0.5rem',
                    }}
                >
                    <VolumeUpRoundedIcon
                        fontSize='small'
                        sx={{
                            fontSize: {
                                lg: '1.5rem',
                            },
                        }}
                    />
                    <Slider aria-label='Volume' min={0} max={100} size='small' defaultValue={100} onChange={handleVolume} />
                </Box>
            </Stack>
        </Box>
    )
}

const marks = [{ value: 0.5 }, { value: 1 }, { value: 1.5 }]

export default VideoPlayer
