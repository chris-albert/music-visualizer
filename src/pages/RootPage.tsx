import React from 'react'
import {Box, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Nav} from "../components/Nav";

type RootPageProps = {}

export const RootPage: React.FC<RootPageProps> = ({}) => {

  return (
    <Box sx={{height: '100%'}}>
      <Nav/>
      <Toolbar variant='dense' />
      <Box
        sx={{height: 'calc(100% - 48px)'}}
      >
        <Outlet/>
      </Box>
    </Box>
  )
}