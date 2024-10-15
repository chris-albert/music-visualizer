import React from 'react'

export const useAudioContext = (): AudioContext => {
  return React.useMemo(() => new AudioContext(), [])
}