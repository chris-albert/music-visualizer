import {atom} from "jotai"
import {AudioPlayer, StereoAnalyser, StereoGain} from "./useAudioContext"
import {SpectrumOptions} from "../components/visualizations/SimpleSpectrumOptions";
import {SpectrumAnalyserTypes} from "../models/SpectrumAnalysers";
import {GradientTypes} from "../models/Gradient";

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

export const globalSpectrumOptions = atom<SpectrumOptions>({
  barWidth: 3,
  gapWidth: 1,
  position: SpectrumAnalyserTypes.Bottom(),
  gradient: GradientTypes.RainbowVertical()
})