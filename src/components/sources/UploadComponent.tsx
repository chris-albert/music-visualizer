import React from 'react'
import {Box, Divider, ListItem} from "@mui/material"
import {useAudioPlayer, useSetGlobalAudioPlayer} from "../../hooks/useAudioContext";
import {AudioPlayerComponent} from "../AudioPlayerComponent";
import {FileLoaderComponent} from "../FileLoaderComponent";

type UploadComponentProps = {}

export const UploadComponent: React.FC<UploadComponentProps> = () => {

  const [file, setFile] = React.useState<File | undefined>(undefined)
  const player = useAudioPlayer(file)
  const setGlobalAudioPlayer = useSetGlobalAudioPlayer()

  React.useEffect(() => {
    if(player !== undefined) {
      setGlobalAudioPlayer(player)
    }
  }, [player])

  return (
    <>
      <ListItem sx={{pt: 0}}>
        <AudioPlayerComponent audioPlayer={player}/>
      </ListItem>
      <Divider />
      <ListItem
        sx={{
          display: 'flex',
          justifyContent: "center"
        }}
      >
        <FileLoaderComponent
          onFileUpload={setFile}
        />
      </ListItem>
    </>
  )
}