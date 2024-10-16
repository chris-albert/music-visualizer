import React from 'react'
import _ from 'lodash'
import {useAtomValue, useSetAtom} from "jotai";
import {audioContextAtom, globalAnalyser, globalAudioPlayer} from "./state";

export type AudioPlayer = {
  isPlaying: boolean
  play: () => void
  pause: () => void
  seconds: number,
  durationSeconds: number,
  isLoaded: boolean
}

export const useAudioContext = (): AudioContext =>
  useAtomValue(audioContextAtom)

export const useGlobalAnalyser = (): AnalyserNode =>
  useAtomValue(globalAnalyser)

export const useGlobalAudioPlayer = (): AudioPlayer | undefined =>
  useAtomValue(globalAudioPlayer)

export const useSetGlobalAudioPlayer = () =>
  useSetAtom(globalAudioPlayer)

export const useAudioBuffer = (file: File | undefined): AudioBuffer | undefined  => {

  const audioContext = useAudioContext()

  const [buffer, setBuffer] = React.useState<AudioBuffer | undefined>(undefined)

  React.useMemo(() => {
    if(file !== undefined) {
      file.arrayBuffer()
        .then(arrayBuffer => {
          return audioContext.decodeAudioData(arrayBuffer)
        })
        .then(buffer => {
          setBuffer(buffer)
        })
    }
  }, [file])

  return buffer
}



export const useAudioPlayer = (file: File | undefined): AudioPlayer => {

  const audioContext = useAudioContext()
  const globalAnalyser = useGlobalAnalyser()
  const audioBuffer = useAudioBuffer(file)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [source, setSource] = React.useState<AudioBufferSourceNode | undefined>(undefined)
  const [seconds, setSeconds] = React.useState(0)
  const [durationSeconds, setDurationSeconds] = React.useState(0)
  const [timer, setTimer] = React.useState<NodeJS.Timer | undefined>(undefined)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    return () => {
      if(timer !== undefined) {
        clearInterval(timer)
      }
    }
  }, [])

  const onStop = () => {
    setIsPlaying(false)
    if(timer !== undefined) {
      clearInterval(timer)
    }
    if(audioBuffer !== undefined) {
      updateSource(audioBuffer)
    }
  }

  const onEnded = () => {
    onStop()
  }

  const updateSource = (buffer: AudioBuffer) => {
    setDurationSeconds(_.floor(buffer.duration))
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(globalAnalyser)
    globalAnalyser.connect(audioContext.destination)
    source.addEventListener('ended', onEnded)
    setSource(source)
  }

  React.useEffect(() => {
    if(audioBuffer !== undefined) {
      updateSource(audioBuffer)
      setIsLoaded(true)
    }
  }, [audioBuffer])

  const play = () => {
    if(!isPlaying && source) {
      source.start(0, seconds)
      setIsPlaying(true)
      setTimer(setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000))
    }
  }

  const pause = () => {
    if(isPlaying && source) {
      source.stop()
      onStop()
    }
  }

  return {
    isPlaying,
    play,
    pause,
    seconds,
    durationSeconds,
    isLoaded
  }
}