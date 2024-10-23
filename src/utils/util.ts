import React, {MutableRefObject} from 'react'
import {unionize, ofType, UnionOf} from 'unionize'

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

export const useStateRef = <A>(initial: A): [A, React.Dispatch<React.SetStateAction<A>>, MutableRefObject<A>] => {
  const ref = React.useRef(initial)
  const [state, setState]: [A, React.Dispatch<React.SetStateAction<A>>] = React.useState(initial)

  React.useEffect(() => {
    ref.current = state
  }, [state])

  return [state, setState, ref]
}
