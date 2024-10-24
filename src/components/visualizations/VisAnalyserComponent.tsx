import React from 'react'
import {VisWrapperComponent} from "./VisWrapperComponent";
import {StereoAnalyser, useGlobalAnalyser, useGlobalAudioPlayer} from "../../hooks/useAudioContext";

type VisAnalyserComponentProps = {
  onAnimate: (context: CanvasRenderingContext2D, analyser: StereoAnalyser, height: number, width: number) => void
}

export const VisAnalyserComponent: React.FC<VisAnalyserComponentProps> = ({
  onAnimate
}) => {

  const analyzer = useGlobalAnalyser()
  const audioPlayer = useGlobalAudioPlayer()

  return (
    <VisWrapperComponent
      shouldAnimate={audioPlayer.isPlaying}
      onAnimate={(ctx, height, width) => {
        onAnimate(ctx, analyzer, height, width)
      }}
    />
  )
}