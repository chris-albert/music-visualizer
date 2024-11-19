import React from 'react'
import {Box, Typography} from "@mui/material"
import {Knob} from "primereact/knob";
import {useGlobalStereoGain} from "../hooks/useAudioContext";
import {scale} from "../utils/util";

type AudioToolsComponentProps = {}

export const AudioToolsComponent: React.FC<AudioToolsComponentProps> = () => {

  const globalStereoGain = useGlobalStereoGain()

  const [leftGain, setLeftGain] = React.useState(100)
  const [rightGain, setRightGain] = React.useState(100)

  React.useEffect(() => {
    globalStereoGain.left.gain.value = scale(leftGain, [0, 100], [0, .5])
  }, [leftGain])

  React.useEffect(() => {
    globalStereoGain.right.gain.value = scale(rightGain, [0, 100], [0, .5])
  }, [rightGain])

  return (
    <Box sx={{
      display: "flex"
    }}>
      <Box sx={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
        <Knob
          value={leftGain}
          onChange={(e) => setLeftGain(e.value)}
          size={50}
          min={0}
          max={100}
          textColor='white'
        />
        <Typography>Left</Typography>
      </Box>
      <Box  sx={{display: "flex", alignItems: 'center', flexDirection: 'column'}}>
        <Knob
          value={rightGain}
          onChange={(e) => setRightGain(e.value)}
          size={50}
          min={0}
          max={100}
          textColor='white'
        />
        <Typography>Right</Typography>
      </Box>
    </Box>
  )
}