import React from 'react'
import {AppBar, Toolbar, Typography} from "@mui/material";

type NavProps = {}

export const Nav: React.FC<NavProps> = ({}) => {

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  )
}