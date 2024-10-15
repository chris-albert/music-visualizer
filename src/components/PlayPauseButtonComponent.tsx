import React from 'react'
import {Button} from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

type PlayPauseButtonComponentProps = {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  disabled: boolean
}

export const PlayPauseButtonComponent: React.FC<PlayPauseButtonComponentProps> = ({
  isPlaying,
  onPlay,
  onPause,
  disabled
}) => {

  return (
    <Button
      sx={{
        p: 0,
        minWidth: 0
      }}
      variant='outlined'
      size="small"
      onClick={() => {
        if(isPlaying) {
          onPause()
        } else {
          onPlay()
        }
      }}
      disabled={disabled}
    >
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </Button>
  )
}