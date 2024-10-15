import {atom} from "jotai"
import {AudioPlayer} from "./useAudioContext"

export const audioContextAtom = atom<AudioContext>(new AudioContext())

export const globalAnalyser = atom<AnalyserNode>((get) =>
  get(audioContextAtom).createAnalyser()
)

export const globalAudioPlayer = atom<AudioPlayer | undefined>(undefined)