import React from 'react'
import {Box, Button, Drawer, List, ListItem, Toolbar} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings";
import {VisOneComponent} from "./VisOneComponent";

type VisOptionsComponentProps = {
  options?: React.ReactElement,
  children: React.ReactElement
}

export const VisOptionsComponent: React.FC<VisOptionsComponentProps> = ({
  options,
  children
}) => {

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  return (
    <Box sx={{
      position: 'relative',
      height: '100%'
    }}>
      <Button
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          p:0,
          minWidth: 0
        }}
        disabled={options === undefined}
        variant='outlined'
        size='small'
        onClick={() => setIsDrawerOpen(true)}
      >
        <SettingsIcon />
      </Button>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Toolbar variant='dense' />
        <Box
          sx={{width: 300}}
        >
          {options}
        </Box>
      </Drawer>
      {children}
    </Box>
  )
}