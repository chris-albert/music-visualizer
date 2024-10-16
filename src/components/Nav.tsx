import React from 'react'
import {AppBar, Box, Toolbar} from "@mui/material";
import {FileLoaderComponent} from "./FileLoaderComponent";
import {AudioPlayerComponent} from "./AudioPlayerComponent";

type NavProps = {}

export const Nav: React.FC<NavProps> = ({}) => {

  const [file, setFile] = React.useState<File | undefined>(undefined)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
              <AudioPlayerComponent file={file} />
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