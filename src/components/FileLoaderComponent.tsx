import React from 'react'
import {Box} from "@mui/material"

type FileLoaderComponentProps = {
  onFileUpload: (f: File) => void
}

export const FileLoaderComponent: React.FC<FileLoaderComponentProps> = ({
  onFileUpload
}) => {

  return (
    <Box>
      <input
        type="file"
        onChange={({target: {files}}) => {
          if (files !== null && files[0]) {
            const file = files[0]
            onFileUpload(file)
          }
        }}
      />
    </Box>
  )
}