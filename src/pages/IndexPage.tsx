import React from 'react'
import {Box, Button, Drawer, List, ListItem, Toolbar} from "@mui/material"
import {VisOneComponent} from "../components/visualizations/VisOneComponent";
import SettingsIcon from '@mui/icons-material/Settings';
import {VisOptionsComponent} from "../components/visualizations/VisOptionsComponent";

type IndexPageProps = {}

export const IndexPage: React.FC<IndexPageProps> = ({}) => {

  return (
    <Box sx={{height: '100%'}}>
      <VisOptionsComponent>
        <VisOneComponent />
      </VisOptionsComponent>
    </Box>
  )
}