export const getTime = (seconds: number) => {
    const date = new Date(seconds * 1000).toISOString()

    return {
        second: date.slice(17, 21),
        minute: date.slice(14, 16),
        hour: date.slice(11, 13),
    }
}
