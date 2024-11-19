import React from 'react'
import {UploadComponent} from "./sources/UploadComponent";
import {Tabs, Tab, Box, Divider, Typography} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import _ from 'lodash'
import {MicComponent} from "./sources/MicComponent";

type TabProps = {
  icon: React.ReactElement
  content: () => React.ReactElement
}

const tabs: Array<TabProps> = [
  {
    icon: <FileUploadIcon />,
    content: () => (
      <UploadComponent />
    )
  },
  {
    icon: <MicIcon />,
    content: () => (
      <MicComponent />
    )
  },
  {
    icon: <GraphicEqIcon />,
    content: () => (
      <Box>Person</Box>
    )
  }
]

type AudioSourceComponentProps = {}

export const AudioSourceComponent: React.FC<AudioSourceComponentProps> = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const contentFunc = _.get(tabs, value, undefined)

  return (
    <>
      <Box
        sx={{

          display: 'flex'
        }}
      >
        <Typography sx={{mr: 1, ml: 1}}>Source:</Typography>
        <Tabs
          sx={{
            minHeight: 0
          }}
          value={value}
          onChange={handleChange}
        >
          {_.map(tabs, (tab, index) => (
            <Tab
              key={index}
              sx={{
                p: 0,
                m: 0,
                minWidth: 0,
                minHeight: 0
              }}
              icon={tab.icon} />
          ))}
        </Tabs>
      </Box>
      <Divider />
      {contentFunc !== undefined ? contentFunc.content(): null}
      <Divider />
    </>
  )
}