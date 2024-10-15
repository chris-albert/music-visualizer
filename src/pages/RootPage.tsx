import React from 'react'
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Nav} from "../components/Nav";

type RootPageProps = {}

export const RootPage: React.FC<RootPageProps> = ({}) => {

  return (
    <Box>
      <Nav/>
      <Box sx={{p: 2}}>
        <Outlet/>

      </Box>
    </Box>
  )
}