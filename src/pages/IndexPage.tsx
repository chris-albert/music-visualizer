import React from 'react'
import {Box} from "@mui/material"
import {VisOneComponent} from "../components/VisOneComponent";

type IndexPageProps = {}

export const IndexPage: React.FC<IndexPageProps> = ({}) => {

  return (
    <Box sx={{height: '100%'}}>
        <VisOneComponent />
    </Box>
  )
}