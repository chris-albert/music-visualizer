import React from 'react'
import {Box} from "@mui/material"
import _ from "lodash";
import {scale} from "../../utils/util";
import {VisWrapperComponent} from "./VisWrapperComponent";
import {useGlobalAnalyser, useGlobalAudioPlayer} from "../../hooks/useAudioContext";

type VisAnalyserComponentProps = {
  onAnimate: (context: CanvasRenderingContext2D, analyser: AnalyserNode, height: number, width: number) => void
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