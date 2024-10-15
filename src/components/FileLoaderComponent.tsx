import React from 'react'
import {Box, Button} from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type FileLoaderComponentProps = {
  onFileUpload: (f: File) => void
}

export const FileLoaderComponent: React.FC<FileLoaderComponentProps> = ({
  onFileUpload
}) => {

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <input
        type="file"
        hidden={true}
        onChange={({target: {files}}) => {
          if (files !== null && files[0]) {
            const file = files[0]
            onFileUpload(file)
          }
        }}
        multiple
      />
    </Button>
  )
}