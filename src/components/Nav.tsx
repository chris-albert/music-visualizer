import React from 'react'
import {AppBar, Box, Toolbar} from "@mui/material";
import {FileLoaderComponent} from "./FileLoaderComponent";
import {AudioPlayerComponent} from "./AudioPlayerComponent";
import {useAudioPlayer, useSetGlobalAudioPlayer} from "../hooks/useAudioContext";

type NavProps = {}

export const Nav: React.FC<NavProps> = ({}) => {

  const [file, setFile] = React.useState<File | undefined>(undefined)
  const player = useAudioPlayer(file)
  const setGlobalAudioPlayer = useSetGlobalAudioPlayer()

  React.useEffect(() => {
    if(player !== undefined) {
      setGlobalAudioPlayer(player)
    }
  }, [player])

  return (
    <Box sx={{
      flexGrow: 1
    }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar variant="dense">
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <AudioPlayerComponent audioPlayer={player}/>
            </Box>
            <Box sx={{ml: 1}}>
              <FileLoaderComponent
                onFileUpload={setFile}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}