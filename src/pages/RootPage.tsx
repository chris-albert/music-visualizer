import React from 'react'
import {Box, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Nav} from "../components/Nav";
import {PlayerNav} from "../components/PlayerNav";

type RootPageProps = {}

export const RootPage: React.FC<RootPageProps> = ({}) => {

  return (
    <Box sx={{height: '100%', position: 'relative'}}>
      <PlayerNav />
      {/*<Nav/>*/}
      {/*<Toolbar variant='dense' />*/}
      <Box
        // sx={{height: 'calc(100% - 48px)'}}
        sx={{height: '100%'}}
      >
        <Outlet/>
      </Box>
    </Box>
  )
}