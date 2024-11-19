import React from 'react'
import {ListItem} from "@mui/material";
import {useMic} from "../../hooks/useAudioContext";

export type MicComponentProps = {}

export const MicComponent: React.FC<MicComponentProps> = ({}) => {

  useMic()

  return (
    <ListItem>
      Mic
    </ListItem>
  )
}
