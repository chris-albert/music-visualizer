import React from 'react'
import {Box} from "@mui/material"
import {FileLoaderComponent} from "./FileLoaderComponent";
import {PlayPauseButtonComponent} from "./PlayPauseButtonComponent";
import {useAudioContext} from "../hooks/useAudioContext";

type VisOneComponentProps = {}

let animationController

/**
 * Followed tutorial:
 * https://www.telerik.com/blogs/adding-audio-visualization-react-app-using-web-audio-api
 *
 * React 2d canvas lib:
 * https://github.com/konvajs/react-konva?tab=readme-ov-file
 */
export const VisOneComponent: React.FC<VisOneComponentProps> = () => {

  const audioContext = useAudioContext()
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5
      }}
    >
      <FileLoaderComponent
        onFileUpload={setFile}
      />
      <PlayPauseButtonComponent
        onPlay={() => {
          if(file !== undefined) {
            file.arrayBuffer()
              .then(arrayBuffer => {
                return audioContext.decodeAudioData(arrayBuffer)
              })
              .then(audioBuffer => {
                const source = audioContext.createBufferSource()
                source.buffer = audioBuffer
                return source
              })
              .then(source => {
                source.connect(audioContext.destination)
                source.start()
              })
          }
        }}
        onPause={() => {

        }}
      />
      <audio
        ref={audioRef}
        onPlay={handleAudioPlay}
        src={file !== undefined ? window.URL.createObjectURL(file) : undefined}
        controls
      />
      <Box
        sx={{
          border: '1px solid white',
          flexShrink: 5
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