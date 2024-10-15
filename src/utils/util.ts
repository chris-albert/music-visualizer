

export const secondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds - (minutes * 60)
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`
}