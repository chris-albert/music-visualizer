import React from 'react'
import {Box} from "@mui/material"
import _ from "lodash";
import {scale} from "../../utils/util";

type VisWrapperComponentProps = {
  shouldAnimate: boolean
  onAnimate: (context: CanvasRenderingContext2D, height: number, width: number) => void
  onIniti?: (context: CanvasRenderingContext2D, height: number, width: number) => void
}

let animationController

export const VisWrapperComponent: React.FC<VisWrapperComponentProps> = ({
  shouldAnimate,
  onAnimate
}) => {

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const canvasBoxRef = React.useRef<HTMLElement | null>(null)

  const [canvasHeight, setCanvasHeight] = React.useState(500)

  const canvasWidth = React.useMemo(() => {
    if(canvasBoxRef.current) {
      return canvasBoxRef.current.offsetWidth
    } else {
      return 0
    }
  }, [canvasBoxRef.current])

  React.useEffect(() => {
    if(canvasBoxRef.current) {
      setCanvasHeight(canvasBoxRef.current.offsetHeight)
    }
  }, [canvasBoxRef.current])

  const shouldAnimateRef = React.useRef(false)

  React.useEffect(() => {
    if(shouldAnimate) {
      shouldAnimateRef.current = true
      animate()
    } else {
      shouldAnimateRef.current = false
    }
  }, [shouldAnimate])

  const animate = () => {
    animationController = window.requestAnimationFrame(animate)
    if(canvasRef.current && shouldAnimateRef.current) {
      if(canvasBoxRef.current) {
        setCanvasHeight(canvasBoxRef.current.offsetHeight)
      }
      const context = canvasRef.current.getContext('2d')
      if(context) {
        onAnimate(context, canvasRef.current.height, canvasRef.current.width)
      }

    } else {
      return cancelAnimationFrame(animationController)
    }
  }

  return (
    <Box
      sx={{
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