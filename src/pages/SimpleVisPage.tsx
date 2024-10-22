import React from 'react'
import {Box, Slider} from "@mui/material"
import {VisOptionsComponent} from "../components/visualizations/VisOptionsComponent";
import _ from "lodash";
import {scale} from "../utils/util";
import {VisAnalyserComponent} from "../components/visualizations/VisAnalyserComponent";

type SimpleVisPageProps = {}

export const SimpleVisPage: React.FC<SimpleVisPageProps> = () => {

  // const barWidth = 3
  const gapWidth = 1

  const barWidthRef = React.useRef(3)

  return (
    <Box sx={{
      height: '100%'
    }}>
      <VisOptionsComponent
        options={
          <Box
            sx={{padding: 2}}
          >
            <Slider
              value={barWidthRef.current}
              min={1}
              max={10}
              onChange={(e, v) => {
                console.log('chagend', v)
                barWidthRef.current = typeof v === 'number' ? v : 3
              }}
            />
          </Box>
        }
      >
        <VisAnalyserComponent
          onAnimate={(ctx, analyser, height, width) => {
            const barWidth = barWidthRef.current
            const bars = _.floor(width / barWidth)
            const songData = new Uint8Array(bars);
            analyser.getByteFrequencyData(songData);
            let start = 0;
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < songData.length; i++) {
              // compute x coordinate where we would draw
              start = i * (barWidth + gapWidth);
              //create a gradient for the  whole canvas
              let gradient = ctx.createLinearGradient(
                0,
                0,
                width,
                height
              );
              gradient.addColorStop(0.00, 'red');
              gradient.addColorStop(1 / 6, 'orange');
              gradient.addColorStop(2 / 6, 'yellow');
              gradient.addColorStop(3 / 6, 'green')
              gradient.addColorStop(4 / 6, 'aqua');
              gradient.addColorStop(5 / 6, 'blue');
              gradient.addColorStop(1.00, 'purple');
              ctx.fillStyle = gradient;
              const value = scale(songData[i], [0, 256], [0, height])
              ctx.fillRect(start, height, barWidth, -value);
            }
          }}
        />
      </VisOptionsComponent>
    </Box>
  )
}