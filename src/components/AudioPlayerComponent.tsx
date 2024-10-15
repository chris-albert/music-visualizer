import React from 'react'
import {Box, LinearProgress, Typography} from "@mui/material"
import {useAudioPlayer, useSetGlobalAudioPlayer} from "../hooks/useAudioContext";
import {PlayPauseButtonComponent} from "./PlayPauseButtonComponent";
import {secondsToMinutes} from "../utils/util";

type AudioPlayerComponentProps = {
  file: File | undefined
}

export const AudioPlayerComponent: React.FC<AudioPlayerComponentProps> = ({
  file
}) => {

  const audioPlayer = useAudioPlayer(file)
  useSetGlobalAudioPlayer(audioPlayer)
  const {isPlaying, play, pause, seconds, durationSeconds} = audioPlayer
  const progress = file ? (seconds / durationSeconds) * 100 : 0

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <PlayPauseButtonComponent
        isPlaying={isPlaying}
        disabled={file === undefined}
        onPlay={play}
        onPause={pause}
      />
      <Typography sx={{ml: 1}}>
        {secondsToMinutes(seconds)} / {secondsToMinutes(durationSeconds)}
      </Typography>
      <Box sx={{width: 100, ml: 1}}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  )
}