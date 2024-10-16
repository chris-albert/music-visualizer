import React from 'react'
import {Box, Button, Chip} from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type FileLoaderComponentProps = {
  onFileUpload: (f: File) => void
}

export const FileLoaderComponent: React.FC<FileLoaderComponentProps> = ({
  onFileUpload
}) => {

  const [filename, setFilename] = React.useState('')

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
    }}
    >
      {filename !== '' ? <Chip sx={{mr: 1}} label={filename} variant="outlined" /> : null}
      <Button
        component="label"
        role={undefined}
        variant="outlined"
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
              setFilename(file.name)
            }
          }}
          multiple
        />
      </Button>
    </Box>
  )
}