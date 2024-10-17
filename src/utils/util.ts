

export const secondsToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds - (minutes * 60)
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`
}


export const scale = (
  input: number,
  fromRange: [number, number],
  toRange: [number, number]
): number => {
  const [xMin, xMax] = toRange;
  const [yMin, yMax] = fromRange;

  const percent = (input - yMin) / (yMax - yMin);
  return percent * (xMax - xMin) + xMin;
}