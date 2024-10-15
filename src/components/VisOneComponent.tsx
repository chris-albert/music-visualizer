import React from 'react'
import {Box} from "@mui/material"
import {useGlobalAnalyser, useGlobalAudioPlayer} from "../hooks/useAudioContext";

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

  const analyzer = useGlobalAnalyser()
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const audioPlayer = useGlobalAudioPlayer()

  React.useEffect(() => {
    if(audioPlayer !== undefined) {
      if(audioPlayer.isPlaying) {
        visualizeData()
      }
    }
  }, [audioPlayer])

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData)
    if(audioPlayer  && canvasRef.current && analyzer) {
      if (!audioPlayer.isPlaying) {
        return cancelAnimationFrame(animationController);
      }
      const songData = new Uint8Array(140);
      analyzer.getByteFrequencyData(songData);
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