import React from 'react'
import {Box} from "@mui/material"
import {FileLoaderComponent} from "./FileLoaderComponent";

type VisOneComponentProps = {}

let animationController

export const VisOneComponent: React.FC<VisOneComponentProps> = () => {

  const [file, setFile] = React.useState<File | undefined>(undefined)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const source = React.useRef<MediaElementAudioSourceNode | null>(null)
  const analyzer = React.useRef<AnalyserNode | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  const handleAudioPlay = () => {
    const audioContext = new AudioContext();
    if (!source.current && audioRef.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current)
      analyzer.current = audioContext.createAnalyser()
      source.current.connect(analyzer.current)
      analyzer.current.connect(audioContext.destination)
    }
    visualizeData()
  }

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData)
    if(audioRef.current && canvasRef.current && analyzer.current) {
      if (audioRef.current.paused) {
        return cancelAnimationFrame(animationController);
      }
      const songData = new Uint8Array(140);
      analyzer.current.getByteFrequencyData(songData);
      const bar_width = 3;
      let start = 0;
      const ctx = canvasRef.current.getContext("2d");
      if(ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = 0; i < songData.length; i++) {
          // compute x coordinate where we would draw
          start = i * 4;
          //create a gradient for the  whole canvas
          let gradient = ctx.createLinearGradient(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          gradient.addColorStop(0.2, "#2392f5");
          gradient.addColorStop(0.5, "#fe0095");
          gradient.addColorStop(1.0, "purple");
          ctx.fillStyle = gradient;
          ctx.fillRect(start, canvasRef.current.height, bar_width, -songData[i]);
        }
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <FileLoaderComponent
        onFileUpload={setFile}
      />
      <audio
        ref={audioRef}
        onPlay={handleAudioPlay}
        src={file !== undefined ? window.URL.createObjectURL(file) : undefined}
        controls
      />
      <Box
        sx={{
          border: '1px solid white'
        }}
      >
        <canvas
          style={{
            verticalAlign: 'bottom'
          }}
          ref={canvasRef}
          width={520}
          height={200}
        />
      </Box>
    </Box>
  )
}