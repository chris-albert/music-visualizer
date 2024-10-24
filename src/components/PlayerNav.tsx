import React from 'react'
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton, ListItemIcon,
  ListItemText, Slider,
  Toolbar
} from "@mui/material"
import ListIcon from "@mui/icons-material/List";
import {AudioPlayerComponent} from "./AudioPlayerComponent";
import {FileLoaderComponent} from "./FileLoaderComponent";
import {useAudioPlayer, useSetGlobalAudioPlayer} from "../hooks/useAudioContext";
import {useNavigate} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Knob} from "primereact/knob";
import {AudioToolsComponent} from "./AudioToolsComponent";
type PlayerNavProps = {}

export const PlayerNav: React.FC<PlayerNavProps> = () => {

  const [file, setFile] = React.useState<File | undefined>(undefined)
  const player = useAudioPlayer(file)
  const setGlobalAudioPlayer = useSetGlobalAudioPlayer()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const navigation = useNavigate()

  React.useEffect(() => {
    if(player !== undefined) {
      setGlobalAudioPlayer(player)
    }
  }, [player])

  return (
    <Box sx={{
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: 100
    }}>
      <Button
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          p:0,
          minWidth: 0
        }}
        variant='outlined'
        size='small'
        onClick={() => setIsDrawerOpen(true)}
      >
        <ListIcon />
      </Button>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <List>
            <ListItem sx={{pt: 0}}>
              <AudioPlayerComponent audioPlayer={player}/>
            </ListItem>
            <Divider />
            <ListItem sx={{
              height: 100
            }}>
              <AudioToolsComponent />
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
            <Divider />
          </List>
          <List sx={{pb: 0}}>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigation('/stereo')}
              >
                <ListItemIcon>
                  <NavigateNextIcon />
                </ListItemIcon>
                <ListItemText primary='stereo' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigation('/simple')}
              >
                <ListItemIcon>
                  <NavigateNextIcon />
                </ListItemIcon>
                <ListItemText primary='stimple' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}