import React from 'react'
import {Box, Divider, ListItem} from "@mui/material"
import {AudioPlayerComponent} from "./AudioPlayerComponent";
import {useAudioPlayer, useSetGlobalAudioPlayer} from "../hooks/useAudioContext";
import {FileLoaderComponent} from "./FileLoaderComponent";
import {UploadComponent} from "./sources/UploadComponent";

type AudioSourceComponentProps = {}

export const AudioSourceComponent: React.FC<AudioSourceComponentProps> = () => {

  return (
    <>
      <UploadComponent />
    </>
  )
}