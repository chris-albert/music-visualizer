import {atom} from "jotai"
import {AudioPlayer, StereoAnalyser} from "./useAudioContext"

export const audioContextAtom = atom<AudioContext>(new AudioContext())

export const globalAnalyserAtom = atom<StereoAnalyser>((get) =>
  ({
    left: get(audioContextAtom).createAnalyser(),
    right: get(audioContextAtom).createAnalyser()
  })
)

export const globalAudioPlayer = atom<AudioPlayer | undefined>(undefined)