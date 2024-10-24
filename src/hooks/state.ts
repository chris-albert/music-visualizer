import {atom} from "jotai"
import {AudioPlayer, StereoAnalyser, StereoGain} from "./useAudioContext"

export const audioContextAtom = atom<AudioContext>(new AudioContext())

export const globalAnalyserAtom = atom<StereoAnalyser>((get) =>
  ({
    left: get(audioContextAtom).createAnalyser(),
    right: get(audioContextAtom).createAnalyser()
  })
)

export const globalStereoGainAtom = atom<StereoGain>((get) =>
  ({
    left: get(audioContextAtom).createGain(),
    right: get(audioContextAtom).createGain()
  })
)

export const globalAudioPlayer = atom<AudioPlayer | undefined>(undefined)