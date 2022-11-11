import create from 'zustand'

export interface TCaption {
    id: string
    start: number
    end: number
    line1: string
    line2: string
}

interface CaptionState {
    captions: TCaption[]
    setCaption: (id: TCaption['id'], value1?: string, value2?: string) => void
    addCaption: () => void
    copyCaption: (caption: TCaption) => void
    deleteCaption: (id: TCaption['id']) => void
    setTime: (id: TCaption['id'], time: { start?: number; end?: number }) => void
}

interface VideoPlayerState {
    videoSrc: string | null
    currentTime: number
    duration: number
    setVideoSrc: (src: string | null) => void
    setCurrentTime: (time: number) => void
    setDuration: (time: number) => void
}

export const useCaptionStore = create<CaptionState>()((set) => ({
    captions: [
        {
            id: '0',
            start: 0,
            end: 2,
            line1: 'First Line Caption',
            line2: 'Second Line Caption',
        },
    ],
    setCaption: (id, value1, value2) =>
        set((state) => {
            return {
                captions: state.captions.map((caption) =>
                    caption.id === id
                        ? { ...caption, line1: value1 === undefined ? caption.line1 : value1, line2: value2 === undefined ? caption.line2 : value2 }
                        : caption
                ),
            }
        }),
    addCaption: () =>
        set((state) => {
            const newCaption = {
                id: String(state.captions.length),
                start: state.captions.length ? state.captions[state.captions.length - 1].end + 0.25 : 0,
                end: state.captions.length ? state.captions[state.captions.length - 1].end + 2.25 : 1,
                line1: 'Upper caption',
                line2: 'Lower caption',
            }
            return {
                captions: [...state.captions, newCaption],
            }
        }),
    deleteCaption: (id) =>
        set((state) => {
            return {
                captions: state.captions.filter((caption) => caption.id !== id),
            }
        }),
    copyCaption: (caption: TCaption) =>
        set((state) => {
            return {
                captions: [...state.captions, { ...caption, id: String(state.captions.length) }],
            }
        }),
    setTime: (id, time) =>
        set((state) => {
            return {
                captions: state.captions.map((caption) => {
                    return caption.id === id
                        ? {
                              ...caption,
                              start: time.start !== undefined ? time.start : caption.start,
                              end: time.end !== undefined ? time.end : caption.end,
                          }
                        : caption
                }),
            }
        }),
}))

export const useVideoPlayerStore = create<VideoPlayerState>()((set) => ({
    videoSrc: null,
    currentTime: 0,
    duration: 20,
    setVideoSrc: (src) => set((state) => ({ videoSrc: src })),
    setCurrentTime: (time) => set((state) => ({ currentTime: time })),
    setDuration: (time) => set((state) => ({ duration: time })),
}))
