import React from 'react'
import {Box, LinearProgress, Typography} from "@mui/material"
import {AudioPlayer} from "../hooks/useAudioContext";
import {PlayPauseButtonComponent} from "./PlayPauseButtonComponent";
import {secondsToMinutes} from "../utils/util";

type AudioPlayerComponentProps = {
  audioPlayer: AudioPlayer
}

export const AudioPlayerComponent: React.FC<AudioPlayerComponentProps> = ({
  audioPlayer
}) => {

  const {isPlaying, play, pause, seconds, durationSeconds, isLoaded} = audioPlayer
  const progress = isLoaded ? (seconds / durationSeconds) * 100 : 0

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <PlayPauseButtonComponent
        isPlaying={isPlaying}
        disabled={!isLoaded}
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