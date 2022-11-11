import { TCaption, useCaptionStore } from '@features/store'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import { getTime } from 'src/helpers/helpers'

interface CaptionProps {
    caption: TCaption
}

const Input = styled('input')({
    border: 'none',
    background: 'transparent',
    width: '0.8rem',
    fontFamily: 'roboto',
    fontSize: '0.7rem',
    textAlign: 'center',
})

const Caption = ({ caption }: CaptionProps) => {
    const { setCaption, setTime, deleteCaption, copyCaption } = useCaptionStore((state) => state)

    const [timings, setTimings] = useState({
        start: {
            sec: getTime(caption.start).second,
            min: getTime(caption.start).minute,
            hr: getTime(caption.start).hour,
        },
        end: {
            sec: getTime(caption.end).second,
            min: getTime(caption.end).minute,
            hr: getTime(caption.end).hour,
        },
    })

    useEffect(() => {
        setTimings({
            start: {
                sec: getTime(caption.start).second,
                min: getTime(caption.start).minute,
                hr: getTime(caption.start).hour,
            },
            end: {
                sec: getTime(caption.end).second,
                min: getTime(caption.end).minute,
                hr: getTime(caption.end).hour,
            },
        })
    }, [caption.start, caption.end])

    return (
        <Stack gap='0.5rem' flexDirection='row' alignItems='flex-start'>
            <Typography component='strong' variant='body1' fontSize='0.75rem'>
                {caption.id}
            </Typography>
            <Box
                sx={{
                    border: `1px solid ${grey[400]}`,
                    borderRadius: '3px',
                    padding: '0.5rem 0.25rem',
                    display: 'flex',
                    width: '100%',
                }}
            >
                <Stack>
                    <Stack>
                        <Typography fontSize='0.7rem'>start</Typography>
                        <Box
                            fontSize='0.6rem'
                            sx={{
                                paddingX: '0.2rem',
                                background: blue[50],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Input
                                type='number'
                                value={timings.start.hr}
                                onChange={(e) => {
                                    const val = e.target.valueAsNumber

                                    if (e.target.value.length > 2 || val < 0 || val > 24) return
                                    setTimings((timing) => ({ ...timings, start: { ...timing.start, hr: e.target.value } }))
                                }}
                                onBlur={(e) => {
                                    if (isNaN(e.target.valueAsNumber)) {
                                        setTimings((timing) => ({ ...timings, start: { ...timing.start, hr: '00' } }))
                                        setTime(caption.id, { start: caption.start % 3600 })
                                    } else {
                                        const value = e.target.value.length > 1 ? e.target.value : '0' + e.target.valueAsNumber

                                        setTimings((timing) => ({ ...timings, start: { ...timing.start, hr: value } }))

                                        setTime(caption.id, { start: +value * 3600 + (caption.start % 3600) })
                                    }
                                }}
                            />
                            <Typography fontSize='0.7rem'>:</Typography>
                            <Input
                                type='number'
                                value={timings.start.min}
                                onChange={(e) => {
                                    const val = e.target.valueAsNumber

                                    if (e.target.value.length > 2 || val < 0 || val > 59) return
                                    setTimings((timing) => ({ ...timings, start: { ...timing.start, min: e.target.value } }))
                                }}
                                onBlur={(e) => {
                                    if (isNaN(e.target.valueAsNumber)) {
                                        setTimings((timing) => ({ ...timings, start: { ...timing.start, min: '00' } }))
                                        setTime(caption.id, {
                                            start: (caption.start % 60) + Math.floor(caption.start / 3600) * 3600,
                                        })
                                    } else {
                                        const value = e.target.value.length > 1 ? e.target.value : '0' + e.target.valueAsNumber

                                        setTimings((timing) => ({ ...timings, start: { ...timing.start, min: value } }))

                                        setTime(caption.id, {
                                            start: +value * 60 + ((caption.start % 3600) % 60) + Math.floor(caption.start / 3600) * 3600,
                                        })
                                    }
                                }}
                            />
                            <Typography fontSize='0.7rem'>:</Typography>
                            <Input
                                type='number'
                                style={{
                                    width: '1.5rem',
                                }}
                                value={timings.start.sec}
                                onChange={(e) => {
                                    const val = e.target.valueAsNumber

                                    if (e.target.value.length > 4 || val < 0 || val > 59 || (val < 10 && e.target.value.length > 3)) return
                                    setTimings((timing) => ({ ...timings, start: { ...timing.start, sec: e.target.value } }))
                                }}
                                onBlur={(e) => {
                                    if (isNaN(e.target.valueAsNumber)) {
                                        setTimings((timing) => ({ ...timings, start: { ...timing.start, sec: '00.0' } }))
                                        setTime(caption.id, { start: Math.floor(caption.start / 60) * 60 })
                                    } else {
                                        console.log(e.target.valueAsNumber)
                                        const value =
                                            e.target.value.length > 3 || e.target.valueAsNumber > 10
                                                ? e.target.valueAsNumber.toFixed(1)
                                                : '0' + e.target.valueAsNumber.toFixed(1)

                                        setTimings((timing) => ({ ...timings, start: { ...timing.start, sec: value } }))

                                        setTime(caption.id, { start: +value + Math.floor(caption.start / 60) * 60 })
                                    }
                                }}
                            />
                        </Box>
                    </Stack>
                    <Stack>
                        <Typography fontSize='0.7rem'>end</Typography>
                        <Box
                            fontSize='0.6rem'
                            sx={{
                                paddingX: '0.2rem',
                                background: blue[50],
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Input
                                type='number'
                                value={timings.end.hr}
                                onChange={(e) => {
                                    const val = e.target.valueAsNumber

                                    if (e.target.value.length > 2 || val < 0 || val > 24) return
                                    setTimings((timing) => ({ ...timings, end: { ...timing.end, hr: e.target.value } }))
                                }}
                                onBlur={(e) => {
                                    if (isNaN(e.target.valueAsNumber)) {
                                        setTimings((timing) => ({ ...timings, end: { ...timing.end, hr: '00' } }))
                                        setTime(caption.id, { end: caption.end % 3600 })
                                    } else {
                                        const value = e.target.value.length > 1 ? e.target.value : '0' + e.target.valueAsNumber

                                        setTimings((timing) => ({ ...timings, end: { ...timing.end, hr: value } }))

                                        setTime(caption.id, { end: +value * 3600 + (caption.end % 3600) })
                                    }
                                }}
                            />
                            <Typography fontSize='0.7rem'>:</Typography>
                            <Input
                                type='number'
                                value={timings.end.min}
                                onChange={(e) => {
                                    const val = e.target.valueAsNumber

                                    if (e.target.value.length > 2 || val < 0 || val > 59) return
                                    setTimings((timing) => ({ ...timings, end: { ...timing.end, min: e.target.value } }))
                                }}
                                onBlur={(e) => {
                                    if (isNaN(e.target.valueAsNumber)) {
                                        setTimings((timing) => ({ ...timings, end: { ...timing.end, min: '00' } }))
                                        setTime(caption.id, {
                                            end: (caption.end % 60) + Math.floor(caption.end / 3600) * 3600,
                                        })
                                    } else {
                                        const value = e.target.value.length > 1 ? e.target.value : '0' + e.target.valueAsNumber

                                        setTimings((timing) => ({ ...timings, end: { ...timing.end, min: value } }))

                                        setTime(caption.id, {
                                            end: +value * 60 + ((caption.end % 3600) % 60) + Math.floor(caption.end / 3600) * 3600,
                                        })
                                    }
                                }}
                            />
                            <Typography fontSize='0.7rem'>:</Typography>
                            <Input
                                type='number'
                                style={{
                                    width: '1.5rem',
                                }}
                                value={timings.end.sec}
                                onChange={(e) => {
                                    const val = e.target.valueAsNumber

                                    if (e.target.value.length > 4 || val < 0 || val > 59 || (val < 10 && e.target.value.length > 3)) return
                                    setTimings((timing) => ({ ...timings, end: { ...timing.end, sec: e.target.value } }))
                                }}
                                onBlur={(e) => {
                                    if (isNaN(e.target.valueAsNumber)) {
                                        setTimings((timing) => ({ ...timings, end: { ...timing.end, sec: '00.0' } }))
                                        setTime(caption.id, { end: Math.floor(caption.end / 60) * 60 })
                                    } else {
                                        console.log(e.target.valueAsNumber)
                                        const value =
                                            e.target.value.length > 3 || e.target.valueAsNumber > 10
                                                ? e.target.valueAsNumber.toFixed(1)
                                                : '0' + e.target.valueAsNumber.toFixed(1)

                                        setTimings((timing) => ({ ...timings, end: { ...timing.end, sec: value } }))

                                        setTime(caption.id, { end: +value + Math.floor(caption.end / 60) * 60 })
                                    }
                                }}
                            />
                        </Box>
                    </Stack>
                </Stack>
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        padding: '0.5rem',
                        flex: 1,
                    }}
                >
                    <Input
                        type='text'
                        value={caption.line1}
                        style={{
                            border: 'none',
                            textAlign: 'center',
                            fontFamily: 'roboto',
                            width: '100%',
                        }}
                        onChange={(e) => {
                            setCaption(caption.id, e.target.value)
                        }}
                    />
                    <Input
                        type='text'
                        value={caption.line2}
                        style={{
                            width: '100%',
                        }}
                        onChange={(e) => {
                            setCaption(caption.id, undefined, e.target.value)
                        }}
                    />
                </Stack>
                <Stack justifyContent='space-between'>
                    <IconButton
                        aria-label='delete'
                        component='label'
                        onClick={() => {
                            deleteCaption(caption.id)
                        }}
                    >
                        <DisabledByDefaultRoundedIcon
                            sx={{
                                fontSize: '0.9rem',
                            }}
                        />
                    </IconButton>
                    <IconButton
                        aria-label='copy'
                        component='label'
                        onClick={() => {
                            copyCaption(caption)
                        }}
                    >
                        <ContentCopyRoundedIcon
                            sx={{
                                fontSize: '0.9rem',
                            }}
                        />
                    </IconButton>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Caption
