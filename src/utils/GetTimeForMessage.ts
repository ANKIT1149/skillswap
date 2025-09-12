export const GetTimeForMessage = (timestamp: string) => {
    const messageTime = new Date(timestamp)
    const now = new Date()

    const diffTime = now.getTime() - messageTime.getTime()
    const diffdays = Math.floor(diffTime / 1000 * 60 * 60 * 24)

    if (diffdays === 0) return 'today';
    if (diffdays === 1) return 'yesterday';

    return messageTime.toLocaleDateString([], {day: 'numeric', month: 'short', year: "numeric"})
}