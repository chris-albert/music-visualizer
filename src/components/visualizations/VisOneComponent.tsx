import React from 'react'
import {Box} from "@mui/material"
import {useGlobalAnalyser, useGlobalAudioPlayer} from "../../hooks/useAudioContext";
import _ from 'lodash'
import {scale} from "../../utils/util";

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

  const barWidth = 3
  const analyzer = useGlobalAnalyser()
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const audioPlayer = useGlobalAudioPlayer()
  const canvasBoxRef = React.useRef<HTMLElement | null>(null)
  const canvasWidth = React.useMemo(() => {
    if(canvasBoxRef.current) {
      return canvasBoxRef.current.offsetWidth
    } else {
      return 0
    }
  }, [canvasBoxRef.current])
  const [canvasHeight, setCanvasHeight] = React.useState(500)

  React.useEffect(() => {
    if(canvasBoxRef.current) {
      setCanvasHeight(canvasBoxRef.current.offsetHeight)
    }
  }, [canvasBoxRef.current])

  const isPlaying = React.useRef(false)

  React.useEffect(() => {
      if(audioPlayer.isPlaying) {
        isPlaying.current = true
        visualizeData()
      } else {
        isPlaying.current = false
      }
  }, [audioPlayer])

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData)
    if(canvasRef.current && analyzer) {
      if (!isPlaying.current) {
        return cancelAnimationFrame(animationController);
      }
      if(canvasBoxRef.current) {
        setCanvasHeight(canvasBoxRef.current.offsetHeight)
      }
      const width = canvasRef.current.width
      const bars = _.floor(width / barWidth)
      const songData = new Uint8Array(bars);
      analyzer.getByteFrequencyData(songData);
      let start = 0;
      const ctx = canvasRef.current.getContext("2d");
      if(ctx) {
        ctx.clearRect(0, 0, width, canvasHeight);
        for (let i = 0; i < songData.length; i++) {
          // compute x coordinate where we would draw
          start = i * 4;
          //create a gradient for the  whole canvas
          let gradient = ctx.createLinearGradient(
            0,
            0,
            width,
            canvasHeight
          );
          gradient.addColorStop(0.00, 'red');
          gradient.addColorStop(1/6, 'orange');
          gradient.addColorStop(2/6, 'yellow');
          gradient.addColorStop(3/6, 'green')
          gradient.addColorStop(4/6, 'aqua');
          gradient.addColorStop(5/6, 'blue');
          gradient.addColorStop(1.00, 'purple');
          ctx.fillStyle = gradient;
          const value = scale(songData[i], [0, 256], [0, canvasHeight])
          ctx.fillRect(start, canvasHeight, barWidth, -value);
        }
      }
    }
  }

  return (
    <Box
      sx={{
        // border: '1px solid white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        height: '100%'
      }}
    >
      <Box
        ref={canvasBoxRef}
        sx={{
          flexShrink: 5,
          width: '100%',
          height: '100%'
        }}
      >
        <canvas
          style={{
            verticalAlign: 'bottom'
          }}
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </Box>
    </Box>
  )
}