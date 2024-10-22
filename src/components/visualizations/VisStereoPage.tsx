import React from 'react'
import {Box} from "@mui/material"
import {VisOptionsComponent} from "./VisOptionsComponent";
import {VisAnalyserComponent} from "./VisAnalyserComponent";
import {scale} from "../../utils/util";
import _ from 'lodash'

type VisStereoPageProps = {}

export const VisStereoPage: React.FC<VisStereoPageProps> = () => {
  const barWidth = 3

  return (
    <Box sx={{
      // border: "1px solid white",
      height: '100%'
    }}>
      <VisOptionsComponent>
        <VisAnalyserComponent
          onAnimate={(ctx, analyser, height, width) => {
            const bars = _.floor(width / barWidth)
            const songData = new Uint8Array(bars);
            analyser.getByteFrequencyData(songData);
            let start = 0;
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < songData.length; i++) {
              // compute x coordinate where we would draw
              start = i * 4;
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