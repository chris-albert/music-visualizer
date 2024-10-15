import React from 'react'
import {Button} from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

type PlayPauseButtonComponentProps = {
  onPlay: () => void
  onPause: () => void
}

export const PlayPauseButtonComponent: React.FC<PlayPauseButtonComponentProps> = ({
  onPlay,
  onPause
}) => {

  const [playing, setPlaying] = React.useState(false)

  React.useEffect(() => {
    if(playing) {
      onPlay()
    } else {
      onPause()
    }
  }, [playing])

  return (
    <Button
      sx={{
        p: 0,
        minWidth: 0
      }}
      variant='outlined'
      size="small"
      onClick={() => {
        setPlaying(p => !p)
      }}
    >
      {playing ? <PauseIcon /> : <PlayArrowIcon />}
    </Button>
  )
}